import { PlusCircle } from "lucide-react"
import React, { useState } from "react"

interface CourseFormData {
  title: string
  slug: string
  description: string
  duration: string
  price: number
  originalPrice: number
  rating: number
  professor: string
  maxStudents: number
  contactNumber: string
  features: string
  roadmap: string
  timeline: string
}


const AddCourseForm: React.FC = () => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    slug: "",
    description: "",
    duration: "",
    price: 0,
    originalPrice: 0,
    rating: 0,
    professor: "",
    maxStudents: 0,
    contactNumber: "",
    features: "",
    roadmap: "",
    timeline: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "price" || name === "originalPrice" || name === "rating" || name === "maxStudents"
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()),
      roadmap: formData.roadmap.split(",").map(f => f.trim()),
      timeline: formData.timeline
        .split(";")
        .map(item => {
          const [month, focus] = item.split("-")
          return { month: month?.trim(), focus: focus?.trim() }
        }),
    }

    try {
      const res = await fetch("/api/course/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        console.error("Error creating course:", data.error)
        alert("Failed to add course")
      } else {
        console.log("Course created:", data)
        alert("Course added successfully!")
        setFormData({
          title: "",
          slug: "",
          description: "",
          duration: "",
          price: 0,
          originalPrice: 0,
          rating: 0,
          professor: "",
          maxStudents: 0,
          contactNumber: "",
          features: "",
          roadmap: "",
          timeline: "",
        })
      }
    } catch (err) {
      console.error("Server error:", err)
      alert("Server error")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Course</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Course Title e.g., Full Stack Web Development"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Enter the course name</p>
          </div>

          <div>
            <input
              type="text"
              name="slug"
              placeholder="Unique Slug e.g., full-stack-web"
              value={formData.slug}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">URL-friendly identifier for the course</p>
          </div>

          <div>
            <input
              type="number"
              name="price"
              placeholder="Discounted Price e.g., 45000"
              value={formData.price}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Enter discounted price in INR</p>
          </div>

          <div>
            <input
              type="number"
              name="originalPrice"
              placeholder="Original Price e.g., 60000"
              value={formData.originalPrice}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Original price before discount in INR</p>
          </div>

          <div>
            <input
              type="number"
              name="rating"
              placeholder="Course rating (0-5) e.g., 4.9"
              value={formData.rating}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Rating between 0 to 5</p>
          </div>

          <div>
            <input
              type="text"
              name="professor"
              placeholder="Professor / Instructor Name"
              value={formData.professor}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <div>
            <input
              type="number"
              name="maxStudents"
              placeholder="Max Students e.g., 200"
              value={formData.maxStudents}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Set 0 for unlimited students</p>
          </div>

          <div>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number e.g., 9876543210"
              value={formData.contactNumber}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              name="features"
              placeholder="Features / Highlights (comma-separated)"
              value={formData.features}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Example: React, Node, MongoDB</p>
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              name="roadmap"
              placeholder="Roadmap Steps (comma-separated)"
              value={formData.roadmap}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Example: Frontend, Backend, Deployment</p>
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              name="timeline"
              placeholder="Timeline (week-month format separated by semicolon) e.g., Month 1-React Basics;Month 2-Node.js"
              value={formData.timeline}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Format: Month-Topic; Month-Topic</p>
          </div>

          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Course Description / Details"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add Course
        </button>
      </form>
    </div>
  )
}



export default AddCourseForm;