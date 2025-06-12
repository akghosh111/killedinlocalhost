import { useParams, useNavigate } from "react-router-dom";
import { useProject, useProjectComments } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteProject } from "@/hooks";

export const ProjectView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, project, error } = useProject({ id: id || "" });
  const { comments, loading: commentsLoading } = useProjectComments({ projectId: id || "" });
  const { deleteProject } = useDeleteProject();
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      setIsDeleting(true);
      await deleteProject(id);
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600">{error || "Project not found"}</p>
        <Button
          onClick={() => navigate("/projects")}
          className="mt-4"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  const isAuthor = project.authorId === localStorage.getItem("userId");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        onClick={() => navigate("/projects")}
        variant="ghost"
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Projects
      </Button>

      <div className="space-y-8">
        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={project.author.name || project.author.email} />
                <AvatarFallback className="bg-slate-600 text-white">
                  {(project.author.name || project.author.email)[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <User className="h-4 w-4" />
                <span>{project.author.name || project.author.email}</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-slate-400"></div>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(project.createdAt)}</span>
              </div>
            </div>

            {isAuthor && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/project/edit/${id}`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>

          <div className="flex flex-wrap gap-2">
            {project.published && <Badge>Published</Badge>}
            {project.abandonedAt && <Badge variant="destructive">Abandoned</Badge>}
            {project.tags?.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Content */}
        <Card>
          <CardContent className="prose max-w-none py-6">
            <div className="whitespace-pre-wrap">{project.content}</div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Comments</h2>
          
          {commentsLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={comment.author.name || comment.author.email} />
                        <AvatarFallback className="bg-slate-600 text-white text-sm">
                          {(comment.author.name || comment.author.email)[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">
                          {comment.author.name || comment.author.email}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectView; 