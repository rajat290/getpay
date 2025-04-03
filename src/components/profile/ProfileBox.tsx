
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, School, Home, MapPin, Book } from 'lucide-react';

interface ProfileBoxProps {
  studentName: string;
  studentId: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  department: string;
  avatarUrl?: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  className?: string;
}

const ProfileBox = ({
  studentName,
  studentId,
  email,
  phone,
  enrollmentDate,
  department,
  avatarUrl,
  fatherName,
  motherName,
  address,
  className,
}: ProfileBoxProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={`cursor-pointer hover:shadow-md transition-all duration-200 ${className}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Student Profile</CardTitle>
            <CardDescription>Click to view details</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={avatarUrl} alt={studentName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">{studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-xl">{studentName}</h1>
              <p className="text-sm text-muted-foreground">Here's an overview of your fee payments</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <Avatar className="h-24 w-24 mb-4 border-2 border-primary/20">
            <AvatarImage src={avatarUrl} alt={studentName} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">{studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold">{studentName}</h3>
          <p className="text-muted-foreground">ID: {studentId}</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>Enrolled: {enrollmentDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <School className="h-5 w-5 text-muted-foreground" />
            <span>Department: {department}</span>
          </div>
          {fatherName && (
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span>Father's Name: {fatherName}</span>
            </div>
          )}
          {motherName && (
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span>Mother's Name: {motherName}</span>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>Address: {address}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBox;
