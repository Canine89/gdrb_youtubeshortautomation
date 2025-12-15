"use client"

import { Button } from "@/components/ui/button"
import { Copy, Check, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { SheetRow } from "@/hooks/useSheetData"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface DataTableProps {
  data: SheetRow[];
  loading: boolean;
}

export function DataTable({ data, loading }: DataTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) return;
    
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("클립보드에 복사되었습니다!");
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-24 bg-muted/40 animate-pulse rounded-2xl border border-white/5" />
        ))}
      </div>
    );
  }
  
  if (data.length === 0) {
     return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-muted-foreground bg-muted/5 rounded-3xl border border-dashed border-muted/30">
        <p className="text-lg font-medium">검색 결과가 없습니다.</p>
        <p className="text-sm opacity-60 mt-1">다른 키워드로 검색해보세요.</p>
      </div>
     );
  }

  return (
    <div className="space-y-4">
      {data.map((row) => (
        <div 
          key={row.id}
          className="group relative bg-card hover:bg-muted/30 border border-border/50 hover:border-primary/20 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
          onClick={(e) => handleCopy(row.id, row.content, e)}
        >
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between relative z-10">
            <div className="space-y-3 flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                {row.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                {row.content}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-border/50">
               <span className="text-xs font-medium text-primary/70 sm:hidden">
                 탭하여 복사하기
               </span>
               
               <Button 
                variant={copiedId === row.id ? "default" : "outline"}
                size="sm" 
                className={cn(
                  "shrink-0 transition-all duration-300 font-semibold rounded-xl h-10 px-5",
                  copiedId === row.id 
                    ? "bg-green-600 hover:bg-green-700 text-white border-transparent shadow-md shadow-green-500/20" 
                    : "border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary text-muted-foreground"
                )}
                onClick={(e) => handleCopy(row.id, row.content, e)}
              >
                {copiedId === row.id ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5" />
                    완료
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1.5" />
                    복사
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
