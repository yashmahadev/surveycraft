import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, List, Copy, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SurveyCardProps {
  id: number;
  title: string;
  description: string;
  responseCount: number;
  createdAt: string;
  isPublished?: boolean;
  onPublish?: (id: number, isPublished: boolean) => void;
  onDelete?: (id: number) => void;
  onCopyLink?: (id: number) => void;
}

export function SurveyCard({
  id,
  title,
  description,
  responseCount,
  createdAt,
  isPublished = false,
  onPublish,
  onDelete,
  onCopyLink,
}: SurveyCardProps) {
  const date = new Date(createdAt);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
            <CardDescription className="mt-1.5 line-clamp-2">{description}</CardDescription>
          </div>
          <Badge variant={isPublished ? 'default' : 'secondary'} className="shrink-0">
            {isPublished ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <List className="h-4 w-4" />
            <span>{responseCount} responses</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div>Updated {formattedDate}</div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 mt-auto">
        <div className="flex flex-wrap gap-2 w-full">
          {onPublish && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onPublish(id, isPublished)}
            >
              {isPublished ? 'Unpublish' : 'Publish'}
            </Button>
          )}

          <Link to={`/surveys/${id}/edit`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>

          <Link to={`/surveys/${id}/responses`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <List className="h-4 w-4 mr-2" />
              Responses
            </Button>
          </Link>
        </div>

        <div className="flex gap-2 w-full">
          <Link to={`/surveys/${id}/preview`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </Link>

          {isPublished && onCopyLink && (
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onCopyLink(id)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          )}

          {onDelete && (
            <Button variant="destructive" size="sm" onClick={() => onDelete(id)} className="px-3">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
