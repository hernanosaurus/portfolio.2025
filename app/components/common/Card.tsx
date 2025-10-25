import { Project } from '../../data/projects';
import Tag from './Tag';
import Link from './Link';

interface CardProps {
  project: Project;
}

export default function Card({ project }: CardProps) {
  return (
    <article
      className="rounded-lg border border-orange-200 dark:border-zinc-800 bg-gradient-to-br from-white to-orange-50 dark:from-zinc-900 dark:to-zinc-800 p-6 shadow-sm transition-all duration-200 hover:scale-[1.025] hover:shadow-lg hover:border-orange-500 dark:hover:border-orange-400"
      aria-label={`Project: ${project.name}`}
    >
      <h3 className="text-xl font-bold mb-2">
        {project.link ? (
          <Link href={project.link} ariaLabel={`Visit ${project.name} project`}>
            {project.name}
          </Link>
        ) : (
          project.name
        )}
      </h3>
      <p className="mb-2 text-zinc-800 dark:text-zinc-300">{project.description}</p>
      {project.products && (
        <div className="mb-2 pl-4 border-l-2 border-orange-200 dark:border-zinc-700">
          {project.products.map((prod) => (
            <div key={prod.name} className="mb-4">
              <h4 className="text-lg font-semibold">
                {prod.link ? (
                  <Link href={prod.link} ariaLabel={`Visit ${prod.name}`}>
                    {prod.name}
                  </Link>
                ) : (
                  prod.name
                )}
              </h4>
              <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-2">{prod.description}</p>
              {prod.tech && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {prod.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {project.tech && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      )}
    </article>
  );
}
