import Link from 'next/link'

interface StudyDetailProps {
  params: {
    slug: string
  }
}

export default function StudyDetail({ params }: StudyDetailProps) {
  const projects = {
    'particle-system': {
      title: "Interactive Particle System",
      description: "A WebGL-based particle animation system with real-time physics simulation. This project explores advanced rendering techniques and performance optimization for browser-based graphics.",
      category: "Experiments",
      year: "2024",
      technologies: ["WebGL", "GLSL", "Three.js", "JavaScript"],
      overview: "This particle system demonstrates advanced WebGL programming techniques, including custom shaders, buffer geometry, and performance optimization for rendering thousands of particles in real-time.",
      features: [
        "Real-time physics simulation",
        "Custom GLSL shaders",
        "Interactive mouse controls",
        "Performance-optimized rendering",
        "Configurable particle properties"
      ],
      challenges: "The main challenge was optimizing performance while maintaining visual quality. This involved implementing efficient buffer management and reducing draw calls.",
      learnings: "This project deepened my understanding of GPU programming and the importance of performance optimization in real-time graphics applications."
    },
    'color-generator': {
      title: "AI Color Palette Generator",
      description: "A machine learning model that generates harmonious color schemes based on user input and design principles.",
      category: "Side Projects",
      year: "2024",
      technologies: ["Python", "TensorFlow", "React", "API"],
      overview: "This project combines machine learning with color theory to create an intelligent color palette generator for designers and developers.",
      features: [
        "ML-based color generation",
        "Color harmony algorithms",
        "Export to various formats",
        "Real-time preview",
        "Accessibility checking"
      ],
      challenges: "Training the model to understand color relationships and aesthetic principles was complex, requiring careful dataset curation.",
      learnings: "Gained experience in machine learning applications for creative tools and the intersection of AI and design."
    }
  }

  const project = projects[params.slug as keyof typeof projects]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/studies" className="text-yellow-400 hover:underline">
            ← Back to Studies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <Link href="/studies" className="text-yellow-400 hover:underline mb-8 inline-block">
          ← Back to Studies
        </Link>

        <div className="mb-8">
          <span className="text-xs text-yellow-400 uppercase tracking-wide block mb-2">
            {project.category} • {project.year}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Project Preview Placeholder</span>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{project.overview}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Challenges</h2>
              <p className="text-gray-300 leading-relaxed">{project.challenges}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What I Learned</h2>
              <p className="text-gray-300 leading-relaxed">{project.learnings}</p>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold mb-4">Technologies</h3>
              <div className="space-y-2">
                {project.technologies.map((tech) => (
                  <div key={tech} className="px-3 py-2 bg-gray-800 rounded text-sm">
                    {tech}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-4">Project Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-yellow-400 hover:underline text-sm">
                  Live Demo →
                </a>
                <a href="#" className="block text-yellow-400 hover:underline text-sm">
                  Source Code →
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { slug: 'particle-system' },
    { slug: 'color-generator' },
    { slug: 'css-3d' },
    { slug: 'generative-art' },
    { slug: 'voice-interface' },
    { slug: 'svg-animations' },
  ]
}