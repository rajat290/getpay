
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { currentUser } from '@/data/mockData';

const StudentProfile = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Student Profile</h2>
        <p className="text-muted-foreground">
          View and update your profile information
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-3 mb-4">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentUser.class} • Roll: {currentUser.rollNumber}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={currentUser.name} readOnly />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} readOnly />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="roll">Roll Number</Label>
                <Input id="roll" defaultValue={currentUser.rollNumber} readOnly />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="class">Class</Label>
                <Input id="class" defaultValue={currentUser.class} readOnly />
              </div>
            </div>
            
            <Button className="w-full" variant="outline">
              Request Information Update
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="password">Current Password</Label>
                <Input id="password" type="password" />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            
            <Button className="w-full">
              Update Password
            </Button>
            
            <div className="space-y-3 pt-4 border-t">
              <div className="space-y-1">
                <Label htmlFor="notifications">Notification Preferences</Label>
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                  <Label 
                    htmlFor="email-notifications"
                    className="text-sm font-normal"
                  >
                    Email notifications for payment reminders
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="sms-notifications"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                  <Label 
                    htmlFor="sms-notifications"
                    className="text-sm font-normal"
                  >
                    SMS notifications for payment deadlines
                  </Label>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
