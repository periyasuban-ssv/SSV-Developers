import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2019', projects: 12 },
  { year: '2020', projects: 18 },
  { year: '2021', projects: 25 },
  { year: '2022', projects: 42 },
  { year: '2023', projects: 68 },
  { year: '2024', projects: 95 },
  { year: '2025', projects: 120 },
  { year: '2026', projects: 150 },
];

const StatsChart: React.FC = () => {
  return (
    <section id="growth" className="py-20 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Growing Stronger Every Year</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              At SSV Developers, our consistent growth reflects our commitment to reliability and client satisfaction. We've scaled from small residential units to massive commercial infrastructures, with 150+ projects currently active or delivered.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-amber-500">
                <span className="block text-3xl font-bold text-slate-900">150+</span>
                <span className="text-sm text-slate-500">Total Projects</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                <span className="block text-3xl font-bold text-slate-900">250+</span>
                <span className="text-sm text-slate-500">Expert Workforce</span>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-full h-[400px] bg-white rounded-xl shadow-lg border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-700">Project Portfolio Growth</h3>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  COMPLETED / ONGOING
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontWeight: 'bold'}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontWeight: 'bold'}} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px', 
                    color: '#fff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="projects" 
                  stroke="#f59e0b" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorProjects)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsChart;