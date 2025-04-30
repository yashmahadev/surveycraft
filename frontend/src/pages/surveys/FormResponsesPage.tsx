import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { formService } from '@/services/formService';
import { Form, Responses } from '@/types/form';

export default function FormResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<Responses[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const responsesData = await formService.getFormResponses(Number(id), 1);
        setForm(responsesData.form);
        setResponses(responsesData.responses || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load form responses',
          variant: 'destructive',
        });
        navigate('/my-surveys');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, toast]);

  const filteredResponses = responses.filter(response => {
    const searchLower = searchQuery.toLowerCase();
    return Object.values(response.answers).some(value =>
      String(value).toLowerCase().includes(searchLower),
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!form) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
              <p className="text-muted-foreground">View and manage responses from your survey.</p>
            </div>
            <Button variant="outline" onClick={() => navigate(`/my-surveys`)}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to List
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Response Overview</CardTitle>
            <CardDescription>Total Responses: {responses.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Search responses..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead key="submitted">Submitted</TableHead>
                      {form.fields.map((field, index) => (
                        <TableHead key={`header-${field.id || index}-${field.label}`}>
                          {field.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResponses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={form.fields.length + 1} className="text-center">
                          No responses found
                        </TableCell>
                      </TableRow>
                    )}
                    {filteredResponses.map(response => (
                      <TableRow key={`response-${response.id}`}>
                        <TableCell key={`date-${response.id}`}>
                          {new Date(response.submittedAt).toLocaleDateString()}
                        </TableCell>
                        {form.fields.map((field, index) => (
                          <TableCell
                            key={`cell-${response.id}-${field.id || index}-${field.label}`}
                          >
                            {Array.isArray(response.answers[field.label])
                              ? (response.answers[field.label] as string[]).join(', ')
                              : String(response.answers[field.label] || '')}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
