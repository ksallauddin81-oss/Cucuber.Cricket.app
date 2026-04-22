import { CloudRain, Thermometer, Droplets, Users, Zap, TrendingUp } from "lucide-react";

const StadiumAssistant = () => (
  <div className="glass-card p-4 space-y-4 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 dark:from-green-500/10 dark:to-emerald-500/10">
    
    <div className="flex items-center justify-between">
      <h3 className="font-display font-semibold text-sm">Stadium Assistant</h3>
      
      {/* FIXED BADGE */}
      <span className="text-[9px] px-2 py-0.5 rounded-full 
        bg-green-500/20 text-green-700 
        dark:bg-green-500/20 dark:text-green-300 
        font-medium">
        AI Powered
      </span>
    </div>

    {/* Pitch + Win */}
    <div className="flex gap-2">
      
      {/* Pitch */}
      <div className="flex-1 rounded-xl p-3 space-y-1 
        bg-white/60 dark:bg-muted/50 backdrop-blur-sm">
        
        <span className="text-[10px] text-muted-foreground">Pitch</span>

        <p className="text-xs font-semibold 
          text-green-700 dark:text-neon-green">
          Batting Friendly
        </p>

        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full ${
                i <= 4 
                  ? "bg-green-500 dark:bg-primary" 
                  : "bg-muted"
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Win Probability */}
      <div className="flex-1 rounded-xl p-3 space-y-1 
        bg-white/60 dark:bg-muted/50 backdrop-blur-sm">
        
        <span className="text-[10px] text-muted-foreground">Win Probability</span>

        <div className="flex items-end gap-1">
          <TrendingUp size={14} className="text-orange-500 dark:text-neon-orange" />
          <span className="text-xs font-bold text-orange-600 dark:text-neon-orange">
            IND 67%
          </span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-1">
          <div 
            className="h-full rounded-full 
              bg-gradient-to-r 
              from-orange-400 to-green-500 
              dark:from-neon-orange dark:to-accent"
            style={{ width: "67%" }} 
          />
        </div>
      </div>
    </div>

    {/* Weather */}
    <div className="flex gap-3">
      
      <div className="flex items-center gap-1.5 text-[11px]">
        <CloudRain size={14} className="text-blue-500 dark:text-neon-blue" />
        <span className="text-muted-foreground">
          Rain: <span className="text-foreground font-medium">12%</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px]">
        <Thermometer size={14} className="text-orange-500 dark:text-neon-orange" />
        <span className="text-foreground font-medium">28°C</span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px]">
        <Droplets size={14} className="text-blue-500 dark:text-neon-blue" />
        <span className="text-foreground font-medium">65%</span>
      </div>
    </div>

    {/* Crowd */}
    <div className="rounded-xl p-3 space-y-2 
      bg-white/60 dark:bg-muted/50 backdrop-blur-sm">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">Crowd</span>
        </div>
        <span className="text-[11px] font-medium">42,500 / 55,000</span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
        <div 
          className="h-full rounded-full 
            bg-gradient-to-r from-green-400 to-blue-400 
            dark:from-neon-green dark:to-neon-blue"
          style={{ width: "77%" }} 
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Zap size={12} className="text-orange-500 dark:text-neon-orange" />
        <span className="text-[10px] font-medium 
          text-orange-600 dark:text-neon-orange">
          Energy: HIGH
        </span>
      </div>
    </div>
  </div>
);

export default StadiumAssistant;