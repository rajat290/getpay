
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
import { Search, PlusCircle, Filter, FileText, UsersRound } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock student data
const mockStudents = [
  { id: 'STD001', name: 'John Smith', email: 'john@example.com', programme: 'Computer Science', year: '3rd', status: 'Active' },
  { id: 'STD002', name: 'Emily Johnson', email: 'emily@example.com', programme: 'Business Admin', year: '2nd', status: 'Active' },
  { id: 'STD003', name: 'Michael Brown', email: 'michael@example.com', programme: 'Engineering', year: '4th', status: 'Active' },
  { id: 'STD004', name: 'Jessica Davis', email: 'jessica@example.com', programme: 'Medicine', year: '1st', status: 'Inactive' },
  { id: 'STD005', name: 'David Wilson', email: 'david@example.com', programme: 'Law', year: '3rd', status: 'Active' },
];

const StudentsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState(mockStudents);
  const isMobile = useIsMobile();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="admin-header">Students Management</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          <span>Add Student</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-blue-200 from-blue-50 to-blue-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Students</h3>
          <div className="flex items-center">
            <UsersRound size={20} className="text-blue-500 mr-2" />
            <p className="text-2xl font-bold">5</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Across all departments</p>
        </div>
        
        <div className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-green-200 from-green-50 to-green-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Active</h3>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <p className="text-2xl font-bold">4</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Currently enrolled</p>
        </div>
        
        <div className="bg-gradient-to-br border statcard-transition shadow-sm hover:shadow-md border-red-200 from-red-50 to-red-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Inactive</h3>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            <p className="text-2xl font-bold">1</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Not currently enrolled</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input 
            placeholder="Search students..." 
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
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="table-container animate-slide-in">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead className="font-medium">ID</TableHead>
              <TableHead className="font-medium">Name</TableHead>
              {!isMobile && <TableHead className="font-medium">Email</TableHead>}
              {!isMobile && <TableHead className="font-medium">Programme</TableHead>}
              <TableHead className="font-medium">Year</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-secondary/30">
                  <TableCell className="font-medium text-primary">{student.id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  {!isMobile && <TableCell>{student.email}</TableCell>}
                  {!isMobile && <TableCell>{student.programme}</TableCell>}
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                      student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        student.status === 'Active' ? 'bg-green-600' : 'bg-red-600'
                      }`}></span>
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">View</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isMobile ? 4 : 7} className="text-center py-8 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentsManagement;
