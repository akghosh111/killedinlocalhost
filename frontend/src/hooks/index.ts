import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Project {
  id: string;
  title: string;
  content: string;
  published: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  abandonedAt: string | null;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  projectId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export const useProject = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/api/v1/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        });
        setProject(response.data);
      } catch (err: any) {
        console.error("Error fetching project:", err);
        setError(err.response?.data?.error || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return {
    loading,
    project,
    error,
    refetch: () => {
      if (id) {
        const fetchProject = async () => {
          try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${BACKEND_URL}/api/v1/projects/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` || "",
              },
            });
            setProject(response.data);
          } catch (err: any) {
            console.error("Error fetching project:", err);
            setError(err.response?.data?.error || "Failed to fetch project");
          } finally {
            setLoading(false);
          }
        };
        fetchProject();
      }
    }
  };
};

export const useProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/api/v1/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        });
        setProjects(response.data);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(err.response?.data?.error || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return {
    loading,
    projects,
    error,
    refetch: () => {
      const fetchProjects = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(`${BACKEND_URL}/api/v1/projects`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}` || "",
            },
          });
          setProjects(response.data);
        } catch (err: any) {
          console.error("Error fetching projects:", err);
          setError(err.response?.data?.error || "Failed to fetch projects");
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }
  };
};

// Additional hook for project comments
export const useProjectComments = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/api/v1/projects/${projectId}/comments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        });
        setComments(response.data);
      } catch (err: any) {
        console.error("Error fetching comments:", err);
        setError(err.response?.data?.error || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchComments();
    }
  }, [projectId]);

  return {
    loading,
    comments,
    error,
    refetch: () => {
      if (projectId) {
        const fetchComments = async () => {
          try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${BACKEND_URL}/api/v1/projects/${projectId}/comments`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` || "",
              },
            });
            setComments(response.data);
          } catch (err: any) {
            console.error("Error fetching comments:", err);
            setError(err.response?.data?.error || "Failed to fetch comments");
          } finally {
            setLoading(false);
          }
        };
        fetchComments();
      }
    }
  };
};

// Hook for creating a new project
export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (projectData: {
    title: string;
    content: string;
    published?: boolean;
    tags?: string[];
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BACKEND_URL}/api/v1/projects`, projectData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("Error creating project:", err);
      setError(err.response?.data?.error || "Failed to create project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createProject,
  };
};

// Hook for updating a project
export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProject = async (
    id: string,
    projectData: {
      title?: string;
      content?: string;
      published?: boolean;
      tags?: string[];
      abandonedAt?: string | null;
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`${BACKEND_URL}/api/v1/projects/${id}`, projectData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("Error updating project:", err);
      setError(err.response?.data?.error || "Failed to update project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateProject,
  };
};

// Hook for deleting a project
export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProject = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${BACKEND_URL}/api/v1/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
      });
      return true;
    } catch (err: any) {
      console.error("Error deleting project:", err);
      setError(err.response?.data?.error || "Failed to delete project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deleteProject,
  };
};