"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function StaffProductsPage() {
  // State for products
  const [products, setProducts] = useState([
    { id: 1, name: "Standard Issue Radio", qty: 18 },
    { id: 2, name: "Tactical Vest (L)", qty: 12 },
    { id: 3, name: "NVGs Gen 3", qty: 4 },
    { id: 4, name: "Ballistic Helmet", qty: 12 },
    { id: 5, name: "Satcom Transceiver", qty: 2 },
    { id: 6, name: "Level IV Plates", qty: 150 },
    { id: 7, name: "Tactical Drone v4", qty: 3 },
    { id: 8, name: "Night Vision Gen 3", qty: 8 },
    { id: 9, name: "Field Medical Kit", qty: 20 },
    { id: 10, name: "Combat Boots", qty: 30 },
  ]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", qty: "" });
  const [error, setError] = useState("");

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.qty.trim() || isNaN(Number(newProduct.qty))) {
      setError("Please enter a valid product name and quantity.");
      return;
    }
    setProducts([
      ...products,
      {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: newProduct.name,
        qty: Number(newProduct.qty),
      },
    ]);
    setNewProduct({ name: "", qty: "" });
    setError("");
    setOpen(false);
  };

  return (
    <div className="space-y-6 bg-[#f8fafc] min-h-screen p-4">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800 drop-shadow-sm">Staff Inventory Dashboard</h1>
      <Card className="shadow-2xl rounded-2xl border-none">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900">Products</CardTitle>
          <Button
            className="bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg px-5 py-2 shadow-md"
            onClick={() => setOpen(true)}
          >
            + Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-700 hover:bg-green-700 cursor-default">
                  <TableHead className="text-white font-bold text-lg">ID</TableHead>
                  <TableHead className="text-white font-bold text-lg">Name</TableHead>
                  <TableHead className="text-white font-bold text-lg">Qty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, idx) => (
                  <TableRow
                    key={product.id}
                    className={cn(
                      "transition-colors",
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50",
                      "hover:bg-green-50 cursor-pointer"
                    )}
                  >
                    <TableCell className="font-semibold text-gray-700">{product.id}</TableCell>
                    <TableCell className="text-gray-700">{product.name}</TableCell>
                    <TableCell className="text-gray-700">{product.qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              className="rounded-lg"
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={newProduct.qty}
              onChange={e => setNewProduct({ ...newProduct, qty: e.target.value })}
              className="rounded-lg"
            />
            {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
          </div>
          <DialogFooter>
            <Button
              className="bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
