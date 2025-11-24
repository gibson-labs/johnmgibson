interface SkillCategory {
  name: string;
  skills: string[];
}

const skillsData: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "TailwindCSS"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "Pandas", "Scikit-learn", "Flask", ".NET"]
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MySQL", "Amazon RDS", "Oracle Database"]
  },
  {
    name: "DevOps",
    skills: ["Git", "GitHub", "Docker", "AWS", "Azure", "CI/CD"]
  },
  {
    name: "Tools",
    skills: ["VS Code", "Figma", "Postman", "npm/yarn"]
  },
  {
    name: "AI",
    skills: ["Azure ML", "LangChain", "LangGraph", "AI Agents", "AWS Bedrock", "LiteLLM"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <span className="text-sm font-medium text-primary">Technical Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"> Technologies</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full mb-4" />
            <p className="text-muted-foreground/80 text-lg max-w-2xl">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((category, index) => (
              <div
                key={category.name}
                className="group relative p-6 rounded-2xl bg-background/50 backdrop-blur border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in opacity-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                      {category.name}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg text-foreground transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 
