import { Button } from "@/components/ui/button"

export function WelcomeSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-l-4 border-blue-600 pl-8 pr-8 py-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                WELCOME TO THE FUTURE OF <span className="text-blue-600">RESEARCH INNOVATION & DISCOVERY (RID)</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At RID, we bring the world's most promising minds into our circle to investigate, inspire, and innovate
                a technical & logical world for all.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">📖 Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
