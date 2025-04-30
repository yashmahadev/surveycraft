import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SurveyFormBuilder } from '@/components/surveys/SurveyFormBuilder';
import { formService } from '@/services/formService';
import { templateService } from '@/services/templateService';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { FormFieldType } from '@/common/enums';
import { Button } from '@/components/ui/button';
import { Template, FormField } from '@/types/form';

export default function SurveyBuilder() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(!!templateId);
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) return;

      try {
        const response = await templateService.getTemplateById(Number(templateId));
        setTemplate(response);
      } catch (error) {
        console.error('Error fetching template:', error);
        toast({
          title: 'Error',
          description: 'Failed to load template',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId, toast]);

  const handleSave = async (formData: {
    title: string;
    description: string;
    fields: FormField[];
  }) => {
    try {
      if (!formData.title.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Survey title is required',
          variant: 'destructive',
        });
        return;
      }

      if (formData.fields.length === 0) {
        toast({
          title: 'Validation Error',
          description: 'Add at least one field to your survey',
          variant: 'destructive',
        });
        return;
      }

      // Create the survey
      const response = await formService.createForm({
        title: formData.title,
        description: formData.description,
        fields: formData.fields,
        isPublished: false,
      });

      toast({
        title: 'Success',
        description: 'Survey created successfully',
      });

      // Navigate to the edit page
      navigate(`/surveys/${response.id}/edit`);
    } catch (error) {
      console.error('Error creating survey:', error);
      toast({
        title: 'Error',
        description: 'Failed to create survey. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container max-w-3xl py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {template ? 'Create Survey from Template' : 'Create New Survey'}
            </h1>
            <p className="text-muted-foreground">
              {template
                ? `Using template: ${template.title}`
                : 'Design your survey by adding and configuring fields.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate('/templates')} variant="outline">
              <ArrowLeft className="h-4 w-4" />
              Back to Templates
            </Button>
          </div>
        </div>
      </div>

      <SurveyFormBuilder
        initialTitle={template?.title || ''}
        initialDescription={template?.description || ''}
        initialFields={
          template?.fields.map(field => ({
            ...field,
            type: field.type as
              | FormFieldType.Number
              | FormFieldType.Select
              | FormFieldType.Textarea
              | FormFieldType.Text
              | FormFieldType.Email
              | FormFieldType.Checkbox
              | FormFieldType.Radio,
          })) || []
        }
        onSave={handleSave}
      />
    </div>
  );
}
