"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function StaffStockPage() {
  // Example inventory (should be shared state or fetched in real app)
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
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleStock = (type: "in" | "out") => {
    const id = Number(productId);
    const qty = Number(quantity);
    if (!id || !qty || qty < 1) {
      setError("Please select a product and enter a valid quantity.");
      return;
    }
    setProducts(products =>
      products.map(p =>
        p.id === id
          ? {
              ...p,
              qty: type === "in" ? p.qty + qty : Math.max(0, p.qty - qty),
            }
          : p
      )
    );
    setError("");
    setQuantity("");
    setProductId("");
  };

  return (
    <div className="space-y-6 bg-[#f8fafc] min-h-screen p-4">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800 drop-shadow-sm">Stock IN / OUT</h1>
      <Card className="shadow-2xl rounded-2xl border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">Stock IN / OUT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
            <select
              className="rounded-lg border px-3 py-2 min-w-[180px]"
              value={productId}
              onChange={e => setProductId(e.target.value)}
            >
              <option value="">Product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <Input
              placeholder="Quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="rounded-lg max-w-[120px]"
            />
            <Button
              className="bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg px-5 py-2 shadow-md"
              onClick={() => handleStock("in")}
            >
              Stock IN
            </Button>
            <Button
              className="bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg px-5 py-2 shadow-md"
              onClick={() => handleStock("out")}
            >
              Stock OUT
            </Button>
          </div>
          {error && <div className="text-red-600 text-sm font-medium mb-2">{error}</div>}
          <div className="overflow-x-auto rounded-xl mt-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-700 hover:bg-green-700 cursor-default">
                  <TableHead className="text-white font-bold text-lg">Product ID</TableHead>
                  <TableHead className="text-white font-bold text-lg">Product Name</TableHead>
                  <TableHead className="text-white font-bold text-lg">Current Quantity</TableHead>
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
    </div>
  );
}
