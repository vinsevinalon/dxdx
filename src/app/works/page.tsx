export default function Works() {
  const works = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with React and Node.js",
      image: "/placeholder-work-1.jpg",
      tags: ["React", "Node.js", "MongoDB"],
      year: "2024"
    },
    {
      id: 2,
      title: "Brand Identity System",
      description: "Complete visual identity for a tech startup",
      image: "/placeholder-work-2.jpg",
      tags: ["Branding", "UI/UX", "Design"],
      year: "2023"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "Secure and intuitive banking application",
      image: "/placeholder-work-3.jpg",
      tags: ["React Native", "Firebase", "Security"],
      year: "2023"
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for business analytics",
      image: "/placeholder-work-4.jpg",
      tags: ["D3.js", "Vue.js", "Analytics"],
      year: "2024"
    }
  ]

  return (
    <div className="min-h-screen p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">WORKS</h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl">
          A collection of projects showcasing design and development expertise across various industries and technologies.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {works.map((work) => (
            <div key={work.id} className="group cursor-pointer">
              <div className="bg-gray-800 aspect-video rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Image Placeholder</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors">
                    {work.title}
                  </h3>
                  <span className="text-sm text-gray-500">{work.year}</span>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {work.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {work.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}