import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formService } from '../../services/formService';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SurveyCard } from '@/components/surveys/SurveyCard';
import { Form } from '@/types/form';

export function SurveysListPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchForms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await formService.getForms(page);
      if (response?.forms) {
        setForms(response.forms);
        setTotalPages(Math.ceil(response.total / response.limit));
      } else {
        setForms([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching forms:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch forms');
      setForms([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Call fetchForms when component mounts
  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  // Call fetchForms when page changes
  useEffect(() => {
    if (page > 1) {
      fetchForms();
    }
  }, [page, fetchForms]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await formService.deleteForm(id);
        setForms(forms.filter(form => form.id !== id));
      } catch (err) {
        console.error('Error deleting form:', err);
        setError(err instanceof Error ? err.message : 'Failed to delete form');
      }
    }
  };

  const handlePublish = async (id: number, isPublished: boolean) => {
    try {
      const updatedForm = isPublished
        ? await formService.publishForm(id, false)
        : await formService.publishForm(id, true);
      setForms(forms.map(form => (form.id === id ? updatedForm : form)));
    } catch (err) {
      console.error('Error updating form status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update form status');
    }
  };

  const handleCopyLink = async (formId: number) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/show/${formId}`;
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: 'Link copied!',
        description: 'The survey link has been copied to your clipboard.',
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast({
        title: 'Error',
        description: 'Failed to copy link to clipboard. Please try again.',
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

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p className="font-semibold">Error: {error}</p>
        <Button variant="outline" className="mt-4" onClick={() => fetchForms()}>
          Retry
        </Button>
      </div>
    );
  }

  // Filter surveys based on search query and active state
  const filteredSurveys = forms.filter(survey => {
    const matchesSearch =
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'active') return matchesSearch && survey.isPublished;
    if (filter === 'drafts') return matchesSearch && !survey.isPublished;
    return matchesSearch;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Surveys</h1>
          <p className="text-muted-foreground">Manage and view your surveys.</p>
        </div>

        <Link to="/surveys/create">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Create Survey
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-72">
          <Input
            placeholder="Search surveys..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6" onValueChange={setFilter}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Surveys ({forms.length})</TabsTrigger>
            <TabsTrigger value="active">
              Active ({forms.filter(s => s.isPublished).length})
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts ({forms.filter(s => !s.isPublished).length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-0">
          {filteredSurveys.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSurveys.map(survey => (
                <SurveyCard
                  key={survey.id}
                  id={survey.id}
                  title={survey.title}
                  description={survey.description || ''}
                  responseCount={survey.totalResponses || 0}
                  createdAt={survey.createdAt || new Date().toISOString()}
                  isPublished={survey.isPublished}
                  onPublish={handlePublish}
                  onDelete={handleDelete}
                  onCopyLink={handleCopyLink}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No surveys found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or create a new survey.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-0">
          {filteredSurveys.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSurveys.map(survey => (
                <SurveyCard
                  key={survey.id}
                  id={survey.id}
                  title={survey.title}
                  description={survey.description || ''}
                  responseCount={survey.totalResponses || 0}
                  createdAt={survey.createdAt || new Date().toISOString()}
                  isPublished={survey.isPublished}
                  onPublish={handlePublish}
                  onDelete={handleDelete}
                  onCopyLink={handleCopyLink}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No active surveys</h3>
              <p className="text-muted-foreground">Create a new survey or activate a draft.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-0">
          {filteredSurveys.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSurveys.map(survey => (
                <SurveyCard
                  key={survey.id}
                  id={survey.id}
                  title={survey.title}
                  description={survey.description || ''}
                  responseCount={survey.totalResponses || 0}
                  createdAt={survey.createdAt || new Date().toISOString()}
                  isPublished={survey.isPublished}
                  onPublish={handlePublish}
                  onDelete={handleDelete}
                  onCopyLink={handleCopyLink}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No draft surveys</h3>
              <p className="text-muted-foreground">Create a new survey to get started.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
