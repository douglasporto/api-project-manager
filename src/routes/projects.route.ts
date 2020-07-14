import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import ProjectRepository from '../repositories/ProjectRepository';
import CreateProjectService from '../services/CreateProjectService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const projectsRouter = Router();

projectsRouter.use(ensureAuthenticated);

projectsRouter.get('/', async (req, resp) => {
  const projectsRepository = getCustomRepository(ProjectRepository);
  const projects = await projectsRepository.find();
  return resp.json(projects);
});

projectsRouter.post('/', async (req, resp) => {
  const { collaborator_id, date, title, offering } = req.body;
  const parsedDate = parseISO(date);

  const createProjectService = new CreateProjectService();

  const project = await createProjectService.execute({
    collaborator_id,
    date: parsedDate,
    title,
    offering,
  });

  return resp.json(project);
});

export default projectsRouter;
