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
    e.stopPropagation(); // 행 클릭 이벤트 방지 (필요시)
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
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-16 bg-muted/50 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }
  
  if (data.length === 0) {
     return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-muted-foreground bg-muted/10 rounded-xl border border-dashed">
        <p>검색 결과가 없습니다.</p>
      </div>
     );
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[25%] min-w-[150px] py-4 pl-6 font-bold text-foreground">제목</TableHead>
            <TableHead className="py-4 font-bold text-foreground">내용</TableHead>
            <TableHead className="w-[100px] text-right pr-6 font-bold text-foreground">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow 
              key={row.id} 
              className="group transition-all hover:bg-muted/30 cursor-pointer"
              onClick={(e) => handleCopy(row.id, row.content, e)}
            >
              <TableCell className="font-semibold align-top py-5 pl-6 text-foreground/90 leading-relaxed">
                {row.title}
              </TableCell>
              <TableCell className="align-top py-5 text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                <div className="line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {row.content}
                </div>
              </TableCell>
              <TableCell className="align-top py-5 pr-6 text-right">
                <Button 
                  variant={copiedId === row.id ? "default" : "secondary"}
                  size="sm" 
                  className={cn(
                    "transition-all duration-200 shadow-sm",
                    copiedId === row.id 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "opacity-0 group-hover:opacity-100 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  )}
                  onClick={(e) => handleCopy(row.id, row.content, e)}
                >
                  {copiedId === row.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      <span className="text-xs">완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1.5" />
                      <span className="text-xs">복사</span>
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
