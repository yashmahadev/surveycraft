import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { formService } from '@/services/formService';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PublicSurveyForm } from '@/components/surveys/PublicSurveyForm';
import { Form } from '@/types/form';

export default function SurveyPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState<Form | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await formService.getForms(1);
        const foundSurvey = response.forms.find(form => form.id === Number(id));
        if (foundSurvey) {
          setSurvey(foundSurvey);
        } else {
          toast({
            title: 'Error',
            description: 'Survey not found',
            variant: 'destructive',
          });
          navigate('/my-surveys');
        }
      } catch (error) {
        console.error('Error fetching survey:', error);
        toast({
          title: 'Error',
          description: 'Failed to load survey',
          variant: 'destructive',
        });
        navigate('/my-surveys');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSurvey();
    }
  }, [id, navigate, toast]);

  const handleSubmit = async (formData: Record<string, string | string[] | boolean>) => {
    try {
      setIsSubmitted(true);

      toast({
        title: 'Preview Mode',
        description: 'This is a preview. No data will be saved.',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit form',
        variant: 'destructive',
      });
    }
  };

  const handleStartOver = () => {
    setIsSubmitted(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
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
            <p className="text-gray-600 mb-6">
              This is a preview mode. Your response has not been recorded.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleStartOver}>Submit Another Response</Button>
              <Button variant="outline" onClick={() => navigate('/my-surveys')}>
                Back to Surveys
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
              id: `${field.type}-${field.label}`,
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
