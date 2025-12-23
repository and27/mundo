import ModeToggle from "../dashboard/ModeToggle";

export function KidsHeader() {
  const userName = "Andreu";
  return (
    <header className="relative mi-surface-dark">
      <div className="flex items-center justify-center px-6 py-6 md:py-7">
        <h1 className="text-center text-xl md:text-2xl font-bold text-white">
          {`Hola, ${userName}`}
        </h1>

        <div className="ml-auto bg-white/10 rounded-xl backdrop-blur-sm">
          <ModeToggle variant="header" />
        </div>
      </div>
    </header>
  );
}
