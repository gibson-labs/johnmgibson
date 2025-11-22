import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Link } from 'lucide-react';
import CineNiche from '@/assets/images/CineNiche.jpeg';
import TurtleShelter from '@/assets/images/TurtleShelter.png';
import { Project } from '@/types/project';
import ProjectModal from './ProjectModal';

const projectsData: Project[] = [
  {
    id: 1,
    slug: "cineniche",
    title: "CineNiche - Movie Streaming Platform",
    shortDescription: "A secure movie streaming platform build with custom machine learning models to recommend movies to users. It was built with React, .NET, and MySQL",
    fullDescription: "CineNiche is a comprehensive movie streaming platform that combines modern web technologies with machine learning to deliver personalized content recommendations. The platform features user authentication, video streaming capabilities, and a sophisticated recommendation engine built on Azure ML.",
    challenge: "Users struggle to find relevant movies in large streaming libraries. Traditional recommendation systems often fail to capture nuanced user preferences, leading to poor content discovery and user engagement.",
    solution: "We implemented a custom machine learning model using Azure ML that analyzes user viewing patterns, ratings, and preferences. The model was trained on a dataset of over 50,000 movies and user interactions, incorporating collaborative filtering and content-based recommendations to provide accurate suggestions.",
    outcome: "Achieved 85% user satisfaction rate with recommendations. The platform successfully handles concurrent streaming for 500+ users with minimal latency. User engagement increased by 40% compared to similar platforms without personalized recommendations.",
    image: CineNiche,
    technologies: ["React","TypeScript", ".NET", "Azure ML", "MySQL"],
    githubUrl: "https://github.com/johnmgibson3/INTEX2_cineniche",
    role: "Full-Stack Developer",
    timeline: "4 months",
    teamSize: 4,
  },
  {
    id: 2,
    slug: "turtle-shelter",
    title: "Turtle Shelter Project - Charity Management System",
    shortDescription: "A website that allows a charity to manage their donations and volunteers. Features a fully functional admin dashboard and custom email system. It was built with JavaScript and deployed to AWS",
    fullDescription: "A comprehensive web application designed to streamline operations for a sea turtle conservation charity. The system manages volunteer schedules, donation tracking, and automated communication with stakeholders. Built with scalability in mind, it handles all aspects of charity operations from volunteer onboarding to financial reporting.",
    challenge: "The charity was managing volunteers and donations through spreadsheets and manual email communication, leading to inefficiencies, missed opportunities, and difficulty in tracking impact metrics. They needed a centralized system that could scale with their growing operations.",
    solution: "Developed a full-stack web application with separate admin and public-facing portals. Implemented automated email notifications for volunteer schedules and donation receipts using AWS SES. Created a custom dashboard with real-time analytics showing volunteer hours, donation trends, and rescue statistics. Deployed to AWS using Elastic Beanstalk for auto-scaling and RDS for reliable database management.",
    outcome: "Reduced administrative overhead by 60%. Volunteer coordination time decreased from 10 hours to 2 hours per week. Successfully tracked $50K+ in donations with automated receipt generation. The system now supports 150+ active volunteers and processes 200+ donations annually.",
    image: TurtleShelter,
    technologies: ["JavaScript", "AWS", "Amazon RDS", "Amazon Beanstalk"],
    githubUrl: "https://github.com/Team1-12/intex-2024",
    liveUrl: "https://turtleshelterintex.dev",
    role: "Lead Developer",
    timeline: "3 months",
    teamSize: 5,
  },
  {
    id: 3,
    slug: "mail-services",
    title: "Mail Services Financial System",
    shortDescription: "A financial system that allows BYU's Print and Mail center to manage their finances transactions. It was built with TypeScript, Angular, Python Flask, and Oracle Database",
    fullDescription: "An enterprise-grade financial management system built for BYU's Print and Mail Services. The application handles complex financial workflows including invoice generation, payment processing, budget tracking, and financial reporting. The system integrates with existing university infrastructure and provides real-time insights into operational costs.",
    challenge: "The Print and Mail center was using legacy software that couldn't handle complex financial workflows or provide real-time reporting. Manual data entry led to errors and inefficiencies. They needed a modern solution that could integrate with university systems while providing detailed financial analytics.",
    solution: "Built a modern web application using Angular for the frontend and Python Flask for the backend API. Designed a robust Oracle database schema to handle complex financial relationships and ensure data integrity. Implemented role-based access control for different user types (administrators, accountants, and department managers). Created automated report generation and data visualization dashboards.",
    outcome: "Processing time for financial transactions reduced by 70%. Manual data entry errors decreased by 95%. Generated automated monthly reports saving 20+ hours of staff time. The system now processes over 10,000 transactions annually and provides real-time visibility into departmental budgets.",
    image: "/placeholder.svg",
    technologies: ["TypeScript", "Angular", "Python Flask", "Oracle Database"],
    role: "Backend Developer",
    timeline: "5 months",
    teamSize: 3,
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-heading">Featured Projects</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A selection of my recent work. Each project presented unique challenges and opportunities for growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="project-card cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {project.image && (
                  <div className="h-48 bg-muted overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.shortDescription}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map(tech => (
                        <span key={tech} className="tech-pill">{tech}</span>
                      ))}
                    </div>
                  )}
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github size={16} className="mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Link size={16} className="mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects; 
