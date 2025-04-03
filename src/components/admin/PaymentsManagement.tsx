
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download, Calendar, FileText, ArrowDownUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock payment data
const mockPayments = [
  { id: 'PMT001', studentId: 'STD001', studentName: 'John Smith', amount: 2500, date: '2023-10-15', status: 'Paid', type: 'Tuition' },
  { id: 'PMT002', studentId: 'STD002', studentName: 'Emily Johnson', amount: 1500, date: '2023-10-14', status: 'Paid', type: 'Hostel' },
  { id: 'PMT003', studentId: 'STD003', studentName: 'Michael Brown', amount: 3000, date: '2023-10-12', status: 'Pending', type: 'Tuition' },
  { id: 'PMT004', studentId: 'STD004', studentName: 'Jessica Davis', amount: 500, date: '2023-10-10', status: 'Failed', type: 'Library' },
  { id: 'PMT005', studentId: 'STD005', studentName: 'David Wilson', amount: 2000, date: '2023-10-05', status: 'Paid', type: 'Tuition' },
];

const PaymentsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [payments, setPayments] = useState(mockPayments);
  const isMobile = useIsMobile();

  const filteredPayments = payments.filter(payment =>
    payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="admin-header">Payments Management</h1>
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-green-200 from-green-50 to-green-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Received</h3>
          <p className="text-2xl font-bold">$8,500.00</p>
          <div className="flex items-center mt-2 text-green-600 text-sm">
            <ArrowDownUp size={14} className="mr-1" />
            <span>+5% from last month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-amber-200 from-amber-50 to-amber-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Pending</h3>
          <p className="text-2xl font-bold">$3,000.00</p>
          <div className="flex items-center mt-2 text-amber-600 text-sm">
            <ArrowDownUp size={14} className="mr-1" />
            <span>2 payments</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-red-200 from-red-50 to-red-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Failed</h3>
          <p className="text-2xl font-bold">$500.00</p>
          <div className="flex items-center mt-2 text-red-600 text-sm">
            <ArrowDownUp size={14} className="mr-1" />
            <span>1 payment</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input 
            placeholder="Search payments..." 
            className="pl-10 border-secondary bg-white shadow-sm focus:border-primary" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 shrink-0 bg-white shadow-sm hover:bg-secondary/50">
            <Filter size={18} className="text-primary" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 shrink-0 bg-white shadow-sm hover:bg-secondary/50">
            <FileText size={18} className="text-primary" />
            <span>Report</span>
          </Button>
        </div>
      </div>

      <div className="table-container animate-slide-in">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead className="font-medium">ID</TableHead>
              {!isMobile && <TableHead className="font-medium">Student ID</TableHead>}
              <TableHead className="font-medium">Student</TableHead>
              <TableHead className="font-medium">Amount</TableHead>
              {!isMobile && <TableHead className="font-medium">Type</TableHead>}
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-secondary/30">
                  <TableCell className="font-medium text-primary">{payment.id}</TableCell>
                  {!isMobile && <TableCell>{payment.studentId}</TableCell>}
                  <TableCell className="font-medium">{payment.studentName}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  {!isMobile && <TableCell>{payment.type}</TableCell>}
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                      payment.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        payment.status === 'Paid' ? 'bg-green-600' : 
                        payment.status === 'Pending' ? 'bg-amber-600' : 
                        'bg-red-600'
                      }`}></span>
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">Details</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isMobile ? 6 : 8} className="text-center py-8 text-muted-foreground">
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentsManagement;
