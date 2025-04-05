import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 dark:bg-primary/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary to-secondary p-1">
                <div className="w-full h-full rounded-2xl bg-light dark:bg-dark flex items-center justify-center overflow-hidden">
                  <span className="text-6xl font-bold text-primary">J</span>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary rounded-xl transform rotate-12" />
            </div>

            {/* Intro Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary dark:text-light mb-4">
                José Developer
              </h1>
              <p className="text-xl text-secondary/70 dark:text-light/70 mb-6">
                Desarrollador Full Stack & Entusiasta de la Tecnología
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["React", "TypeScript", "Node.js", "Next.js"].map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-1.5 bg-primary/5 dark:bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* About Me Section */}
          <div>
            <h2 className="text-2xl font-bold text-secondary dark:text-light mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Sobre Mí
            </h2>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-secondary/80 dark:text-light/80">
                Soy un desarrollador apasionado por crear experiencias web excepcionales. 
                Con más de 5 años de experiencia en el desarrollo full stack, me especializo 
                en construir aplicaciones web modernas y escalables.
              </p>
              <p className="text-secondary/80 dark:text-light/80">
                Mi enfoque se centra en la calidad del código, la experiencia del usuario 
                y las mejores prácticas de desarrollo. Siempre estoy aprendiendo y 
                explorando nuevas tecnologías.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-2xl font-bold text-secondary dark:text-light mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary/10 dark:bg-secondary/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              Habilidades
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Frontend", skills: ["React", "Vue", "TypeScript", "Tailwind"] },
                { name: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
                { name: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Git"] },
                { name: "Otros", skills: ["UI/UX", "Agile", "Testing", "SEO"] }
              ].map((category) => (
                <div key={category.name}>
                  <h3 className="font-medium text-secondary dark:text-light mb-3">
                    {category.name}
                  </h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li 
                        key={skill}
                        className="text-secondary/70 dark:text-light/70 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-secondary dark:text-light mb-12 flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            Experiencia
          </h2>

          <div className="space-y-12">
            {[
              {
                role: "Senior Full Stack Developer",
                company: "Tech Company",
                period: "2022 - Presente",
                description: "Liderando el desarrollo de aplicaciones web escalables y mantenibles."
              },
              {
                role: "Frontend Developer",
                company: "Startup Innovation",
                period: "2020 - 2022",
                description: "Desarrollo de interfaces modernas y responsivas con React y TypeScript."
              },
              {
                role: "Backend Developer",
                company: "Software Solutions",
                period: "2018 - 2020",
                description: "Implementación de APIs y servicios backend con Node.js y Python."
              }
            ].map((job, index) => (
              <div 
                key={index}
                className="relative pl-12 before:absolute before:left-1.5 before:top-0 before:w-0.5 before:h-full before:bg-primary/20 dark:before:bg-primary/30"
              >
                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary" />
                <h3 className="font-bold text-secondary dark:text-light">{job.role}</h3>
                <div className="text-primary/80 text-sm mb-2">{job.company} • {job.period}</div>
                <p className="text-secondary/70 dark:text-light/70">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
