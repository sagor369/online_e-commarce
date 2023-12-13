import { Skeleton } from "@/components/ui/skeleton"

export function Loading() {
  return (
      <div className="p-12 space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
  )
}
