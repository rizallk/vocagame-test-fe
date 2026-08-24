type ProgressBarProps = {
  min: number;
  max: number;
  color?: string;
  opacity?: number;
  variant?: 'success' | 'danger';
};

const bgColorClasses: Record<
  NonNullable<ProgressBarProps['variant']>,
  string
> = {
  success: 'bg-primary',
  danger: 'bg-danger',
};

export default function ProgressBar({
  min,
  max,
  color,
  opacity,
  variant,
}: ProgressBarProps) {
  const minWidth = (min / max) * 100;

  return (
    <div className="relative w-full">
      <div
        className={`absolute h-2.5 ${variant ? bgColorClasses[variant] : ''} rounded-full`}
        style={{ width: `${minWidth}%`, backgroundColor: color, opacity }}
      ></div>
      <div className="h-2.5 w-full bg-[#0E0E10] rounded-full"></div>
    </div>
  );
}
