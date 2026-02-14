"use client";

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { 
  ArrowLeftRight, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Calendar,
  Download,
  Search,
  User,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { StockTransaction } from '@/lib/types';

const MOCK_TRANSACTIONS: StockTransaction[] = [
  { id: '1', equipmentId: '1', equipmentName: 'M1 Abrams Optic', type: 'IN', quantity: 5, reason: 'Restock from HQ', performedBy: 'Admin User', timestamp: '2024-05-20 10:30' },
  { id: '2', equipmentId: '4', equipmentName: 'Level IV Plates', type: 'OUT', quantity: 20, reason: 'Field Deployment Sector 4', performedBy: 'Admin User', timestamp: '2024-05-19 14:15' },
  { id: '3', equipmentId: '3', equipmentName: 'Encrypted Radio RT-1', type: 'IN', quantity: 15, reason: 'Supplier Delivery #RAD-22', performedBy: 'Admin User', timestamp: '2024-05-18 09:00' },
  { id: '4', equipmentId: '2', equipmentName: 'Tactical Drone v4', type: 'OUT', quantity: 2, reason: 'Maintenance Transfer', performedBy: 'Manager User', timestamp: '2024-05-17 16:45' },
  { id: '5', equipmentId: '7', equipmentName: 'Ballistic Helmet (MICH)', type: 'IN', quantity: 10, reason: 'Quarterly Audit Adjustment', performedBy: 'Admin User', timestamp: '2024-05-16 11:20' },
  { id: '6', equipmentId: '5', equipmentName: 'Night Vision Goggles Gen 3', type: 'OUT', quantity: 4, reason: 'Special Ops Team Alpha', performedBy: 'Manager User', timestamp: '2024-05-15 22:10' },
  { id: '7', equipmentId: '6', equipmentName: 'Satcom Terminal B1', type: 'IN', quantity: 2, reason: 'New Arrival', performedBy: 'Admin User', timestamp: '2024-05-14 08:30' },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_TRANSACTIONS.filter(t => 
    t.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.performedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin" title="Transaction Log">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit History</h1>
          <p className="text-muted-foreground mt-1">Review all stock movements, deployments, and adjustments.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 border-none shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-lg">Recent Movements</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Filter movements..." 
                  className="pl-10 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6 font-bold">Type</TableHead>
                  <TableHead className="font-bold">Equipment</TableHead>
                  <TableHead className="font-bold">Quantity</TableHead>
                  <TableHead className="font-bold">Reason / Reference</TableHead>
                  <TableHead className="font-bold">Personnel</TableHead>
                  <TableHead className="pr-6 font-bold text-right">Date/Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        t.type === 'IN' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      )}>
                        {t.type === 'IN' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">{t.equipmentName}</TableCell>
                    <TableCell>
                      <Badge variant={t.type === 'IN' ? 'secondary' : 'outline'} className="rounded-md">
                        {t.type === 'IN' ? '+' : '-'}{t.quantity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{t.reason}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-3 h-3 text-muted-foreground" />
                        </div>
                        <span className="text-xs">{t.performedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="text-xs font-mono text-muted-foreground">{t.timestamp}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 opacity-10" />
                <p>No transaction history matches your search.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-2xl bg-primary text-primary-foreground overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-sm opacity-80">Stock In (24h)</span>
                <span className="font-bold">+42 Units</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-sm opacity-80">Stock Out (24h)</span>
                <span className="font-bold">-18 Units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Critical Issues</span>
                <Badge variant="secondary" className="bg-white text-primary">None</Badge>
              </div>
              <Button variant="outline" className="w-full mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                View Reports
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Filter by Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">Today</Button>
                <Button variant="ghost" className="w-full justify-start text-sm">Last 7 Days</Button>
                <Button variant="ghost" className="w-full justify-start text-sm">Last 30 Days</Button>
                <Button variant="outline" className="w-full justify-start text-sm mt-2 rounded-xl">Custom Range</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
