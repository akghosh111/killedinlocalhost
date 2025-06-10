import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user'
import { projectRouter } from './routes/project'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

app.use('/*', cors())

app.route("/api/vi/user", userRouter);
app.route("/api/v1/projects", projectRouter)


export default app
