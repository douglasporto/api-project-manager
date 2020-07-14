import { Router } from 'express';
import projectsRouter from './projects.route';
import usersRouter from './users.route';
import sessionsRouter from './sessions.route';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (req, resp) => {
  return resp.json({ message: 'A Project DouglasPorto by BrainAndMind' });
});

export default routes;
