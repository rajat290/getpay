
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SummaryBoxWrapperProps {
  title?: string;
  children: React.ReactNode;
}

const SummaryBoxWrapper = ({ title, children }: SummaryBoxWrapperProps) => {
  return (
    <Card className="shadow-sm mb-6 w-full">
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default SummaryBoxWrapper;
