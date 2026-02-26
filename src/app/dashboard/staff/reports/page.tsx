"use client";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Define the type for a report row
interface ReportRow {
  id: number;
  name: string;
  current: number;
  totalIn: number;
  totalOut: number;
}

export default function StaffReportsPage() {
  // Example summary data
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filter, setFilter] = useState("");
  const [data] = useState<ReportRow[]>(
    [
      { id: 1, name: "Standard Issue Radio", current: 18, totalIn: 54, totalOut: 36 },
      { id: 2, name: "Tactical Vest (L)", current: 12, totalIn: 20, totalOut: 8 },
      { id: 3, name: "NVGs Gen 3", current: 4, totalIn: 10, totalOut: 6 },
      { id: 4, name: "Ballistic Helmet", current: 12, totalIn: 30, totalOut: 18 },
      { id: 5, name: "Satcom Transceiver", current: 2, totalIn: 5, totalOut: 3 },
      { id: 6, name: "Level IV Plates", current: 150, totalIn: 200, totalOut: 50 },
      { id: 7, name: "Tactical Drone v4", current: 3, totalIn: 6, totalOut: 3 },
      { id: 8, name: "Night Vision Gen 3", current: 8, totalIn: 15, totalOut: 7 },
      { id: 9, name: "Field Medical Kit", current: 20, totalIn: 40, totalOut: 20 },
      { id: 10, name: "Combat Boots", current: 30, totalIn: 60, totalOut: 30 },
    ]
  );
  const [selectedRows, setSelectedRows] = useState<ReportRow[]>([]);
  // Filter and sort logic (simple for demo)
  let filtered =
    !filter.trim()
      ? data
      : data.filter((row: ReportRow) => row.name.toLowerCase().includes(filter.toLowerCase()));
  if (sortBy === "name") filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "current") filtered = filtered.sort((a, b) => b.current - a.current);

  // PDF download handler
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // Title
    doc.setFontSize(16);
    doc.text("Inventory Report", 14, 16);
    doc.setFontSize(10);
    // Timestamp and date range
    const now = new Date();
    const generatedAt = now.toISOString().replace("T", " ").split(".")[0];
    // Format date range as dd-mm-yyyy
    const formatDate = (d: string) => {
      if (!d) return "-";
      const [yyyy, mm, dd] = d.split("-");
      return `${dd}-${mm}-${yyyy}`;
    };
    const dateRange = `Date range: ${formatDate(fromDate)} to ${formatDate(toDate)}`;
    doc.text(`Generated at: ${generatedAt} | ${dateRange}`, 14, 24);
    // Table
    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name", "Current", "Total IN", "Total OUT"]],
      body: (selectedRows.length > 0 ? selectedRows : filtered).map((row: ReportRow) => [row.id, row.name, row.current, row.totalIn, row.totalOut]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [34, 139, 34], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });
    doc.save("inventory-report.pdf");
  };

  // Table row selection
  const handleRowSelect = (row: ReportRow) => {
    setSelectedRows((prev: ReportRow[]) => {
      if (prev.some(r => r.id === row.id)) {
        return prev.filter(r => r.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  };

  return (
    <div className="space-y-6 bg-[#f8fafc] min-h-screen p-4">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800 drop-shadow-sm">Reports & Analytics</h1>
      <Card className="shadow-2xl rounded-2xl border-none">
        <CardHeader className="pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-2xl font-bold text-gray-900">Reports & Analytics</CardTitle>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">From Date</label>
              <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="rounded-lg" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">To Date</label>
              <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="rounded-lg" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Sort By</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="rounded-lg border px-3 py-2">
                <option value="name">Sort by Name</option>
                <option value="current">Sort by Current Qty</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Product Name(s)</label>
              <Input
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="rounded-lg"
                placeholder="Type to search and select from table below"
              />
              <span className="text-xs text-muted-foreground mt-1">Click rows below to select multiple products</span>
              {selectedRows.length > 0 && (
                <div className="mt-2 text-xs text-green-700 font-semibold">
                  Selected: {selectedRows.map(r => r.name).join(", ")}
                </div>
              )}
            </div>
            <Button
              className="bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg mt-6 md:mt-0"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl mt-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-700 hover:bg-green-700 cursor-default">
                  <TableHead className="text-white font-bold text-lg">ID</TableHead>
                  <TableHead className="text-white font-bold text-lg">Name</TableHead>
                  <TableHead className="text-white font-bold text-lg">Current</TableHead>
                  <TableHead className="text-white font-bold text-lg">Total IN</TableHead>
                  <TableHead className="text-white font-bold text-lg">Total OUT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-6">No data found for the selected filters.</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((row, idx) => (
                    <TableRow
                      key={row.id}
                      className={cn(
                        "transition-colors cursor-pointer",
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50",
                        selectedRows.some(r => r.id === row.id)
                          ? "bg-green-200 border-2 border-green-700"
                          : "hover:bg-green-50"
                      )}
                      onClick={() => {
                        setSelectedRows(prev =>
                          prev.some(r => r.id === row.id)
                            ? prev.filter(r => r.id !== row.id)
                            : [...prev, row]
                        );
                      }}
                    >
                      <TableCell className="font-semibold text-gray-700">{row.id}</TableCell>
                      <TableCell className="text-gray-700">{row.name}</TableCell>
                      <TableCell className="text-gray-700">{row.current}</TableCell>
                      <TableCell className="text-gray-700">{row.totalIn}</TableCell>
                      <TableCell className="text-gray-700">{row.totalOut}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {/* Selected products area */}
          {selectedRows.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Selected Products</h2>
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-700 hover:bg-green-700 cursor-default">
                    <TableHead className="text-white font-bold text-lg">ID</TableHead>
                    <TableHead className="text-white font-bold text-lg">Name</TableHead>
                    <TableHead className="text-white font-bold text-lg">Current</TableHead>
                    <TableHead className="text-white font-bold text-lg">Total IN</TableHead>
                    <TableHead className="text-white font-bold text-lg">Total OUT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRows.map((row, idx) => (
                    <TableRow key={row.id} className={cn(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}> 
                      <TableCell className="font-semibold text-gray-700">{row.id}</TableCell>
                      <TableCell className="text-gray-700">{row.name}</TableCell>
                      <TableCell className="text-gray-700">{row.current}</TableCell>
                      <TableCell className="text-gray-700">{row.totalIn}</TableCell>
                      <TableCell className="text-gray-700">{row.totalOut}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
