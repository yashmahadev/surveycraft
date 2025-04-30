import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SurveyFormBuilder } from '@/components/surveys/SurveyFormBuilder';
import { ShareSurvey } from '@/components/surveys/ShareSurvey';
import { formService } from '@/services/formService';
import { Loader2, Eye, BarChart2, UploadCloud, MoreVertical, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { FormFieldType } from '@/common/enums';
import { Form, FormField } from '@/types/form';

export default function SurveyEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState<Form | null>(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!id) return;

      try {
        const foundSurvey = await formService.getFormById(Number(id));
        setSurvey(foundSurvey);
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

    fetchSurvey();
  }, [id, navigate, toast]);

  const handlePublish = async () => {
    if (!id || !survey) return;

    try {
      const updatedSurvey = await formService.publishForm(Number(id), !survey.isPublished);
      setSurvey(updatedSurvey);
      toast({
        title: 'Success',
        description: `Survey ${updatedSurvey.isPublished ? 'published' : 'unpublished'} successfully`,
      });
    } catch (error) {
      console.error('Error updating survey status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update survey status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const updateSurvey = async (formData: {
    title: string;
    description: string;
    fields: FormField[];
  }) => {
    if (!id || !survey) return;

    try {
      const updatedSurvey = await formService.updateForm(Number(id), formData);
      setSurvey(updatedSurvey);
      toast({
        title: 'Success',
        description: 'Survey updated successfully',
      });
    } catch (error) {
      console.error('Error updating survey:', error);
      toast({
        title: 'Error',
        description: 'Failed to update survey. Please try again.',
        variant: 'destructive',
      });
    }
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

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Edit Survey</h1>
          <p className="text-muted-foreground">Modify your survey fields and settings.</p>
        </div>

        {/* Button Group */}
        <div className="flex gap-2 flex-wrap items-center justify-end">
          <div>
            <Button variant="outline" className="w-full" onClick={() => navigate(`/my-surveys`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="hidden md:flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <DropdownMenuItem onClick={() => navigate(`/surveys/${id}/responses`)}>
                  <Button variant="default" className="w-full">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Responses
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/surveys/${id}/preview`)}>
                  <Button variant="default" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePublish}>
                  <Button variant="default" className="w-full">
                    <UploadCloud className="w-4 h-4 mr-2" />
                    {survey.isPublished ? 'Unpublish' : 'Publish'}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Responsive Dropdown */}
          <div className="md:hidden flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <DropdownMenuItem onClick={() => navigate(`/surveys/${id}/responses`)}>
                  <Button variant="default" className="w-full">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Responses
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/surveys/${id}/preview`)}>
                  <Button variant="default" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePublish}>
                  <Button variant="default" className="w-full">
                    <UploadCloud className="w-4 h-4 mr-2" />
                    {survey.isPublished ? 'Unpublish' : 'Publish'}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        <SurveyFormBuilder
          initialTitle={survey.title}
          initialDescription={survey.description}
          initialFields={survey.fields.map(field => ({
            label: field.label,
            type: field.type as FormFieldType,
            required: field.required,
            options: field.options,
          }))}
          onSave={formData =>
            updateSurvey(formData as { title: string; description: string; fields: FormField[] })
          }
        />

        {survey.isPublished && <ShareSurvey surveyId={survey.id.toString()} />}
      </div>
    </div>
  );
}
