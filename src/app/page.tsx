// Step 1 shell: the hero name only. The claims, receipts and sections arrive
// in steps 2 and 3.
export default function Home() {
  return (
    <div className="wrap pt-[clamp(28px,6vw,72px)]">
      <h1 className="t-name">
        <span className="block">Prosper</span>
        <span className="block">Chukwuemeke</span>
        <span className="block">Osaigbovo</span>
      </h1>
      <p className="mt-3.5 text-base text-graphite">Full stack software engineer in Nigeria. He/him.</p>
    </div>
  );
}
