import { Project } from '../../data/projects';
import Card from '../common/Card';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const linkedProjects = projects.filter(
    (p) => p.link || (p.products && p.products.some((prod) => prod.link)),
  );
  const unlinkedProjects = projects.filter(
    (p) => !p.link && !(p.products && p.products.some((prod) => prod.link)),
  );

  return (
    <section>
      {linkedProjects.length > 0 && (
        <div className="grid gap-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-orange-900 dark:text-orange-400">
            Featured Projects
          </h2>
          {linkedProjects.map((project) => (
            <Card key={project.name} project={project} />
          ))}
        </div>
      )}
      {unlinkedProjects.length > 0 && (
        <div className="grid gap-8">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">
            Other Projects
          </h2>
          {unlinkedProjects.map((project) => (
            <Card key={project.name} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
