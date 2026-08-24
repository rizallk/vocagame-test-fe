export default function SkeletonLoader({
  className = '',
  itemNumber = 3,
}: {
  className?: string;
  itemNumber?: number;
}) {
  const skeletonItems = [];
  for (let i = 0; i < itemNumber; i++) {
    skeletonItems.push(
      <div
        key={i}
        className={`h-4 w-${i === 0 ? '1/2' : i === 1 ? '3/4' : 'full'} bg-gray-200/20 animate-pulse rounded-full`}
      ></div>,
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>{skeletonItems}</div>
  );
}
