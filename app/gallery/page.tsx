
'use client';
import { useState } from 'react';
import { Images, X } from "lucide-react";
import { ModernNavigation } from '@/components/modern-navigation';
import { Footer } from '@/components/footer';



const Card = ({ children, className, onClick }) => (
  <div 
    onClick={onClick}
    className={`rounded-xl border bg-card text-card-foreground shadow cursor-pointer ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, className }) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground ${className}`}>
    {children}
  </div>
);

const galleryItems = [
  { 
    id: 1, 
    title: "Innovation Lab", 
    description: "Students working on their latest research projects.", 
    category: "Academics",
    images: [
      "gallery/unnamed.jpg",
      "gallery/inno1.jpg",
      "gallery/inno2.jpg",
      "gallery/inno3.jpg",
      "gallery/inno4.jpg"

    ]
  },
  { 
    id: 2, 
    title: "Campus Life", 
    description: "Our vibrant campus, a hub of creativity and learning.", 
    category: "Campus",
    images: [
      "gallery/camp1.jpg",
      "gallery/camp2.jpg",
      "gallery/camp3.jpg",
      "gallery/camp4.jpg",
      "gallery/camp5.jpg"
    ]
  },
  { 
    id: 3, 
    title: "Tech Fest 2024", 
    description: "Glimpses from our annual technology festival.", 
    category: "Events",
    images: [
      "gallery/tech1.jpg",
      "gallery/tech2.jpg",
      "gallery/tech3.jpg",
      "gallery/tech4.jpg",
      "gallery/tech5.jpg"
    ]
  },
  { 
    id: 4, 
    title: "Graduation Ceremony", 
    description: "Celebrating the achievements of our successful graduates.", 
    category: "Events",
    images: [
     "gallery/grad1.jpg",
     "gallery/grad2.jpg",
     "gallery/grad3.jpg",
     "gallery/grad4.jpg",
     "gallery/grad5.jpg"
    ]
  },
  { 
    id: 5, 
    title: "Student Workshop", 
    description: "Hands-on coding workshop in our modern classrooms.", 
    category: "Academics",
    images: [
     "gallery/work1.jpg",
     "gallery/work2.jpg",
     "gallery/work3.jpg",
    ]
  },
  { 
    id: 6, 
    title: "Sports Day", 
    description: "Students participating in various sports and activities.", 
    category: "Campus",
    images: [
      "gallery/sport1.jpg",
      "gallery/sport2.jpg",
    ]
  },
  { 
    id: 7, 
    title: "Faculty Interaction", 
    description: "One-on-one sessions with our expert faculty members.", 
    category: "Academics",
    images: [
      "gallery/fac.jpg",
      "gallery/fac2.jpg",
      "gallery/fac3.jpg",
      "gallery/fac4.jpg",

    ]
  },
  { 
    id: 8, 
    title: "Student Council", 
    description: "Leading the way with our dynamic student council.", 
    category: "Campus",
    images: [
      "gallery/coun1.jpg",
      "gallery/coun2.jpg",
    ]
  }
];


export default function GalleryPage() {
  const [activeGallery, setActiveGallery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const openGallery = (item) => {
    setActiveGallery(item);
    setActiveIndex(0);
  };

  const closeGallery = () => {
    setActiveGallery(null);
    setActiveIndex(0);
  };



  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ModernNavigation />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center mb-16 max-w-7xl mx-auto">
          <Badge className="mb-4 px-4 py-2 text-sm">
            <Images className="h-4 w-4 mr-2" />
            Our Moments, Our Legacy
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Gallery of <span className="text-primary">Upcoder</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A visual journey through our campus, events, and achievements.
          </p>
        </section>

        {/* Gallery */}
        <section className="max-w-7xl mx-auto mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <Card key={item.id} onClick={() => openGallery(item)} className="overflow-hidden group">
              <div className="relative">
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform" 
                  loading='lazy'
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                    
                  </div>
                </div>
                 <Badge variant="secondary" className="absolute top-3 left-3 opacity-90">
                    {item.category}
                  </Badge>
              </div>
            </Card>
          ))}
        </section>
      </main>
      <Footer />

      {/* Modal Lightbox */}
    {activeGallery && (
  <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-6 overflow-y-auto">
    <button
      className="absolute top-4 right-4 text-white"
      onClick={closeGallery}
    >
      <X className="h-8 w-8" />
    </button>

    <h3 className="text-2xl font-semibold text-white mb-2">
      {activeGallery.title}
    </h3>
    <p className="text-white/80 mb-6">{activeGallery.description}</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
      {activeGallery.images.map((img, index) => (
        <div key={index} className="relative group">
          <img
            src={img}
            alt={`${activeGallery.title} ${index + 1}`}
            className="rounded-lg object-cover w-full h-64 group-hover:scale-105 transition-transform"
            loading='lazy'
          />
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}
