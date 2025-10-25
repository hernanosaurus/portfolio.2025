import { Skills as SkillsType } from '../../data/skills';
import Tag from '../common/Tag';

interface SkillsProps {
  skills: SkillsType;
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-zinc-100">Skills</h2>
      <div className="flex flex-row gap-8 flex-wrap">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="min-w-[180px]">
            <h3 className="text-lg font-bold mb-2 text-zinc-100">
              {category}
            </h3>
            <ul className="flex flex-row flex-wrap gap-2">
              {items.map((skill) => (
                <li key={skill}>
                  <Tag className="text-xs sm:text-sm px-1.5 py-1" >{skill}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
