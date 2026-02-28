interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements?: string[];
}

export default function ExperienceItem({
  title,
  company,
  period,
  description,
  technologies,
  achievements,
}: ExperienceItemProps) {
  return (
    <div className="border-l-4 border-primary/60 pl-6 pb-2 relative">
      <div className="absolute w-4 h-4 bg-primary rounded-full -left-[10px] top-1 ring-4 ring-primary/20"></div>
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap">
            {period}
          </span>
        </div>
        <p className="text-lg text-primary font-medium">{company}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
        {achievements && achievements.length > 0 && (
          <div className="pt-2">
            <h4 className="text-sm font-semibold mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-sm leading-relaxed">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
