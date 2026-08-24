export default function Brand({
  showSubtitle = true,
}: {
  showSubtitle?: boolean;
}) {
  return (
    <div className="brand">
      <h1 className="text-primary font-bold text-xl">Vocagame Test</h1>
      {showSubtitle && (
        <h3 className="text-base text-body-text-muted">REAL TIME DASHBOARD</h3>
      )}
    </div>
  );
}
