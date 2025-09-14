interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export default function Progress({
  value,
  max = 100,
  className = "",
  showLabel = false,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
        <div
          className="h-2.5 bg-[#5B8DEF] transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-sm font-medium text-right text-gray-600">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
