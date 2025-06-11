import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

// Middleware for JWT verification
const authMiddleware = async (c: any, next: any) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(' ')[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set('userId', payload.id);
    await next();
  } catch (e) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
};

export const projectRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string
  }
}>();

// Apply auth middleware to all routes
projectRouter.use('/*', authMiddleware);

// Create a new project
projectRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get('userId');

  try {
    const project = await prisma.project.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published || false,
        tags: body.tags || [],
        authorId: userId
      }
    });
    return c.json(project);
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while creating project" });
  }
});

// Get all projects (with optional filtering)
projectRouter.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const projects = await prisma.project.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        comments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return c.json(projects);
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while fetching projects" });
  }
});

// Get a specific project by ID
projectRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
    
    if (!project) {
      c.status(404);
      return c.json({ error: "Project not found" });
    }
    
    return c.json(project);
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while fetching project" });
  }
});

// Update a project
projectRouter.put('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  const userId = c.get('userId');
  const body = await c.req.json();

  try {
    // First check if the project exists and belongs to the user
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      c.status(404);
      return c.json({ error: "Project not found" });
    }

    if (existingProject.authorId !== userId) {
      c.status(403);
      return c.json({ error: "Not authorized to update this project" });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        tags: body.tags,
        abandonedAt: body.abandonedAt
      }
    });
    return c.json(project);
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while updating project" });
  }
});

// Delete a project
projectRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  const userId = c.get('userId');

  try {
    // First check if the project exists and belongs to the user
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      c.status(404);
      return c.json({ error: "Project not found" });
    }

    if (existingProject.authorId !== userId) {
      c.status(403);
      return c.json({ error: "Not authorized to delete this project" });
    }

    await prisma.project.delete({
      where: { id }
    });
    return c.json({ message: "Project deleted successfully" });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while deleting project" });
  }
});

// Add a comment to a project
projectRouter.post('/:id/comments', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const projectId = c.req.param('id');
  const userId = c.get('userId');
  const body = await c.req.json();

  try {
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        authorId: userId,
        projectId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    return c.json(comment);
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while creating comment" });
  }
});

// Get all comments for a project
projectRouter.get('/:id/comments', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const projectId = c.req.param('id');

  try {
    const comments = await prisma.comment.findMany({
      where: { projectId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return c.json(comments);
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while fetching comments" });
  }
});