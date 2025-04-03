
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, CheckCircle, Calendar, AlertCircle } from 'lucide-react';
import { currentUser, getPendingPaymentsForStudent } from '@/data/mockData';
import { toast } from 'sonner';

const PaymentDialog = ({ 
  isOpen, 
  onClose, 
  feeDetails 
}: {
  isOpen: boolean;
  onClose: () => void;
  feeDetails: any;
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      toast.success('Payment successful', {
        description: `Payment of ₹${feeDetails.amount.toLocaleString()} for ${feeDetails.name} has been processed.`,
      });
    }, 2000);
  };

  const isFormValid = 
    paymentMethod === 'card' ? 
      cardDetails.cardNumber.length === 16 && 
      cardDetails.cardholderName.length > 3 &&
      cardDetails.expiryDate.length === 5 &&
      cardDetails.cvv.length === 3
      : true;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete your payment</DialogTitle>
          <DialogDescription>
            You are paying ₹{feeDetails?.amount?.toLocaleString()} for {feeDetails?.name}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="card" className="w-full" onValueChange={(value) => setPaymentMethod(value as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
            <TabsTrigger value="bank_transfer">Bank Transfer</TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456" 
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input 
                id="cardholderName" 
                placeholder="John Smith" 
                value={cardDetails.cardholderName}
                onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  placeholder="MM/YY" 
                  value={cardDetails.expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    
                    if (value.length <= 2) {
                      setCardDetails({...cardDetails, expiryDate: value});
                    } else {
                      setCardDetails({
                        ...cardDetails, 
                        expiryDate: `${value.slice(0, 2)}/${value.slice(2, 4)}`
                      });
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  placeholder="123" 
                  type="password"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="bank_transfer" className="py-4">
            <div className="rounded-md bg-secondary p-4">
              <h4 className="font-medium mb-2">Bank Transfer Details</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Account Name:</span> Institute Name</p>
                <p><span className="font-medium">Account Number:</span> 1234567890</p>
                <p><span className="font-medium">IFSC Code:</span> ABCD0001234</p>
                <p><span className="font-medium">Bank:</span> Example Bank</p>
                <p><span className="font-medium">Reference:</span> {currentUser.rollNumber}</p>
              </div>
              <p className="text-sm mt-4 text-muted-foreground">
                Please use your Roll Number as reference when making the transfer.
                After payment, allow 1-2 working days for verification.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handlePayment} 
            disabled={paymentMethod === 'card' && !isFormValid || isProcessing}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : paymentMethod === 'card' ? (
              <>Pay Now</>
            ) : (
              <>Mark as Transferred</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const StudentFeePayment = () => {
  const pendingPayments = getPendingPaymentsForStudent(currentUser.id);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const handlePayNow = (fee: any) => {
    setSelectedFee(fee);
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
    setSelectedFee(null);
  };

  // Categorize fees
  const upcomingFees = pendingPayments.filter(fee => fee.status === 'pending');
  const overdueFees = pendingPayments.filter(fee => fee.status === 'overdue');

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pay Fees</h2>
        <p className="text-muted-foreground">
          View and pay your pending fees
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingFees.length === 0 && overdueFees.length === 0 ? (
          <Card className="col-span-full flex flex-col items-center justify-center p-12">
            <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
            <p className="text-muted-foreground text-center">
              You have no pending fees to pay at this time.
              Check back later for upcoming payments.
            </p>
          </Card>
        ) : (
          <>
            {overdueFees.map(fee => (
              <Card key={fee.id} className="fee-card border border-red-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{fee.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {fee.description}
                    </p>
                  </div>
                  <div className="payment-status-overdue flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Overdue
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Due on {new Date(fee.dueDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">₹{fee.amount.toLocaleString()}</div>
                  <Button onClick={() => handlePayNow(fee)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                </div>
              </Card>
            ))}
            
            {upcomingFees.map(fee => (
              <Card key={fee.id} className="fee-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{fee.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {fee.description}
                    </p>
                  </div>
                  <div className="payment-status-pending flex items-center">
                    Pending
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Due on {new Date(fee.dueDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">₹{fee.amount.toLocaleString()}</div>
                  <Button onClick={() => handlePayNow(fee)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Payment Dialog */}
      {selectedFee && (
        <PaymentDialog
          isOpen={paymentDialogOpen}
          onClose={handleClosePaymentDialog}
          feeDetails={selectedFee}
        />
      )}
    </div>
  );
};

export default StudentFeePayment;
