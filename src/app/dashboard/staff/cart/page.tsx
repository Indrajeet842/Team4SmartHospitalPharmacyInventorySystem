"use client";

import { useEffect,useState } from "react";
import { collection,getDocs,deleteDoc,doc,addDoc,updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CartPage(){

const [cart,setCart] = useState<any[]>([]);

const fetchCart = async()=>{

const snap = await getDocs(collection(db,"cart"));

setCart(
snap.docs.map(d=>({
id:d.id,
...d.data()
}))
);

};

useEffect(()=>{
fetchCart();
},[]);

const removeItem = async(id:string)=>{

await deleteDoc(doc(db,"cart",id));

fetchCart();

};

/* UPDATE QUANTITY */

const updateQuantity = async(id:string,newQty:number)=>{

if(isNaN(newQty)) return;

await updateDoc(doc(db,"cart",id),{
quantity:newQty
});

fetchCart();

};
const placeOrder = async()=>{

if(cart.length===0) return;

await addDoc(collection(db,"orders"),{

items:cart,
status:"pending",
userId:"staff3",   // replace later with logged in user
createdAt:new Date()

});

alert("Order placed and sent for manager approval");

/* CLEAR CART */

for(const item of cart){
await deleteDoc(doc(db,"cart",item.id));
}

setCart([]);

};

return(

<div className="space-y-6">

<h1 className="text-2xl font-bold">
Cart
</h1>

{/* CART LIST */}

{cart.length === 0 && (

<p className="text-gray-500">
No items in cart
</p>

)}

{cart.map(item=>(

<div key={item.id} className="border p-3 rounded flex justify-between items-center">

<div>

<p className="font-semibold">
{item.productName}
</p>

<div className="flex items-center gap-2 mt-1">

<button
onClick={()=>updateQuantity(item.id,item.quantity-1)}
className="bg-gray-300 px-2 rounded"
>
-
</button>

<input
type="number"
value={item.quantity}
min="0"
onChange={(e)=>{

const val = e.target.value;

/* allow empty while typing */
if(val === ""){
updateQuantity(item.id,0);
return;
}

updateQuantity(item.id,Number(val));

}}
onBlur={()=>{

/* auto fix when user leaves field */
if(item.quantity <= 0){
updateQuantity(item.id,1);
}

}}
className="w-14 text-center border rounded"
/>

<button
onClick={()=>updateQuantity(item.id,item.quantity+1)}
className="bg-gray-300 px-2 rounded"
>
+
</button>

</div>

</div>

<button
onClick={()=>removeItem(item.id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Remove
</button>

</div>

))}

{/* PLACE ORDER */}

{cart.length>0 &&(

<button
onClick={placeOrder}
className="bg-green-600 text-white px-4 py-2 rounded"
>
Place Order
</button>

)}

</div>

);

}