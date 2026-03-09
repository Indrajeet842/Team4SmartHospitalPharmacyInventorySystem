"use client";

import { useEffect,useState } from "react";
import { collection,getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AssignedEquipmentPage(){

const [items,setItems] = useState<any[]>([]);

const fetchAssignments = async()=>{

const snap = await getDocs(collection(db,"assignments"));

setItems(
snap.docs.map(d=>({
id:d.id,
...d.data()
}))
);

};

useEffect(()=>{
fetchAssignments();
},[]);

return(

<div className="space-y-6">

<h1 className="text-2xl font-bold">
Assigned Equipment
</h1>

{items.map(assign=>(

<div key={assign.id} className="border p-4 rounded">

{assign.items?.map((item:any,index:number)=>(

<div key={index}>

<p className="font-semibold">{item.productName}</p>
<p>Qty: {item.quantity}</p>

</div>

))}

<p className="text-sm text-gray-500">
Issued Date: {new Date(assign.issuedDate.seconds*1000).toLocaleDateString()}
</p>

</div>

))}

</div>

);

}