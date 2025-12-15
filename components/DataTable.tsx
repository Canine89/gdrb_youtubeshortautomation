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
import { Copy, Check } from "lucide-react"
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
    <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="w-[50px] text-center">#</TableHead>
            <TableHead className="w-[25%] min-w-[150px] py-4 font-bold text-foreground">제목</TableHead>
            <TableHead className="py-4 font-bold text-foreground">프롬프트 내용</TableHead>
            <TableHead className="w-[120px] min-w-[120px] text-right pr-6 font-bold text-foreground">복사</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow 
              key={row.id} 
              className="transition-colors hover:bg-muted/30 border-b last:border-0"
            >
              <TableCell className="text-center font-medium text-muted-foreground align-top py-5">
                {index + 1}
              </TableCell>
              <TableCell className="font-semibold align-top py-5 text-foreground leading-relaxed">
                {row.title}
              </TableCell>
              <TableCell className="align-top py-5 text-muted-foreground leading-relaxed">
                <div className="line-clamp-2">
                  {row.content}
                </div>
              </TableCell>
              <TableCell className="align-top py-5 pr-6 text-right whitespace-nowrap">
                <Button 
                  variant={copiedId === row.id ? "default" : "outline"}
                  size="sm" 
                  className={cn(
                    "transition-all duration-200 h-9 px-4 font-medium shadow-sm",
                    copiedId === row.id 
                      ? "bg-primary hover:bg-primary/90 text-white border-primary" 
                      : "bg-white border-2 border-border hover:border-primary hover:bg-primary/5 hover:text-primary text-foreground"
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
