import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDeleteProject } from "@/hooks";

interface ProjectCardProps {
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  id: string;
  published?: boolean;
  tags?: string[];
  abandonedAt?: string | null;
  authorId?: string;
}

export const ProjectCard = ({
  authorName,
  title,
  content,
  createdAt,
  id,
  published = false,
  tags = [],
  abandonedAt,
  authorId
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const { deleteProject, loading: isDeleting } = useDeleteProject();
  const currentUserId = localStorage.getItem("userId");
  const isAuthor = authorId === currentUserId;

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

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await deleteProject(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="relative">
      <Card 
        className="w-full cursor-pointer hover:shadow-md transition-shadow duration-200 border-slate-200 h-[320px] flex flex-col"
        onClick={() => navigate(`/project/${id}`)}
      >
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src="" alt={authorName} />
              <AvatarFallback className="bg-slate-600 text-white text-xs">
                {authorName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <User className="h-3 w-3" />
              <span className="font-light truncate max-w-[100px]">{authorName}</span>
            </div>
            
            <div className="h-1 w-1 rounded-full bg-slate-400"></div>
            
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3 w-3" />
              <span className="font-thin">{formatDate(createdAt)}</span>
            </div>

            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    navigate(`/project/edit/${id}`);
                  }}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-red-600"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="flex-grow flex flex-col">
            <div className="mb-2">
              {getStatusBadge()}
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 leading-tight mb-2 line-clamp-2">
              {title}
            </h3>
            
            <p className="text-sm font-thin text-slate-700 line-clamp-4 flex-grow">
              {content}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};