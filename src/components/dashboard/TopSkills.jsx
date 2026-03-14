import React from "react";
import { Zap } from "lucide-react";

const TopSkills = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  // Find max count to scale size opacity
  const maxCount = skills[0][1];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Zap size={18} className="text-amber-500" /> Top Demanded Skills
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {skills.map(([skill, count]) => {
          const intensity = Math.max(0.5, count / maxCount); // Opacity math
          
          return (
            <div 
                key={skill} 
                className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all hover:scale-105 cursor-default flex items-center gap-2"
                style={{ 
                    borderColor: `rgba(34, 197, 94, ${intensity * 0.5})`, // Brand green with opacity
                    backgroundColor: `rgba(34, 197, 94, ${intensity * 0.1})`,
                    color: '#0F172A'
                }}
            >
              {skill}
              <span className="bg-white/50 px-1.5 rounded text-[10px] text-slate-500">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopSkills;