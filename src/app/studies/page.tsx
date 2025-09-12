import Link from 'next/link'

export default function Studies() {
  const projects = [
    {
      id: 1,
      title: "Interactive Particle System",
      description: "WebGL-based particle animation with real-time physics",
      category: "Experiments",
      slug: "particle-system",
      image: "/placeholder-study-1.jpg"
    },
    {
      id: 2,
      title: "AI Color Palette Generator",
      description: "Machine learning model for generating harmonious color schemes",
      category: "Side Projects",
      slug: "color-generator",
      image: "/placeholder-study-2.jpg"
    },
    {
      id: 3,
      title: "CSS 3D Transforms Playground",
      description: "Interactive demos exploring advanced CSS 3D capabilities",
      category: "Playground",
      slug: "css-3d",
      image: "/placeholder-study-3.jpg"
    },
    {
      id: 4,
      title: "Generative Art with P5.js",
      description: "Algorithmic art generation using mathematical functions",
      category: "Experiments",
      slug: "generative-art",
      image: "/placeholder-study-4.jpg"
    },
    {
      id: 5,
      title: "Voice-Controlled Interface",
      description: "Web Speech API implementation for hands-free navigation",
      category: "Side Projects",
      slug: "voice-interface",
      image: "/placeholder-study-5.jpg"
    },
    {
      id: 6,
      title: "SVG Animation Library",
      description: "Lightweight library for complex SVG path animations",
      category: "Playground",
      slug: "svg-animations",
      image: "/placeholder-study-6.jpg"
    }
  ]

  const categories = ["All", "Side Projects", "Experiments", "Playground"]

  return (
    <div className="min-h-screen p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">STUDIES</h1>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl">
          Explorations in code, design, and technology. A space for experimentation, learning, and pushing creative boundaries.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors text-sm"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/studies/${project.slug}`}>
              <div className="group cursor-pointer">
                <div className="bg-gray-800 aspect-square rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-gray-500 text-sm">Image Placeholder</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-yellow-400 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}