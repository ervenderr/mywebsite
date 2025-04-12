interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
  achievements?: string[]
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
    <div className="border-l-4 border-primary pl-6 pb-2 relative">
      <div className="absolute w-4 h-4 bg-primary rounded-full -left-[10px] top-1"></div>
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
            {period}
          </span>
        </div>
        <p className="text-lg text-primary font-medium">{company}</p>
        <p className="text-muted-foreground">{description}</p>
        {achievements && achievements.length > 0 && (
          <div className="pt-2">
            <h4 className="font-semibold mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/50 text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
