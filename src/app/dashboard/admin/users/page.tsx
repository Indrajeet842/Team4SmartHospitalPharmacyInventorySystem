"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type User = {
  id: string;
  fullName?: string;
  email?: string;
  role?: string;
};

export default function UsersPage() {

const [users,setUsers] = useState<User[]>([]);
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [role,setRole] = useState("staff");

const fetchUsers = async () => {

const snap = await getDocs(collection(db,"users"));

setUsers(
snap.docs.map(d => ({
id:d.id,
...(d.data() as Omit<User,"id">)
}))
);

};

useEffect(()=>{
fetchUsers();
},[]);

const handleCreate = async () => {

if(!name || !email) return;

await addDoc(collection(db,"users"),{
fullName:name,
email,
role,
createdAt:new Date()
});

setName("");
setEmail("");

fetchUsers();

};

const deleteUser = async(id:string)=>{

await deleteDoc(doc(db,"users",id));

fetchUsers();

};

return(

<div className="space-y-6">

<h1 className="text-3xl font-bold">
User Management
</h1>

{/* CREATE USER */}

<div className="flex gap-3 bg-white p-4 rounded shadow">

<input
placeholder="Full Name"
value={name}
onChange={e=>setName(e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
className="border p-2 rounded"
/>

<select
value={role}
onChange={e=>setRole(e.target.value)}
className="border p-2 rounded"
>

<option value="manager">Manager</option>
<option value="staff">Staff</option>

</select>

<button
onClick={handleCreate}
className="bg-blue-600 text-white px-4 rounded"
>
Create User
</button>

</div>

{/* USERS TABLE */}

<table className="w-full bg-white rounded shadow">

<thead className="bg-blue-600 text-white">

<tr>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{users.map(user=>(

<tr key={user.id} className="border-b">

<td>{user.fullName}</td>
<td>{user.email}</td>
<td>{user.role}</td>

<td>

<button
onClick={()=>deleteUser(user.id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}