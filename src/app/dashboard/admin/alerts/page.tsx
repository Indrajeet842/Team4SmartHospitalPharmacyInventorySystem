"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
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

export default function LowStockAlerts() {
  const [mailQty, setMailQty] = useState("1200");

  const data = [
    {
      id: 1,
      product: "dth",
      category: "Electronics",
      supplier: "TechCorp",
      available: 15,
    },
  ];

  // ✅ Mail Trigger Function Added
  const handleMailTrigger = async (
    product: string,
    quantity: number,
    supplier: string
  ) => {
    try {
      const response = await fetch("/api/send-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: product,
          quantity: quantity,
          supplier: supplier,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Email Sent Successfully!");
      } else {
        alert("Failed to send email");
        console.error(result);
      }
    } catch (error) {
      console.error("Mail Trigger Error:", error);
      alert("Something went wrong while sending email");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <Card className="shadow-xl rounded-2xl border-none bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-700">
            Low Stock Alerts
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-xl">
            <Table>
              <TableHeader>
                <TableRow className="bg-red-700 hover:bg-red-700">
                  <TableHead className="text-white font-semibold">#</TableHead>
                  <TableHead className="text-white font-semibold">
                    Product
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Category
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Supplier
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center">
                    Available Qty
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center">
                    Mail Trigger
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-red-50 transition"
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">
                      {item.product}
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell className="text-center">
                      {item.available}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-center gap-2">
                        <Input
                          type="number"
                          value={mailQty}
                          onChange={(e) => setMailQty(e.target.value)}
                          className="w-28 text-center"
                        />

                        {/* ✅ FIXED FIELD NAME */}
                        <button
                          onClick={() =>
                            handleMailTrigger(
                              item.product,
                              item.available,
                              item.supplier
                            )
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Mail Trigger
                        </button>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Button className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6">
                        Delete
                      </Button>
                    </TableCell>
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