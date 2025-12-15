"use client"

import { useState, useMemo } from 'react';
import { useSheetData } from '@/hooks/useSheetData';
import { DataTable } from '@/components/DataTable';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { AlertCircle, Play, Menu, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Home() {
  const { data, loading, error } = useSheetData();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // 검색 필터링
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    const query = searchQuery.toLowerCase();
    return data.filter(row => 
      row.title.toLowerCase().includes(query) || 
      row.content.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // 검색 시 첫 페이지로 이동
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // 항목 수 변경 시 첫 페이지로 이동
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Youtube-style Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="shrink-0 hidden md:flex">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-1 font-bold text-xl tracking-tighter cursor-pointer select-none">
              <div className="flex items-center justify-center w-8 h-6 bg-[#FF0000] rounded-[4px] text-white">
                <Play className="w-4 h-4 fill-white" />
              </div>
              <span className="hidden sm:inline-block tracking-tight">유튜브 쇼츠 자동화 프롬프트</span>
            </div>
          </div>

          <div className="flex-1 flex justify-center max-w-2xl mx-auto px-4">
            <Search 
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="검색" 
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar (Sticky) - Book Promo */}
          <aside className="lg:col-span-3 lg:sticky lg:top-20 space-y-6">
            <div className="bg-card rounded-xl border p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="relative w-[160px] h-[220px] shadow-lg rounded-md overflow-hidden bg-muted">
                <Image 
                  src="/book-cover.jpg" 
                  alt="이게 되네? AI 쇼츠 만들기 미친 자동화 22제" 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold leading-tight">
                  이게 되네?<br/>
                  <span className="text-[#FF0000]">AI 쇼츠 만들기</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  책에 수록된 프롬프트를<br/>복사해서 바로 사용하세요.
                </p>
              </div>

              <div className="w-full space-y-3">
                <p className="text-xs text-center text-amber-600 font-medium bg-amber-50 py-2 px-3 rounded-lg border border-amber-200">
                  📚 판매 준비 중입니다
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {/* Yes24 - 빨간색 */}
                  <Button 
                    asChild 
                    className="w-full font-bold bg-[#E6002D] hover:bg-[#cc0028] text-white shadow-sm opacity-60 cursor-not-allowed h-10"
                    disabled
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      YES24
                    </a>
                  </Button>
                  {/* 교보문고 - 하늘색/청록색 */}
                  <Button 
                    asChild 
                    className="w-full font-bold bg-[#00AAC6] hover:bg-[#0099b3] text-white shadow-sm opacity-60 cursor-not-allowed h-10"
                    disabled
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      교보문고
                    </a>
                  </Button>
                  {/* 알라딘 - 보라색 */}
                  <Button 
                    asChild 
                    className="w-full font-bold bg-[#6C3FA0] hover:bg-[#5c3590] text-white shadow-sm opacity-60 cursor-not-allowed h-10"
                    disabled
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      알라딘
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block text-xs text-muted-foreground text-center">
              <p>© {new Date().getFullYear()} Golden Rabbit.</p>
            </div>
          </aside>

          {/* Right Main Content */}
          <section className="lg:col-span-9 space-y-6">
            {error && (
              <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">오류: {error}</span>
              </div>
            )}

            <DataTable data={paginatedData} loading={loading} />

            {!loading && filteredData.length > 0 && (
              <div className="flex justify-center py-4 border-t">
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
