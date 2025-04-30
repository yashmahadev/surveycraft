import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentResponse {
  id: number;
  surveyName: string;
  date: string;
}

interface RecentResponsesListProps {
  responses: RecentResponse[];
}

export function RecentResponsesList({ responses }: RecentResponsesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Responses</CardTitle>
        <CardDescription>Latest survey submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {responses.map(response => {
            const date = new Date(response.date);
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(date);

            return (
              <div key={response.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{response.surveyName}</p>
                </div>
                <div className="text-sm text-muted-foreground">{formattedDate}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
