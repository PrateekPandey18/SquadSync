export default function PFP(){
    return(
        <div className="flex items-center h-8 w-fit min-w-35 not-even:bg-[#1a2134] border border-[#22293d] rounded-lg px-2 gap-2 shadow-sm">
      
      <div className="h-6 w-6 shrink-0 rounded-full bg-slate-300 overflow-hidden">
        <img 
          src="https://via.placeholder.com/24" 
          alt="User avatar" 
          className="h-full w-full object-cover"
        />
      </div>

      
            <div className="flex flex-col justify-center overflow-hidden">
                <span className="text-[11px] font-semibold text-white leading-none truncate">
                Alex Rivera
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[9px] text-slate-500 font-medium uppercase tracking-tight">
                    Online
                </span>
                </div>
            </div>
            </div>
    )
      
}