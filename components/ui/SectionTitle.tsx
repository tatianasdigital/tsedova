/** Oversized Bebas section heading (Figma "SectionTitle": 410px block, 300px type). */
export function SectionTitle({ children }: { children: string }) {
  return (
    <div className="site-container flex h-410 items-center overflow-clip py-40">
      <h2 className="h-330 min-w-0 flex-1 font-display text-300 leading-normal font-normal text-white uppercase whitespace-nowrap">
        {children}
      </h2>
    </div>
  );
}
