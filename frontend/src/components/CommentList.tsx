import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Trash2 } from "lucide-react";
import type { Comment } from "@/hooks";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useState } from "react";

interface CommentListProps {
  comments: Comment[];
  onCommentDeleted: () => void;
}

export const CommentList = ({ comments, onCommentDeleted }: CommentListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const currentUserId = localStorage.getItem("userId");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      setDeletingId(commentId);
      await axios.delete(`${BACKEND_URL}/api/v1/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onCommentDeleted();
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={comment.author.name || comment.author.email} />
                  <AvatarFallback className="bg-slate-600 text-white text-sm">
                    {(comment.author.name || comment.author.email)[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="h-3 w-3" />
                    <span>{comment.author.name || comment.author.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
              </div>
              {comment.authorId === currentUserId && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(comment.id)}
                  disabled={deletingId === comment.id}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              )}
            </div>
            <p className="mt-3 text-slate-700 whitespace-pre-wrap">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}; 