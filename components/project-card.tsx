import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  role?: string;
  achievements?: string[];
}

function ProjectPlaceholder({ title, tags }: { title: string; tags: string[] }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex flex-col items-center justify-center gap-3 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_50%)]" />
      <Layers className="h-10 w-10 text-primary/60" />
      <p className="text-sm font-medium text-primary/70 text-center leading-tight max-w-[200px]">
        {title}
      </p>
      <div className="flex flex-wrap gap-1 justify-center max-w-[240px]">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  demoUrl,
  repoUrl,
  role,
}: ProjectCardProps) {
  const hasImage = imageUrl && !imageUrl.includes("placeholder");

  return (
    <Card className="overflow-hidden flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-primary/20">
      <div className="relative aspect-video overflow-hidden">
        {hasImage ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <ProjectPlaceholder title={title} tags={tags} />
        )}
      </div>
      <CardContent className="p-5 flex-grow">
        <h3 className="text-lg font-bold mb-1.5 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {role && (
          <p className="text-primary/80 text-sm font-medium mb-2">{role}</p>
        )}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary/80 dark:bg-primary/15 dark:text-primary/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0 flex gap-3">
        {demoUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
              Live Demo <ExternalLink className="ml-1.5 h-3 w-3" />
            </Link>
          </Button>
        )}
        {repoUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
              Code <Github className="ml-1.5 h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
