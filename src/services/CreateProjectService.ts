import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import ProjectRepository from '../repositories/ProjectRepository';
import Projects from '../models/Projects';

interface Request {
  collaborator_id: string;
  date: Date;
  title: string;
  offering: number;
}

class CreateProjectService {
  public async execute({
    date,
    collaborator_id,
    title,
    offering,
  }: Request): Promise<Projects> {
    const projectRepository = getCustomRepository(ProjectRepository);
    const projectDate = startOfHour(date);

    const project = projectRepository.create({
      collaborator_id,
      date: projectDate,
      title,
      status: 'open',
      offering,
    });
    await projectRepository.save(project);
    return project;
  }
}

export default CreateProjectService;
