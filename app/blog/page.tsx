import { Footer } from "@/components/footer"
import { ModernNavigation } from "@/components/modern-navigation"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const blogPosts = [
  {
    title: "Digital Transformation Trends in Indian SMEs",
    excerpt:
      "Explore how small and medium enterprises across India are embracing digital technologies to stay competitive and drive growth in 2025.",
    author: "Rajesh Kumar",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Digital Transformation",
    image: "/placeholder.svg?key=blog1",
    slug: "digital-transformation-trends-indian-smes",
    featured: true,
  },
  {
    title: "Building Customer Trust in the Digital Age",
    excerpt:
      "Learn effective strategies to build and maintain customer trust while transitioning to digital-first business models.",
    author: "Priya Sharma",
    date: "Jan 12, 2025",
    readTime: "4 min read",
    category: "Customer Experience",
    image: "/placeholder.svg?key=blog2",
    slug: "building-customer-trust-digital-age",
  },
  {
    title: "The Rise of Regional Language Support",
    excerpt: "Why multilingual customer support is becoming essential for businesses targeting diverse Indian markets.",
    author: "Amit Patel",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    category: "Customer Support",
    image: "/placeholder.svg?key=blog3",
    slug: "rise-regional-language-support",
  },
  {
    title: "Cybersecurity Best Practices for Indian Businesses",
    excerpt: "Essential security measures every Indian business should implement to protect against cyber threats.",
    author: "Sneha Reddy",
    date: "Jan 8, 2025",
    readTime: "7 min read",
    category: "Security",
    image: "/placeholder.svg?key=blog4",
    slug: "cybersecurity-best-practices-indian-businesses",
  },
  {
    title: "E-commerce Growth Strategies for 2025",
    excerpt: "Proven strategies to scale your e-commerce business in the competitive Indian market.",
    author: "Rajesh Kumar",
    date: "Jan 5, 2025",
    readTime: "5 min read",
    category: "E-commerce",
    image: "/placeholder.svg?key=blog5",
    slug: "ecommerce-growth-strategies-2025",
  },
  {
    title: "The Future of Remote Work in India",
    excerpt:
      "How Indian companies are adapting to hybrid work models and the technologies enabling this transformation.",
    author: "Priya Sharma",
    date: "Jan 3, 2025",
    readTime: "4 min read",
    category: "Workplace",
    image: "/placeholder.svg?key=blog6",
    slug: "future-remote-work-india",
  },
]

const categories = [
  "All",
  "Digital Transformation",
  "Customer Experience",
  "Customer Support",
  "Security",
  "E-commerce",
  "Workplace",
]




export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <ModernNavigation />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              RidBharat <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Insights, trends, and expert advice to help your business thrive in the Indian market. Stay updated with
              the latest in digital transformation and business growth.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={category === "All" ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard
                  key={index}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  image={post.image}
                  slug={post.slug}
                  featured={post.featured}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground text-balance mb-8">
              Subscribe to our newsletter and get the latest insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
