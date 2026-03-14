import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
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
  const [zoomed, setZoomed] = useState(false);

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

  const handleClick = (i: number, e: any) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    const scrollTop =
      window.pageYOffset + rect.top - window.innerHeight / 2 + rect.height / 2;

    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });

    setTimeout(() => {
      setCurrentIndex(i);
    }, 400);
  };

  return (
    <>
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div
              key={p.id}
              onClick={(e) => handleClick(i, e)}
              className="cursor-pointer overflow-hidden rounded-xl"
            >
              <img
                src={p.imageUrl}
                className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                alt={p.title}
              />
            </div>
          ))}
        </div>
      </section>

      {currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          {...swipeHandlers}
        >
          <button
            onClick={() => setCurrentIndex(null)}
            className="absolute top-6 right-6 bg-black/60 p-3 rounded-full text-white z-50"
          >
            <X size={26} />
          </button>

          <div className="absolute top-6 left-6 text-white text-sm">
            {currentIndex + 1} / {projects.length}
          </div>

          <button
            onClick={goPrev}
            className="absolute left-8 z-50 w-16 h-16 flex items-center justify-center rounded-full bg-black/60 hover:bg-amber-500 text-white"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={goNext}
            className="absolute right-8 z-50 w-16 h-16 flex items-center justify-center rounded-full bg-black/60 hover:bg-amber-500 text-white"
          >
            <ChevronRight size={36} />
          </button>

          <TransformWrapper
            minScale={1}
            maxScale={4}
            centerOnInit
            centerZoomedOut
            onZoom={(ref) => {
              if (ref.state.scale > 1) setZoomed(true);
              else setZoomed(false);
            }}
          >
            <TransformComponent>
              <img
                src={projects[currentIndex].imageUrl}
                className="max-h-[85vh] max-w-[90vw] object-contain"
                alt=""
              />
            </TransformComponent>
          </TransformWrapper>

          {!zoomed && (
            <div className="absolute bottom-20 bg-black/40 backdrop-blur-md px-8 py-4 rounded-xl text-white text-center">
              <h3 className="text-lg font-bold">
                {projects[currentIndex].title}
              </h3>
              <p className="text-sm text-gray-300">
                {projects[currentIndex].location}
              </p>
              <p className="text-xs text-gray-400">
                Completed{" "}
                {new Date(projects[currentIndex].completionDate).getFullYear()}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
