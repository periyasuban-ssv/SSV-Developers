import React, { useState, useMemo, useEffect } from "react";
import { Project } from "../../types";
import { SlidersHorizontal } from "lucide-react";

const projects: Project[] = [
  {
    id: "1",
    title: "Residential Villa",
    category: "Residential",
    location: "Srinivasa Colony, Madurai",
    imageUrl:
      "https://live.staticflickr.com/65535/55046095245_cc2e8f351a_c.jpg",
    completionDate: "2026-2-15",
  },
  {
    id: "2",
    title: "Independent Plot ",
    category: "Residential",
    location: "Srinivas colony, Madurai",
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
    title: "Luxury plot",
    category: "Residential",
    location: "North Street",
    imageUrl:
      "https://live.staticflickr.com/65535/55046113450_74ed984d73_c.jpg",
    completionDate: "2022-12-05",
  },
  {
    id: "5",
    title: "Single plot",
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

  // Listen for category changes from Navbar
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

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Derive unique categories from data
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  // Filter and Sort Logic
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Sort
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
    <section id="projects" className="py-20 bg-slate-50 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-600">
              Explore our portfolio of landmarks. Each project represents our
              dedication to structural integrity and aesthetic beauty.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 rounded-xl border-2 border-amber-500 text-amber-600 font-black text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center gap-2 group whitespace-nowrap transform hover:-translate-y-1 active:scale-95 shadow-md hover:shadow-lg outline-none"
          >
            Start a Project
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
          {/* Category Filter Buttons */}
          <div className="flex overflow-x-auto pb-2 w-full lg:w-auto gap-2 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap active:scale-95 ${
                  activeCategory === category
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 transform -translate-y-0.5"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-amber-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-4 h-4" />
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer flex-grow lg:flex-grow-0 hover:border-amber-400 transition-colors shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">Name (A-Z)</option>
              <option value="za">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-slate-300 text-xs bg-slate-800/50 px-2 py-0.5 rounded backdrop-blur-sm">
                    {new Date(project.completionDate).getFullYear()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">
              No projects found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSortBy("newest");
              }}
              className="mt-4 text-amber-500 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
