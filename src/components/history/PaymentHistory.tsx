
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Printer, Check, Clock, AlertTriangle } from 'lucide-react';
import { currentUser, getStudentPaymentHistory } from '@/data/mockData';
import { toast } from 'sonner';

const PaymentHistory = () => {
  const paymentHistory = getStudentPaymentHistory(currentUser.id);
  const [filter, setFilter] = React.useState<string>('all');

  const handleDownloadReceipt = (paymentId: string) => {
    // In a real app, this would download a PDF receipt
    toast.success('Receipt downloaded successfully');
  };

  const handlePrintReceipt = (paymentId: string) => {
    // In a real app, this would open a print dialog
    toast.success('Print dialog opened');
  };

  const filteredPayments = filter === 'all' 
    ? paymentHistory
    : paymentHistory.filter(payment => payment.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <Check className="h-4 w-4 mr-1 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 mr-1 text-amber-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'payment-status-paid';
      case 'pending':
        return 'payment-status-pending';
      case 'overdue':
        return 'payment-status-overdue';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Payment History</h2>
        <p className="text-muted-foreground">
          View all your previous and pending payments
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Select defaultValue="all" onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPayments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.feeName}</TableCell>
                    <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : '-'}</TableCell>
                    <TableCell>
                      {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      <div className={getStatusClass(payment.status)}>
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {payment.status === 'paid' && (
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadReceipt(payment.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePrintReceipt(payment.id)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No payment records found matching your filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;
