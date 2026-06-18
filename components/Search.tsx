import { Input } from "@/components/ui/input"
import { Search as SearchIcon, X } from "lucide-react"

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Search({ value, onChange, placeholder = "검색" }: SearchProps) {
  return (
    <div className="relative w-full">
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-full border-border bg-card pl-10 pr-10 text-[14px] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="검색어 지우기"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
