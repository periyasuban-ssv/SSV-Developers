import React, { useState, useMemo, useEffect } from "react";
import { Project } from "../types";
import { SlidersHorizontal, X } from "lucide-react";

const projects: Project[] = [
  {
    id: "1",
    title: "Residential Villa",
    category: "Residential",
    location: "Srinivasa Colony, Madurai",
    imageUrl:
      "https://live.staticflickr.com/65535/55046095245_cc2e8f351a_c.jpg",
    completionDate: "2026-02-15",
  },
  {
    id: "2",
    title: "Independent Plot",
    category: "Residential",
    location: "Srinivas Colony, Madurai",
    imageUrl:
      "https://live.staticflickr.com/65535/55044873892_7216608a33_c.jpg",
    completionDate: "2024-02-10",
  },
  {
    id: "3",
    title: "3BHK Plot",
    category: "Residential",
    location: "Anna Park",
    imageUrl:
      "https://live.staticflickr.com/65535/55044877052_3fd5577757_c.jpg",
    completionDate: "2023-08-20",
  },
  {
    id: "4",
    title: "Luxury Plot",
    category: "Residential",
    location: "North Street",
    imageUrl:
      "https://live.staticflickr.com/65535/55046113450_74ed984d73_c.jpg",
    completionDate: "2022-12-05",
  },
  {
    id: "5",
    title: "Single Plot",
    category: "Residential",
    location: "Suburban Street",
    imageUrl:
      "https://live.staticflickr.com/65535/55045952748_39aa65787b_c.jpg",
    completionDate: "2024-01-30",
  },
  {
    id: "6",
    title: "Luxury Villa",
    category: "Residential",
    location: "City Center",
    imageUrl:
      "https://live.staticflickr.com/65535/55046040509_95768cac96_c.jpg",
    completionDate: "2023-05-12",
  },
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleCategoryChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setActiveCategory(customEvent.detail);
      }
    };

    window.addEventListener("project-category-change", handleCategoryChange);

    return () => {
      window.removeEventListener(
        "project-category-change",
        handleCategoryChange,
      );
    };
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.completionDate).getTime() -
            new Date(a.completionDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.completionDate).getTime() -
            new Date(b.completionDate).getTime()
          );
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [activeCategory, sortBy]);

  return (
    <>
      <section
        id="projects"
        className="py-16 lg:py-20 bg-slate-950 text-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-amber-500 text-xs uppercase tracking-[0.3em] font-bold mb-3">
              Our Portfolio
            </h2>

            <h3 className="text-3xl sm:text-4xl font-black">
              Landmark Projects
            </h3>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Explore our portfolio of high-quality residential construction
              projects delivered with precision engineering.
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
            {/* CATEGORY */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition
                  ${
                    activeCategory === category
                      ? "bg-amber-500 text-white shadow-lg"
                      : "bg-white/10 backdrop-blur border border-white/10 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* SORT */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-slate-400 text-sm">
                <SlidersHorizontal className="w-4 h-4" />
                Sort
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>

          {/* PROJECT GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredAndSortedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer relative rounded-xl overflow-hidden bg-slate-900 border border-white/10 hover:border-amber-500/40 transition"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>

                <div className="absolute bottom-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition duration-500">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    {project.category}
                  </span>

                  <h3 className="text-xl font-bold mt-2">{project.title}</h3>

                  <p className="text-sm text-slate-300 mt-1">
                    {project.location}
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    Completed {new Date(project.completionDate).getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL SCREEN IMAGE VIEWER */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 text-white bg-black/60 hover:bg-black p-2 rounded-full"
          >
            <X size={24} />
          </button>

          {/* IMAGE */}
          <img
            src={selectedProject.imageUrl}
            alt={selectedProject.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl transition duration-300 hover:scale-105"
          />
        </div>
      )}
    </>
  );
};

export default Projects;
