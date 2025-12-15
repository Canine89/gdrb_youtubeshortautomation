"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"
import { SheetRow } from "@/hooks/useSheetData"
import { cn } from "@/lib/utils"
import { useState, Fragment } from "react"

interface DataTableProps {
  data: SheetRow[];
  loading: boolean;
}

export function DataTable({ data, loading }: DataTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="w-full bg-card rounded-xl border overflow-hidden">
        <div className="h-12 bg-muted/30 border-b animate-pulse" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 border-b last:border-0 animate-pulse bg-white/50" />
        ))}
      </div>
    );
  }
  
  if (data.length === 0) {
     return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-muted-foreground bg-card rounded-xl border border-dashed">
        <p>검색 결과가 없습니다.</p>
      </div>
     );
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table className="table-fixed w-full">
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="w-[50px] text-center">#</TableHead>
            <TableHead className="w-[120px] py-4 font-bold text-foreground">제목</TableHead>
            <TableHead className="py-4 font-bold text-foreground">프롬프트 내용</TableHead>
            <TableHead className="w-[80px] text-right pr-4 font-bold text-foreground">복사</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            const isExpanded = expandedRows.has(row.id);
            
            return (
              <Fragment key={row.id}>
                <TableRow 
                  className={cn(
                    "transition-all duration-200 border-b last:border-0 cursor-pointer group",
                    isExpanded ? "bg-muted/20" : "hover:bg-muted/30"
                  )}
                  onClick={() => toggleExpand(row.id)}
                >
                  <TableCell className="text-center font-medium text-muted-foreground align-top py-4">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-semibold align-top py-4 text-foreground leading-relaxed overflow-hidden">
                    <div className="truncate" title={row.title}>
                      {row.title}
                    </div>
                  </TableCell>
                  <TableCell className="align-top py-4 text-muted-foreground leading-relaxed overflow-hidden">
                    <div className="space-y-2">
                      <div className={cn(
                        "break-words transition-all duration-300",
                        isExpanded ? "whitespace-pre-wrap" : "line-clamp-2"
                      )}>
                        {row.content}
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 text-xs transition-opacity duration-200",
                        isExpanded 
                          ? "text-[#FF0000]" 
                          : "text-muted-foreground group-hover:text-[#FF0000]"
                      )}>
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            <span>접기</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            <span>전체보기</span>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="align-top py-4 pr-4 text-right">
                    <Button 
                      variant={copiedId === row.id ? "default" : "outline"}
                      size="icon"
                      className={cn(
                        "transition-all duration-200 h-8 w-8 shadow-md",
                        copiedId === row.id 
                          ? "bg-[#FF0000] hover:bg-[#CC0000] text-white border-[#FF0000]" 
                          : "bg-[#f5f5f5] border-2 border-[#c0c0c0] hover:border-[#FF0000] hover:bg-[#fff0f0] text-[#333333] hover:text-[#FF0000]"
                      )}
                      onClick={(e) => handleCopy(row.id, row.content, e)}
                      title="복사"
                    >
                      {copiedId === row.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}
