import ModeToggle from "../dashboard/ModeToggle";

export function KidsHeader() {
  return (
    <header className="relative">
      <div className="flex items-center justify-center px-6 py-6 md:py-8">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-white">
          Mundo adventures
        </h1>

        <div className="ml-auto bg-white/10 rounded-xl backdrop-blur-sm">
          <ModeToggle variant="header" />
        </div>
      </div>
    </header>
  );
}
