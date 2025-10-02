
import { ModernNavigation } from "@/components/modern-navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

// Hardcoded blog posts
const blogPosts = [
  {
    slug: "digital-transformation-trends-in-indian-smes",
    title: "Digital Transformation Trends in Indian SMEs",
    content: `
      <p>The digital transformation landscape in India is evolving rapidly, with small and medium enterprises (SMEs) leading the charge...</p>
      <h2>The Current State of Digital Adoption</h2>
      <p>Recent studies show that over 70% of Indian SMEs have accelerated their digital transformation initiatives...</p>
    `,
    author: "Rajesh Kumar",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Digital Transformation",
    image: "/placeholder.svg?key=blog1",
  },
  {
    slug: "ai-adoption-in-indian-businesses",
    title: "AI Adoption in Indian Businesses",
    content: `
      <p>Artificial intelligence (AI) adoption in India is rising across sectors...</p>
    `,
    author: "Sita Sharma",
    date: "Feb 10, 2025",
    readTime: "4 min read",
    category: "AI",
    image: "/placeholder.svg?key=blog2",
  },
];

// Generate static pages for each blog post
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  // Find the post based on slug
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <p className="text-center mt-24">Post not found</p>;

  return (
    <div className="min-h-screen">
      <ModernNavigation />
      <main>
        {/* Back Button */}
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-8" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="relative mb-8">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-64 sm:h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-muted/30 rounded-xl">
              <div className="flex items-start gap-4">
                <img
                  src="/placeholder.svg?key=author"
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{post.author}</h3>
                  <p className="text-muted-foreground">
                    {post.author} is an expert in {post.category} with extensive experience in helping Indian businesses navigate digital transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
