"use client";

import { useEffect,useState } from "react";
import { collection,getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StaffOrdersPage(){

const [orders,setOrders] = useState<any[]>([]);

const fetchOrders = async()=>{

const snap = await getDocs(collection(db,"orders"));

setOrders(
snap.docs.map(d=>({
id:d.id,
...d.data()
}))
);

};

useEffect(()=>{
fetchOrders();
},[]);

return(

<div className="space-y-6">

<h1 className="text-2xl font-bold">
My Equipment Requests
</h1>

{orders.length===0 &&(
<p className="text-gray-500">
No requests found
</p>
)}

{orders.map(order=>(

<div key={order.id} className="border p-4 rounded">

{order.items?.map((item:any,index:number)=>(

<div key={index} className="mb-2">

<p className="font-semibold">
{item.productName}
</p>

<p className="text-sm">
Qty: {item.quantity}
</p>

</div>

))}

<p>

Status:

<span className={
order.status === "approved"
? "text-green-600 font-semibold ml-2"
: order.status === "rejected"
? "text-red-600 font-semibold ml-2"
: "text-yellow-600 font-semibold ml-2"
}>
{order.status || "pending"}
</span>

</p>

</div>

))}

</div>

);

}