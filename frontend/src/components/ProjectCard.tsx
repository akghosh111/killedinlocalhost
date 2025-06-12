import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

interface ProjectCardProps {
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  id: string;
  published?: boolean;
  tags?: string[];
  abandonedAt?: string | null;
}

export const ProjectCard = ({
  authorName,
  title,
  content,
  createdAt,
  id,
  published = false,
  tags = [],
  abandonedAt
}: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = () => {
    if (abandonedAt) {
      return <Badge variant="destructive">Abandoned</Badge>;
    }
    if (published) {
      return <Badge variant="default">Published</Badge>;
    }
    return <Badge variant="secondary">Draft</Badge>;
  };

  return (
    <div onClick={() => window.location.href = `/project/${id}`}>
      <Card className="w-full max-w-screen-md cursor-pointer hover:shadow-md transition-shadow duration-200 border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={authorName} />
              <AvatarFallback className="bg-slate-600 text-white text-sm">
                {authorName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User className="h-3 w-3" />
              <span className="font-light">{authorName}</span>
            </div>
            
            <div className="h-1 w-1 rounded-full bg-slate-400"></div>
            
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Calendar className="h-3 w-3" />
              <span className="font-thin">{formatDate(createdAt)}</span>
            </div>

            <div className="ml-auto">
              {getStatusBadge()}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-900 leading-tight">
              {title}
            </h3>
            
            <p className="text-md font-thin text-slate-700 line-clamp-3">
              {content.length > 200 ? content.slice(0, 200) + "..." : content}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            <div className="text-slate-500 text-sm font-thin pt-2">
              {`${Math.ceil(content.length / 200)} minute(s) read`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};