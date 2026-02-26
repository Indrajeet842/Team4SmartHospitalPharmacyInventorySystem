"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { StockTransaction } from "@/lib/types";

export default function StaffTransactionsPage() {
  const [transactions] = useState<StockTransaction[]>([
    { id: "1", equipmentId: "1", equipmentName: "Standard Issue Radio", type: "OUT", quantity: 2, reason: "Staff request", performedBy: "staff", timestamp: "21-01-2026 17:19" },
    { id: "2", equipmentId: "2", equipmentName: "Tactical Vest (L)", type: "IN", quantity: 5, reason: "Admin restock", performedBy: "admin", timestamp: "22-01-2026 09:45" },
    { id: "3", equipmentId: "3", equipmentName: "NVGs Gen 3", type: "OUT", quantity: 1, reason: "Staff request", performedBy: "staff", timestamp: "22-01-2026 10:10" },
    { id: "4", equipmentId: "4", equipmentName: "Ballistic Helmet", type: "IN", quantity: 10, reason: "Admin restock", performedBy: "admin", timestamp: "22-01-2026 11:00" },
    { id: "5", equipmentId: "5", equipmentName: "Satcom Transceiver", type: "OUT", quantity: 1, reason: "Staff request", performedBy: "staff", timestamp: "22-01-2026 12:30" },
    { id: "6", equipmentId: "6", equipmentName: "Level IV Plates", type: "IN", quantity: 20, reason: "Admin restock", performedBy: "admin", timestamp: "22-01-2026 13:00" },
    { id: "7", equipmentId: "7", equipmentName: "Tactical Drone v4", type: "OUT", quantity: 1, reason: "Staff request", performedBy: "staff", timestamp: "22-01-2026 14:00" },
    { id: "8", equipmentId: "8", equipmentName: "Night Vision Gen 3", type: "IN", quantity: 2, reason: "Admin restock", performedBy: "admin", timestamp: "22-01-2026 15:00" },
    { id: "9", equipmentId: "9", equipmentName: "Field Medical Kit", type: "OUT", quantity: 3, reason: "Staff request", performedBy: "staff", timestamp: "22-01-2026 16:00" },
    { id: "10", equipmentId: "10", equipmentName: "Combat Boots", type: "IN", quantity: 10, reason: "Admin restock", performedBy: "admin", timestamp: "22-01-2026 17:00" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Transaction History
      </h1>

      {/* Card Container */}
      <Card className="shadow-lg rounded-2xl border bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            All Transactions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              {/* Table Header */}
              <TableHeader>
                <TableRow className="bg-green-700 hover:bg-green-700">
                  <TableHead className="text-white font-semibold">
                    ID
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Type
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Product
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Quantity
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Performed By
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody>
                {transactions.map((tx, index) => (
                  <TableRow
                    key={tx.id}
                    className={cn(
                      "transition-colors",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50",
                      "hover:bg-green-50"
                    )}
                  >
                    <TableCell className="font-medium text-gray-700">
                      {tx.id}
                    </TableCell>

                    {/* Type Badge */}
                    <TableCell>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          tx.type === "IN"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {tx.type}
                      </span>
                    </TableCell>

                    <TableCell className="text-gray-700">
                      {tx.equipmentName}
                    </TableCell>

                    <TableCell className="text-gray-700">
                      {tx.quantity}
                    </TableCell>

                    <TableCell className="capitalize text-gray-700">
                      {tx.performedBy}
                    </TableCell>

                    <TableCell className="text-gray-600 text-sm">
                      {tx.timestamp}
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