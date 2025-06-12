import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from "@anukiranghosh/localhost-common";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

userRouter.post('/signup', async (c) => {
  console.log('Received signup request');
  
  const body = await c.req.json();
  console.log('Signup request body:', { ...body, password: '[REDACTED]' });
  
  const { success } = signupInput.safeParse(body);
  if(!success) {
    console.log('Invalid signup input');
    c.status(411);
    return c.json({
      message: "Inputs are not correct"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    console.log('Creating user in database');
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })
    console.log('User created successfully:', { id: user.id, email: user.email });

    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)
    console.log('JWT token generated');

    const response = { 
      token: jwt,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
    console.log('Sending successful response');
    return c.json(response);
  } catch (e) {
    console.error('Error during signup:', e);
    c.status(411);
    return c.json({ 
      message: "Error creating user. Email might already be in use."
    })
  }
})


userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are not correct"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      }
    })
    if (!user) {
      c.status(403);
      return c.json({
        message: "Incorrect credentials"
      })
    }
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)
    return c.json({ 
      token: jwt,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({ 
      message: "Error signing in"
    })
  }
})



