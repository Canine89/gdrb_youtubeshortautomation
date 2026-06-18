"use client"

import { useState, useMemo } from 'react';
import { useSheetData } from '@/hooks/useSheetData';
import { DataTable } from '@/components/DataTable';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Home() {
  const { data, loading, error } = useSheetData();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(row =>
      row.title.toLowerCase().includes(query) ||
      row.content.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Editorial top bar — parchment canvas, warm cream hairline */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 select-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
              <span className="font-serif text-[15px] leading-none">G</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-[17px] font-medium tracking-tight text-foreground">
                유튜브 쇼츠 자동화 프롬프트
              </span>
              <span className="hidden text-[11px] tracking-[0.12px] text-muted-foreground sm:inline">
                Golden Rabbit · AI Shorts Automation
              </span>
            </div>
          </div>

          <div className="ml-auto w-full max-w-[420px]">
            <Search
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="프롬프트 검색"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-10 lg:py-14">
        {/* Editorial hero — serif title, muted body, quiet divider */}
        <section className="mb-12 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.5px] text-muted-foreground">
            Prompt Library · 22 Recipes
          </p>
          <h1 className="font-serif text-[40px] leading-[1.15] tracking-tight text-foreground md:text-[52px]">
            이게 되네?<br />
            <span className="text-primary">AI 쇼츠 만들기</span> 미친 자동화 22제
          </h1>
          <p className="mt-6 font-serif text-[17px] leading-[1.6] text-muted-foreground">
            책에 수록된 22개의 프롬프트를 한자리에서 검색하고, 클릭 한 번으로 복사해
            곧바로 영상 제작에 사용할 수 있습니다.
          </p>
        </section>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Book promo card — ivory surface, ring hairline, serif book title */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-7 text-center shadow-[rgba(0,0,0,0.04)_0px_4px_24px]">
              <div className="relative h-[240px] w-[172px] overflow-hidden rounded-xl bg-muted ring-1 ring-border">
                <Image
                  src="/book-cover.jpg"
                  alt="이게 되네? AI 쇼츠 만들기 미친 자동화 22제"
                  fill
                  sizes="172px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-[22px] leading-[1.2] text-foreground">
                  이게 되네?<br />
                  <span className="text-primary">AI 쇼츠 만들기</span>
                </h2>
                <p className="text-[13px] leading-[1.5] text-muted-foreground">
                  책에 수록된 프롬프트를<br />복사해서 바로 사용하세요.
                </p>
              </div>

              <div className="w-full space-y-3">
                <p className="rounded-full border border-border bg-muted px-3 py-1.5 text-[11px] font-medium tracking-[0.12px] text-muted-foreground">
                  현재 판매중입니다
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {/* Bookstore brand colors — AGENTS.md 예외 규칙 */}
                  <Button
                    asChild
                    className="h-10 w-full rounded-xl bg-[#E6002D] text-white shadow-none hover:bg-[#cc0028]"
                  >
                    <a href="https://bit.ly/4qAegPV" target="_blank" rel="noopener noreferrer">
                      YES24
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="h-10 w-full rounded-xl bg-[#00AAC6] text-white shadow-none hover:bg-[#0099b3]"
                  >
                    <a href="https://bit.ly/4qeWfWU" target="_blank" rel="noopener noreferrer">
                      교보문고
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="h-10 w-full rounded-xl bg-[#6C3FA0] text-white shadow-none hover:bg-[#5c3590]"
                  >
                    <a href="https://bit.ly/4jdEDbJ" target="_blank" rel="noopener noreferrer">
                      알라딘
                    </a>
                  </Button>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 w-full rounded-xl border-border bg-card text-foreground shadow-none hover:bg-muted"
                >
                  <a
                    href="https://docs.google.com/spreadsheets/d/1pdFHQ4D_f2Bhgruw48yDOTcwK1nezxEvptRcdOhH4Z8/edit?usp=drivesdk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    정오표 확인
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden text-center text-[11px] text-muted-foreground lg:block">
              © {new Date().getFullYear()} Golden Rabbit
            </div>
          </aside>

          {/* Main content */}
          <section className="space-y-8 lg:col-span-8">
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">오류: {error}</span>
              </div>
            )}

            <DataTable data={paginatedData} loading={loading} />

            {!loading && filteredData.length > 0 && (
              <div className="flex justify-center border-t border-border pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
