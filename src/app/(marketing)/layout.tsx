export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mi-canvas-base mi-canvas-marketing text-white">
      {children}
    </div>
  );
}
