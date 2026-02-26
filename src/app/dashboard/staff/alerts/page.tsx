"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function StaffAlertsPage() {
  // Example inventory with categories and low stock threshold
  const [products] = useState([
    { id: 1, name: "Standard Issue Radio", category: "Communication", qty: 18, threshold: 10 },
    { id: 2, name: "Tactical Vest (L)", category: "Personal Gear", qty: 12, threshold: 5 },
    { id: 3, name: "NVGs Gen 3", category: "Optics", qty: 4, threshold: 5 },
    { id: 4, name: "Ballistic Helmet", category: "Personal Gear", qty: 12, threshold: 8 },
    { id: 5, name: "Satcom Transceiver", category: "Communication", qty: 2, threshold: 3 },
    { id: 6, name: "Level IV Plates", category: "Personal Gear", qty: 150, threshold: 20 },
    { id: 7, name: "Tactical Drone v4", category: "UAV", qty: 3, threshold: 2 },
    { id: 8, name: "Night Vision Gen 3", category: "Optics", qty: 8, threshold: 5 },
    { id: 9, name: "Field Medical Kit", category: "Medical", qty: 20, threshold: 10 },
    { id: 10, name: "Combat Boots", category: "Personal Gear", qty: 30, threshold: 10 },
  ]);
  const lowStock = products.filter(p => p.qty <= p.threshold);

  return (
    <div className="space-y-6 bg-[#f8fafc] min-h-screen p-4">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800 drop-shadow-sm">Low Stock Alerts</h1>
      <Card className="shadow-2xl rounded-2xl border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">Products at or below low stock threshold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-700 hover:bg-green-700 cursor-default">
                  <TableHead className="text-white font-bold text-lg">ID</TableHead>
                  <TableHead className="text-white font-bold text-lg">Product</TableHead>
                  <TableHead className="text-white font-bold text-lg">Category</TableHead>
                  <TableHead className="text-white font-bold text-lg">Available Qty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStock.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-6">No products are currently below the low stock threshold.</TableCell>
                  </TableRow>
                ) : (
                  lowStock.map((product, idx) => (
                    <TableRow
                      key={product.id}
                      className={cn(
                        "transition-colors",
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50",
                        "hover:bg-yellow-50 cursor-pointer"
                      )}
                    >
                      <TableCell className="font-semibold text-gray-700">{product.id}</TableCell>
                      <TableCell className="text-gray-700">{product.name}</TableCell>
                      <TableCell className="text-gray-700">{product.category}</TableCell>
                      <TableCell className="text-gray-700">{product.qty}</TableCell>
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
