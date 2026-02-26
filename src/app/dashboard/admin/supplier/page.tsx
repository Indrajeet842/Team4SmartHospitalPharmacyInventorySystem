"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function AdminSupplierPage() {
  // Mock data for demonstration
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "TechCorp Suppliers", phone: "555-1234", email: "sales@techcorp.com" },
    { id: 2, name: "OfficeEssence Inc", phone: "555-5678", email: "info@officeessence.com" },
    { id: 3, name: "TechCorp", phone: "555-1234", email: "tech@guest.com" },
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddSupplier = () => {
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    const newId = suppliers.length ? Math.max(...suppliers.map(s => s.id)) + 1 : 1;
    setSuppliers([...suppliers, { id: newId, name, phone, email }]);
    setName("");
    setPhone("");
    setEmail("");
    setSuccessMsg("Supplier added successfully");
    setTimeout(() => setSuccessMsg("") , 2000);
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
    setSuccessMsg("Supplier deleted successfully");
    setTimeout(() => setSuccessMsg("") , 2000);
  };

  return (
    <div className="space-y-8 bg-[#f8fafc] min-h-screen p-6">
      <Card className="shadow-2xl rounded-2xl border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Supplier Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-lg">Add Supplier</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Input
                placeholder="Supplier name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-48 rounded-lg"
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-40 rounded-lg"
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-64 rounded-lg"
              />
              <Button onClick={handleAddSupplier} variant="default" className="rounded-lg font-semibold">Add Supplier</Button>
            </div>
            {successMsg && (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded mb-2 text-sm w-fit mt-3 shadow">{successMsg}</div>
            )}
          </div>
          <div className="overflow-x-auto rounded-xl mt-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-700 hover:bg-blue-700 cursor-default">
                  <TableHead className="text-white font-bold text-lg">ID</TableHead>
                  <TableHead className="text-white font-bold text-lg">Name</TableHead>
                  <TableHead className="text-white font-bold text-lg">Phone</TableHead>
                  <TableHead className="text-white font-bold text-lg">Email</TableHead>
                  <TableHead className="text-white font-bold text-lg">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No suppliers found.</TableCell>
                  </TableRow>
                ) : (
                  suppliers.map(supplier => (
                    <TableRow key={supplier.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" className="rounded-md" onClick={() => handleDeleteSupplier(supplier.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
