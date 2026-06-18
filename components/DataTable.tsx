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
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-12 animate-pulse border-b border-border bg-muted/40" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse border-b border-border last:border-0 bg-card/60" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-muted-foreground">
        <p className="font-serif text-[17px]">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[rgba(0,0,0,0.04)_0px_4px_24px]">
      <Table className="w-full table-fixed">
        <TableHeader className="bg-muted/60">
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="w-[56px] text-center text-[11px] uppercase tracking-[0.5px] text-muted-foreground">#</TableHead>
            <TableHead className="w-[140px] py-4 font-serif text-[14px] font-medium text-foreground">제목</TableHead>
            <TableHead className="py-4 font-serif text-[14px] font-medium text-foreground">프롬프트 내용</TableHead>
            <TableHead className="w-[72px] pr-4 text-right text-[11px] uppercase tracking-[0.5px] text-muted-foreground">복사</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            const isExpanded = expandedRows.has(row.id);

            return (
              <Fragment key={row.id}>
                <TableRow
                  className={cn(
                    "group cursor-pointer border-b border-border transition-colors duration-200 last:border-0",
                    isExpanded ? "bg-muted/40" : "hover:bg-muted/50"
                  )}
                  onClick={() => toggleExpand(row.id)}
                >
                  <TableCell className="py-4 text-center align-top text-[13px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </TableCell>
                  <TableCell className="overflow-hidden py-4 align-top font-serif text-[16px] font-medium leading-[1.3] text-foreground">
                    <div className="truncate" title={row.title}>
                      {row.title}
                    </div>
                  </TableCell>
                  <TableCell className="overflow-hidden py-4 align-top text-[15px] leading-[1.6] text-muted-foreground">
                    <div className="space-y-2">
                      <div
                        className={cn(
                          "break-words transition-all duration-300",
                          isExpanded ? "whitespace-pre-wrap text-foreground" : "line-clamp-2"
                        )}
                      >
                        {row.content}
                      </div>
                      <div
                        className={cn(
                          "flex items-center gap-1 text-[11px] uppercase tracking-[0.5px] transition-colors duration-200",
                          isExpanded
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary"
                        )}
                      >
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
                  <TableCell className="py-4 pr-4 text-right align-top">
                    <Button
                      variant={copiedId === row.id ? "default" : "secondary"}
                      size="icon-sm"
                      className={cn(
                        "transition-all duration-200",
                        copiedId === row.id
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-accent"
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
