
import React from 'react';
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
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Switch
} from '@/components/ui/switch';

const SettingsManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your system settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <div className="overflow-auto">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Institute Information</CardTitle>
              <CardDescription>Update your institute's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instituteName">Institute Name</Label>
                  <Input id="instituteName" defaultValue="PayWise University" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instituteEmail">Email Address</Label>
                  <Input id="instituteEmail" type="email" defaultValue="admin@paywise.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institutePhone">Phone Number</Label>
                  <Input id="institutePhone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instituteAddress">Address</Label>
                  <Input id="instituteAddress" defaultValue="123 Education St, Learning City" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="instituteDescription">Description</Label>
                <Input id="instituteDescription" defaultValue="Leading institute for higher education" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Year</CardTitle>
              <CardDescription>Configure your current academic year settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentYear">Current Academic Year</Label>
                  <Select defaultValue="2023-2024">
                    <SelectTrigger id="currentYear">
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2022-2023">2022-2023</SelectItem>
                      <SelectItem value="2021-2022">2021-2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentTerm">Current Term</Label>
                  <Select defaultValue="fall">
                    <SelectTrigger id="currentTerm">
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure available payment methods for students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { id: 'credit-card', label: 'Credit/Debit Card', enabled: true },
                  { id: 'bank-transfer', label: 'Direct Bank Transfer', enabled: true },
                  { id: 'paypal', label: 'PayPal', enabled: false },
                  { id: 'cash', label: 'Cash Payment', enabled: true },
                ].map((method) => (
                  <div key={method.id} className="flex items-center justify-between">
                    <Label htmlFor={method.id}>{method.label}</Label>
                    <Switch id={method.id} defaultChecked={method.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Deadlines</CardTitle>
              <CardDescription>Set payment due dates and late fee policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fallDueDate">Fall Semester Due Date</Label>
                  <Input id="fallDueDate" type="date" defaultValue="2023-08-15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="springDueDate">Spring Semester Due Date</Label>
                  <Input id="springDueDate" type="date" defaultValue="2024-01-15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lateFee">Late Fee Amount (%)</Label>
                  <Input id="lateFee" type="number" defaultValue="5" min="0" max="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gracePeriod">Grace Period (Days)</Label>
                  <Input id="gracePeriod" type="number" defaultValue="7" min="0" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure when emails are sent to students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { id: 'payment-receipt', label: 'Payment Receipt', enabled: true },
                  { id: 'payment-reminder', label: 'Payment Reminder', enabled: true },
                  { id: 'payment-overdue', label: 'Payment Overdue Notice', enabled: true },
                  { id: 'fee-update', label: 'Fee Structure Updates', enabled: false },
                ].map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between">
                    <Label htmlFor={notification.id}>{notification.label}</Label>
                    <Switch id={notification.id} defaultChecked={notification.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reminder Schedule</CardTitle>
              <CardDescription>Configure when payment reminders are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstReminder">First Reminder (days before due date)</Label>
                  <Input id="firstReminder" type="number" defaultValue="7" min="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondReminder">Second Reminder (days before due date)</Label>
                  <Input id="secondReminder" type="number" defaultValue="3" min="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overdueReminder">Overdue Reminder (days after due date)</Label>
                  <Input id="overdueReminder" type="number" defaultValue="1" min="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderFrequency">Reminder Frequency (days)</Label>
                  <Input id="reminderFrequency" type="number" defaultValue="7" min="1" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>Configure password requirements for user accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { id: 'min-length', label: 'Minimum Password Length', value: '8 characters' },
                  { id: 'require-special', label: 'Require Special Characters', enabled: true },
                  { id: 'require-numbers', label: 'Require Numbers', enabled: true },
                  { id: 'require-uppercase', label: 'Require Uppercase Letters', enabled: true },
                  { id: 'password-expiry', label: 'Password Expiry', value: '90 days' },
                ].map((policy, index) => (
                  <div key={policy.id} className="flex items-center justify-between">
                    <Label htmlFor={policy.id}>{policy.label}</Label>
                    {policy.value ? (
                      <span className="text-sm text-muted-foreground">{policy.value}</span>
                    ) : (
                      <Switch id={policy.id} defaultChecked={policy.enabled} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>Configure role-based permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminRole">Administrator Role</Label>
                  <Select defaultValue="full-access">
                    <SelectTrigger id="adminRole">
                      <SelectValue placeholder="Select permissions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-access">Full Access</SelectItem>
                      <SelectItem value="limited-access">Limited Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staffRole">Staff Role</Label>
                  <Select defaultValue="view-edit">
                    <SelectTrigger id="staffRole">
                      <SelectValue placeholder="Select permissions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view-only">View Only</SelectItem>
                      <SelectItem value="view-edit">View and Edit</SelectItem>
                      <SelectItem value="full-access">Full Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;
