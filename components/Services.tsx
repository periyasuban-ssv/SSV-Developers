import React from 'react';
import { Home, Building2, Hammer, Ruler } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Residential Construction',
    description: 'Custom homes designed to fit your lifestyle, from foundations to finishing touches.',
    icon: 'home',
  },
  {
    id: '2',
    title: 'Commercial Development',
    description: 'Scalable office spaces, retail centers, and warehouses built for business growth.',
    icon: 'building',
  },
  {
    id: '3',
    title: 'Renovation & Remodeling',
    description: 'Transforming existing spaces with modern upgrades and structural reinforcements.',
    icon: 'hammer',
  },
  {
    id: '4',
    title: 'Architectural Planning',
    description: 'Comprehensive blueprints and 3D modeling to visualize your project before we build.',
    icon: 'ruler',
  },
];

const Services: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home': return <Home className="w-8 h-8 text-white" />;
      case 'building': return <Building2 className="w-8 h-8 text-white" />;
      case 'hammer': return <Hammer className="w-8 h-8 text-white" />;
      case 'ruler': return <Ruler className="w-8 h-8 text-white" />;
      default: return <Home className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-900 text-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Comprehensive Construction Services</h3>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            We deliver excellence across a wide spectrum of construction needs, ensuring quality at every stage of development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group p-8 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all duration-300 border border-slate-700 hover:border-amber-500 transform hover:-translate-y-2 cursor-default hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                {getIcon(service.icon)}
              </div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">{service.title}</h4>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;