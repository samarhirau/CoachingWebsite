interface SidebarProps {
  categories: { name: string; key: string }[]
  selected: string
  onSelect: (key: string) => void
}

export default function QuestionSidebar({ categories, selected, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Topics
      </h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.key}>
            <button
              onClick={() => onSelect(cat.key)}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selected === cat.key
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
