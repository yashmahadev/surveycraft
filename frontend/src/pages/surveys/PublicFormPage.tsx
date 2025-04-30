import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PublicSurveyForm } from '@/components/surveys/PublicSurveyForm';
import { formService } from '@/services/formService';
import { Form } from '@/types/form';
import { Loader2 } from 'lucide-react';

export default function PublicFormPage() {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState<Form | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!formId) return;

      try {
        const response = await formService.getFormByIdForm(Number(formId));
        const foundSurvey = response;

        if (foundSurvey) {
          if (!foundSurvey.isPublished) {
            toast({
              title: 'Error',
              description: 'This survey is not published',
              variant: 'destructive',
            });
            navigate('/survey-error');
            return;
          }
          setSurvey(foundSurvey);
        } else {
          toast({
            title: 'Error',
            description: 'Survey not found',
            variant: 'destructive',
          });
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error fetching survey:', error);
        toast({
          title: 'Error',
          description: 'Failed to load survey',
          variant: 'destructive',
        });
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [formId, navigate, toast]);

  const handleSubmit = async (formData: Record<string, string>) => {
    if (!formId) return;

    try {
      await formService.submitResponse(formId, formData);
      setIsSubmitted(true);
      toast({
        title: 'Success',
        description: 'Your response has been recorded',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit response. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleStartOver = () => {
    setIsSubmitted(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!survey) {
    return null;
  }

  if (isSubmitted) {
    return (
      <div className="container max-w-2xl py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-6">Your response has been successfully recorded.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleStartOver}>Submit Another Response</Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{survey.title}</CardTitle>
          {survey.description && (
            <CardDescription className="mt-2">{survey.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PublicSurveyForm
            fields={survey.fields.map(field => ({
              id: field.label,
              type: field.type,
              label: field.label,
              required: field.required,
              options: field.options,
            }))}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}
