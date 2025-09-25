import { ModernNavigation } from "@/components/modern-navigation"
import { ModernHero } from "@/components/modern-hero"
import { FeaturesSection } from "@/components/features-section"
import { CoursesSection } from "@/components/courses-section"
import { ContactSection } from "@/components/contact-section"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Footer } from "@/components/footer"


// CodeMentor Academy
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <ModernNavigation />
      <main>
        <ModernHero />
        <FeaturesSection />
        <CoursesSection />
        <ContactSection />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
