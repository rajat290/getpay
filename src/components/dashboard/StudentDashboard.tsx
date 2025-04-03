
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, Clock, AlertTriangle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { currentUser, getStudentPaymentHistory, getPendingPaymentsForStudent } from '@/data/mockData';
import ProfileBox from '@/components/profile/ProfileBox';

const StudentDashboard = () => {
  const pendingPayments = getPendingPaymentsForStudent(currentUser.id);
  const paymentHistory = getStudentPaymentHistory(currentUser.id);
  
  const upcomingPayments = pendingPayments
    .filter(payment => payment.status !== 'overdue')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);
    
  const overduePayments = pendingPayments.filter(payment => payment.status === 'overdue');
  
  const totalPaid = paymentHistory
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalPending = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-2">
        <ProfileBox 
          studentName="Raj Kumar Singh"
          studentId="STU20230145"
          email="rajkumar.singh@example.com"
          phone="+91 98765 43210"
          enrollmentDate="12 Aug 2022"
          department="Computer Science"
          avatarUrl="/placeholder.svg"
          fatherName="Suresh Singh"
          motherName="Priya Singh"
          address="123 Vijay Nagar, New Delhi"
          className="col-span-2"
        />
        
        <Card className="bg-gradient-to-br from-amber-400 to-amber-600 border-amber-500 overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Pending Amount</span>
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-white/80 mt-1">
              Due fees to be paid
            </p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-400 to-green-600 border-green-500 overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Total Paid</span>
              <Check className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-white/80 mt-1">
              All your completed payments
            </p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-400 to-blue-600 border-blue-500 overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Next Payment</span>
              <Calendar className="h-5 w-5 text-white" />
            </div>
            {upcomingPayments.length > 0 ? (
              <>
                <div className="text-2xl font-bold text-white">₹{upcomingPayments[0].amount.toLocaleString()}</div>
                <p className="text-xs text-white/80 mt-1">
                  Due on {new Date(upcomingPayments[0].dueDate).toLocaleDateString()}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-white">-</div>
                <p className="text-xs text-white/80 mt-1">No upcoming payments</p>
              </>
            )}
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-400 to-red-600 border-red-500 overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Overdue Fees</span>
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{overduePayments.length}</div>
            <p className="text-xs text-white/80 mt-1">
              {overduePayments.length === 0 ? "No overdue payments" : "Requires immediate attention"}
            </p>
          </div>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Payments</h2>
            {upcomingPayments.length > 0 ? (
              <div className="space-y-4">
                {upcomingPayments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <p className="text-sm text-gray-500">
                        Due on {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                      <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">Pending</span>
                    </div>
                  </div>
                ))}
                <Button asChild className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/fees" className="flex items-center justify-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Fees
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Check className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-center text-gray-500">
                  No upcoming payments.
                  <br />You're all caught up!
                </p>
              </div>
            )}
          </div>
        </Card>
        
        <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-all">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
            {paymentHistory.filter(p => p.status === 'paid').length > 0 ? (
              <div className="space-y-4">
                {paymentHistory
                  .filter(p => p.status === 'paid')
                  .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
                  .slice(0, 5)
                  .map(payment => (
                    <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{payment.feeName}</p>
                        <p className="text-sm text-gray-500">
                          Paid on {new Date(payment.paymentDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Paid</span>
                      </div>
                    </div>
                  ))
                }
                <Button variant="outline" asChild className="mt-4 w-full border-gray-300 hover:bg-gray-50">
                  <Link to="/history" className="flex items-center justify-center">
                    View All History
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-center text-gray-500">
                  No payment history found.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
