import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"

interface Question {
  id: number
  title: string
  difficulty: string
  time: string
  tags: string[]
}

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {question.title}
        </h3>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Code size={16} /> Solve
        </Button>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
          {question.difficulty}
        </span>
        <span>⏱ {question.time}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
