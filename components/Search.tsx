import { Input } from "@/components/ui/input"
import { Search as SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Search({ value, onChange, placeholder = "검색" }: SearchProps) {
  return (
    <div className="flex w-full max-w-[600px] items-center">
      <div className="relative flex-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-r-none border-r-0 pl-4 bg-background focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50 shadow-inner"
          placeholder={placeholder}
        />
        {value && (
          <button 
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        )}
      </div>
      <Button 
        variant="secondary" 
        className="rounded-l-none border border-l-0 px-5 bg-secondary/50 hover:bg-secondary/80"
        disabled
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  )
}
