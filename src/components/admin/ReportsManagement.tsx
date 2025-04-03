
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar, ArrowUpRight, TrendingDown, TrendingUp, FileCheck, AlarmClock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const monthlyPaymentData = [
  { name: 'Jan', amount: 25000 },
  { name: 'Feb', amount: 30000 },
  { name: 'Mar', amount: 28000 },
  { name: 'Apr', amount: 35000 },
  { name: 'May', amount: 32000 },
  { name: 'Jun', amount: 40000 },
];

const paymentTypeData = [
  { name: 'Tuition', value: 60 },
  { name: 'Hostel', value: 20 },
  { name: 'Library', value: 10 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const ReportsManagement = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="admin-header">Analytics & Reports</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-white shadow-sm hover:bg-secondary/50">
            <Calendar size={18} className="text-primary" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-white shadow-sm hover:bg-secondary/50">
            <Download size={18} className="text-primary" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2 bg-gradient-to-br from-white to-blue-50">
            <CardDescription>Total Revenue</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">$190,000</CardTitle>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp size={16} className="mr-1" />
                <span>12%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Compared to $170,000 last semester</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2 bg-gradient-to-br from-white to-amber-50">
            <CardDescription>Pending Payments</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">$24,500</CardTitle>
              <div className="flex items-center text-red-600 text-sm">
                <TrendingDown size={16} className="mr-1" />
                <span>5%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">From 25 students</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2 bg-gradient-to-br from-white to-green-50">
            <CardDescription>Collection Rate</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">89%</CardTitle>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp size={16} className="mr-1" />
                <span>3%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Compared to 86% last semester</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full animate-fade-in">
        <TabsList className="mb-4 bg-secondary/40 p-1">
          <TabsTrigger value="revenue" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Revenue</TabsTrigger>
          <TabsTrigger value="payment-types" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Payment Types</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="mt-0">
          <Card className="shadow-sm border border-border/70">
            <CardHeader className="bg-gradient-to-r from-white to-blue-50/50">
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Payment collections over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyPaymentData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Amount']}
                      contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                    <Bar dataKey="amount" fill="hsl(215, 85%, 45%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment-types" className="mt-0">
          <Card className="shadow-sm border border-border/70">
            <CardHeader className="bg-gradient-to-r from-white to-blue-50/50">
              <CardTitle>Payment Distribution</CardTitle>
              <CardDescription>Distribution of payments by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="shadow-sm border border-border/70 animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-white to-blue-50/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Generated reports from the past month</CardDescription>
            </div>
            <Button size="sm" className="mt-2 sm:mt-0 bg-primary hover:bg-primary/90">Generate New Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'End of Semester Financial Report', date: 'June 15, 2023', type: 'PDF', icon: FileCheck },
              { name: 'Outstanding Payments Report', date: 'June 10, 2023', type: 'CSV', icon: AlarmClock },
              { name: 'Payment Collection Analysis', date: 'June 5, 2023', type: 'Excel', icon: TrendingUp },
              { name: 'Fee Structure Comparison', date: 'May 28, 2023', type: 'PDF', icon: FileCheck },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0 hover:bg-secondary/20 p-2 rounded-md transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    {React.createElement(report.icon, { size: 18, className: "text-primary" })}
                  </div>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="bg-secondary px-2 py-1 rounded text-xs font-medium mr-4">{report.type}</span>
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <Download size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsManagement;
