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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <span className="text-sm font-medium text-primary">Technical Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="text-primary">Technologies</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((category, index) => (
              <div
                key={category.name}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-md animate-fade-in opacity-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-secondary hover:bg-muted border border-border rounded-lg text-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
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
