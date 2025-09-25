import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Link from "next/link"

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  slug: string
  featured?: boolean
}

export function BlogCard({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  image,
  slug,
  featured = false,
}: BlogCardProps) {
  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${featured ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      <div className={`${featured ? "md:flex" : ""}`}>
        <div className={`relative overflow-hidden ${featured ? "md:w-1/2" : ""}`}>
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${featured ? "h-64 md:h-full" : "h-48"}`}
          />
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{category}</Badge>
        </div>

        <div className={featured ? "md:w-1/2" : ""}>
          <CardHeader>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            </div>
            <CardTitle className={`group-hover:text-primary transition-colors ${featured ? "text-2xl" : "text-xl"}`}>
              {title}
            </CardTitle>
            <CardDescription className={`${featured ? "text-base" : "text-sm"}`}>{excerpt}</CardDescription>
          </CardHeader>

          <CardContent>
            <Button variant="ghost" className="p-0 h-auto group/btn" asChild>
              <Link href={`/blog/${slug}`}>
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
