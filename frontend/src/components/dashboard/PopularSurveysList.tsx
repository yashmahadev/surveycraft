import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PopularSurvey {
  id: number;
  name: string;
  responses: number;
  completionRate: number;
}

interface PopularSurveysListProps {
  surveys: PopularSurvey[];
}

export function PopularSurveysList({ surveys }: PopularSurveysListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Surveys</CardTitle>
        <CardDescription>Your top performing surveys by response count</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {surveys.map((survey, index) => (
            <div key={survey.id} className="flex items-center">
              <div className="mr-4 text-lg font-medium text-muted-foreground">#{index + 1}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{survey.name}</p>
                <p className="text-sm text-muted-foreground">
                  {survey.responses} responses · {survey.completionRate}% completion
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
