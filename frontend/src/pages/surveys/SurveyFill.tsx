import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PublicSurveyForm } from '@/components/surveys/PublicSurveyForm';
import { Button } from '@/components/ui/button';

export default function SurveyFill() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // This is a mock survey - in reality you would fetch this from your backend
  const mockSurvey = {
    title: 'Customer Feedback Survey',
    description: 'We value your feedback! Please help us improve our services.',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Your Name',
        required: true,
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        required: true,
      },
      {
        id: 'feedback',
        type: 'textarea',
        label: 'Your Feedback',
        required: true,
      },
      {
        id: 'rating',
        type: 'radio',
        label: 'How would you rate our service?',
        required: true,
        options: ['Excellent', 'Good', 'Fair', 'Poor'],
      },
      {
        id: 'improvements',
        type: 'checkbox',
        label: 'What areas need improvement?',
        required: false,
        options: ['Service', 'Product Quality', 'Website', 'Communication'],
      },
    ],
  };

  const handleSubmit = (formData: Record<string, string>) => {
    setIsSubmitted(true);
  };

  const handleStartOver = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              Your response has been recorded. We appreciate your feedback!
            </p>
            <Button onClick={handleStartOver} className="w-full">
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockSurvey.title}</h1>
            <p className="text-gray-600">{mockSurvey.description}</p>
          </div>
          <PublicSurveyForm fields={mockSurvey.fields} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
