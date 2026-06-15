import { ArrowRight } from "lucide-react";

export function ServiceCard({ icon: Icon, title, description, link }) {
  return (
    <div className="group border border-[#051A14]/15 rounded-2xl p-6 flex flex-col bg-white shadow-[0_4px_25px_rgba(5,26,20,0.03)] hover:shadow-[0_16px_35px_rgba(5,26,20,0.08)] hover:border-[#051A14] transition-all duration-300 h-full relative overflow-hidden">
      
      {/* Premium top accent border using the Gold shade to contrast the main Emerald hover outline */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon Frame wrapper utilizing both shades (Emerald icon over a Gold accent background on hover) */}
      <div className="w-11 h-11 rounded-xl bg-[#051A14]/[0.04] group-hover:bg-[#D4AF37]/15 flex items-center justify-center mb-5 transition-colors duration-300 shrink-0">
        <Icon size={22} className="text-[#051A14] transition-colors duration-300" />
      </div>
      
      {/* Text block */}
      <div className="flex flex-col flex-1 mb-6">
        <h3 className="font-bold text-[#051A14] text-base tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed font-normal">
          {description}
        </p>
      </div>
      
      {/* Interactive Button link using prominent Emerald text with a moving pointer */}
      <button className="flex items-center gap-2 text-xs text-[#051A14] font-extrabold uppercase tracking-wider mt-auto group/btn cursor-pointer">
        <span>{link}</span> 
        <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform duration-200 text-[#D4AF37]" />
      </button>

    </div>
  );
}