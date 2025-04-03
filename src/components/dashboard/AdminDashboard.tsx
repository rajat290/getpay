
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Calendar, 
  Users, 
  Clock, 
  FileText, 
  TrendingUp,
  Check,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDashboardSummary } from '@/data/mockData';

// Import the Chart component for admin dashboard
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
  Cell,
} from 'recharts';

const AdminDashboard = () => {
  const { 
    totalCollected, 
    totalPending, 
    paidCount, 
    pendingCount, 
    overdueCount,
    recentPayments
  } = getDashboardSummary();

  // Sample data for the charts - in a real app, this would come from API
  const paymentStatusData = [
    { name: 'Paid', value: paidCount, color: '#10b981' },
    { name: 'Pending', value: pendingCount, color: '#f59e0b' },
    { name: 'Overdue', value: overdueCount, color: '#ef4444' },
  ];

  const monthlyCollectionData = [
    { name: 'Jan', amount: 12500 },
    { name: 'Feb', amount: 15000 },
    { name: 'Mar', amount: 18000 },
    { name: 'Apr', amount: 16000 },
    { name: 'May', amount: 21000 },
    { name: 'Jun', amount: 19500 },
    { name: 'Jul', amount: 22000 },
    { name: 'Aug', amount: 24500 },
    { name: 'Sep', amount: totalCollected }, // Current month with real data
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Fee management overview and analytics
        </p>
      </div>
      
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-green-200 from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-amber-200 from-amber-50 to-amber-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Collection</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all fee types
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-blue-200 from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((paidCount / (paidCount + pendingCount + overdueCount)) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              Collection rate
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-red-200 from-red-50 to-red-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              Requires follow-up
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Collection Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyCollectionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                />
                <Legend />
                <Bar dataKey="amount" name="Collection" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value, 'Count']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map(payment => (
                <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{payment.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.feeName} • {new Date(payment.paymentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                    <div className="payment-status-paid">
                      <Check className="h-3 w-3 mr-1" />
                      Paid
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" asChild className="mt-6 w-full">
              <Link to="/payments">
                View All Payments
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/students">
                  <Users className="mr-2 h-4 w-4" />
                  View All Students
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/reports">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Reports
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/settings">
                  <Calendar className="mr-2 h-4 w-4" />
                  Fee Schedule
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
