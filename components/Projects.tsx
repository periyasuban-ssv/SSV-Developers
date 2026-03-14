import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  completionDate: string;
};

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

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const goNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % projects.length);
  };

  const goPrev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  return (
    <>
      {/* PROJECT GRID */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.id}
              onClick={() => setCurrentIndex(i)}
              className="cursor-pointer rounded-xl overflow-hidden"
            >
              <img
                src={p.imageUrl}
                className="w-full h-60 object-cover hover:scale-110 transition duration-500"
                alt={p.title}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL MEDIA STYLE POST */}
      {currentIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden relative"
            {...swipeHandlers}
          >
            {/* CLOSE */}
            <button
              onClick={() => setCurrentIndex(null)}
              className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full"
            >
              <X size={20} />
            </button>

            {/* IMAGE */}
            <img
              src={projects[currentIndex].imageUrl}
              className="w-full h-[300px] object-cover"
              alt=""
            />

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">
                {projects[currentIndex].title}
              </h3>

              <p className="text-sm text-gray-600">
                {projects[currentIndex].location}
              </p>

              <p className="text-xs text-gray-400">
                Completed{" "}
                {new Date(projects[currentIndex].completionDate).getFullYear()}
              </p>
            </div>

            {/* NAVIGATION */}
            <div className="flex justify-between items-center px-4 pb-4">
              <button
                onClick={goPrev}
                className="flex items-center gap-1 text-sm text-gray-700"
              >
                <ChevronLeft size={18} /> Prev
              </button>

              <button
                onClick={goNext}
                className="flex items-center gap-1 text-sm text-gray-700"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
