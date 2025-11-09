import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl: string
  repoUrl?: string
  role?: string
  achievements?: string[]
}

export default function ProjectCard({ title, description, tags, imageUrl, demoUrl, repoUrl, role }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg?height=240&width=320"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {role && <p className="text-primary font-medium mb-2">{role}</p>}
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
            Live Demo <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
        {repoUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
              Code <Github className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
