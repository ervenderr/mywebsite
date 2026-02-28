import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardMultiProps {
  readonly title: string;
  readonly description: string;
  readonly tags: string[];
  readonly imageUrls: string[];
  readonly demoUrl?: string;
  readonly repoUrl?: string;
  readonly role?: string;
}

export default function ProjectCardMulti({
  title,
  description,
  tags,
  imageUrls,
  demoUrl,
  repoUrl,
  role,
}: ProjectCardMultiProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-primary/20">
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2">
          {imageUrls.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="relative aspect-video overflow-hidden rounded-lg"
            >
              <Image
                src={imageUrl || "/placeholder.svg?height=240&width=320"}
                alt={`${title} - Screenshot ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
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
