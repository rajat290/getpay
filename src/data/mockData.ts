
export type Student = {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  class: string;
  profileImage?: string;
};

export type FeeType = {
  id: string;
  name: string;
  amount: number;
  description: string;
  dueDate: string;
};

export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export type Payment = {
  id: string;
  studentId: string;
  feeTypeId: string;
  amount: number;
  paymentDate: string;
  status: PaymentStatus;
  transactionId: string;
  paymentMethod: 'card' | 'bank_transfer' | 'cash';
};

export const students: Student[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', rollNumber: 'ST001', class: 'Grade 10' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', rollNumber: 'ST002', class: 'Grade 11' },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', rollNumber: 'ST003', class: 'Grade 9' },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', rollNumber: 'ST004', class: 'Grade 10' },
  { id: '5', name: 'James Lee', email: 'james@example.com', rollNumber: 'ST005', class: 'Grade 12' },
];

export const feeTypes: FeeType[] = [
  { 
    id: '1', 
    name: 'Tuition Fee - Term 1', 
    amount: 5000, 
    description: 'Regular tuition fee for the first term',
    dueDate: '2023-09-15'
  },
  { 
    id: '2', 
    name: 'Technology Fee', 
    amount: 1200, 
    description: 'Annual fee for technology resources',
    dueDate: '2023-10-20'
  },
  { 
    id: '3', 
    name: 'Library Fee', 
    amount: 800, 
    description: 'Annual library and resources fee',
    dueDate: '2023-09-30'
  },
  { 
    id: '4', 
    name: 'Sports Fee', 
    amount: 1500, 
    description: 'Annual sports facilities and equipment fee',
    dueDate: '2023-10-10'
  },
  { 
    id: '5', 
    name: 'Exam Fee', 
    amount: 1000, 
    description: 'Term 1 examination fee',
    dueDate: '2023-11-05'
  },
];

export const payments: Payment[] = [
  {
    id: '1',
    studentId: '1',
    feeTypeId: '1',
    amount: 5000,
    paymentDate: '2023-09-10',
    status: 'paid',
    transactionId: 'TXN123456',
    paymentMethod: 'card'
  },
  {
    id: '2',
    studentId: '1',
    feeTypeId: '2',
    amount: 1200,
    paymentDate: '2023-10-05',
    status: 'paid',
    transactionId: 'TXN234567',
    paymentMethod: 'bank_transfer'
  },
  {
    id: '3',
    studentId: '2',
    feeTypeId: '1',
    amount: 5000,
    paymentDate: '2023-09-12',
    status: 'paid',
    transactionId: 'TXN345678',
    paymentMethod: 'card'
  },
  {
    id: '4',
    studentId: '2',
    feeTypeId: '2',
    amount: 0,
    paymentDate: '',
    status: 'pending',
    transactionId: '',
    paymentMethod: 'card'
  },
  {
    id: '5',
    studentId: '3',
    feeTypeId: '1',
    amount: 5000,
    paymentDate: '',
    status: 'overdue',
    transactionId: '',
    paymentMethod: 'card'
  },
  {
    id: '6',
    studentId: '4',
    feeTypeId: '1',
    amount: 5000,
    paymentDate: '2023-09-14',
    status: 'paid',
    transactionId: 'TXN567890',
    paymentMethod: 'cash'
  },
];

// Helper function to get pending payments for a student
export const getPendingPaymentsForStudent = (studentId: string) => {
  // Find all payments related to student
  const studentPayments = payments.filter(payment => payment.studentId === studentId);
  
  // Create a map of fee types that the student has already paid
  const paidFeeTypes = new Set(
    studentPayments
      .filter(payment => payment.status === 'paid')
      .map(payment => payment.feeTypeId)
  );
  
  // Get all fee types that are not in the paid set
  return feeTypes
    .filter(feeType => !paidFeeTypes.has(feeType.id))
    .map(feeType => {
      const existingPayment = studentPayments.find(p => p.feeTypeId === feeType.id);
      return {
        ...feeType,
        status: existingPayment?.status || 'pending'
      };
    });
};

// Helper function to get student's payment history
export const getStudentPaymentHistory = (studentId: string) => {
  return payments
    .filter(payment => payment.studentId === studentId)
    .map(payment => {
      const feeType = feeTypes.find(ft => ft.id === payment.feeTypeId);
      return {
        ...payment,
        feeName: feeType?.name || 'Unknown Fee',
        dueDate: feeType?.dueDate || ''
      };
    });
};

// Helper function to get a dashboard summary
export const getDashboardSummary = () => {
  const totalCollected = payments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const totalPending = feeTypes.reduce((sum, feeType) => {
    const paidForThisFee = payments.filter(
      p => p.feeTypeId === feeType.id && p.status === 'paid'
    ).length;
    
    const totalStudents = students.length;
    const pendingCount = totalStudents - paidForThisFee;
    
    return sum + (pendingCount * feeType.amount);
  }, 0);
  
  const paidCount = payments.filter(p => p.status === 'paid').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const overdueCount = payments.filter(p => p.status === 'overdue').length;
  
  return {
    totalCollected,
    totalPending,
    paidCount,
    pendingCount,
    overdueCount,
    // Simple recent payment calculation
    recentPayments: payments
      .filter(p => p.status === 'paid')
      .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
      .slice(0, 5)
      .map(payment => {
        const student = students.find(s => s.id === payment.studentId);
        const feeType = feeTypes.find(f => f.id === payment.feeTypeId);
        return {
          ...payment,
          studentName: student?.name || 'Unknown Student',
          feeName: feeType?.name || 'Unknown Fee'
        };
      })
  };
};

// Current logged in user - for demo purposes
export const currentUser = {
  id: '1',
  name: 'John Smith',
  email: 'john@example.com',
  role: 'student' as const,
  rollNumber: 'ST001',
  class: 'Grade 10'
};
