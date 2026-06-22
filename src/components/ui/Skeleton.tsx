import { type ReactNode } from 'react';

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-white/5 rounded-xl animate-pulse ${className}`} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-card p-4 animate-pulse h-[480px] rounded-2xl">
      <Skeleton className="w-full h-48 mb-4" />
      <Skeleton className="w-3/4 h-5 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-4" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
