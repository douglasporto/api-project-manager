import { EntityRepository, Repository } from 'typeorm';

import Project from '../models/Projects';

@EntityRepository(Project)
class ProjectRepository extends Repository<Project> {
  public async findByDate(date: Date): Promise<Project | null> {
    const findProject = await this.findOne({
      where: { date },
    });
    return findProject || null;
  }
}

export default ProjectRepository;
