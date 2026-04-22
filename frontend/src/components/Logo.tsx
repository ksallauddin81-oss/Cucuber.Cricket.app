const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center neon-glow-green">
      <span className="text-lg font-display font-bold text-primary">C</span>
      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary animate-glow-pulse" />
    </div>
    <div>
      <h1 className="text-lg font-display font-bold text-foreground tracking-tight">
        Cucu<span className="text-primary neon-text-green">ber</span>
      </h1>
      <p className="text-[9px] text-muted-foreground -mt-1 tracking-widest uppercase">Cricket Intelligence</p>
    </div>
  </div>
);

export default Logo;
