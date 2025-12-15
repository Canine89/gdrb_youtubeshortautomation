"use client"

import { useState, useMemo } from 'react';
import { useSheetData } from '@/hooks/useSheetData';
import { DataTable } from '@/components/DataTable';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { AlertCircle, Play, Menu, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Home() {
  const { data, loading, error } = useSheetData();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    <main className="min-h-screen bg-background bg-noise text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Mobile Header (Only visible on small screens) */}
      <header className="lg:hidden sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="flex items-center justify-center w-7 h-7 bg-primary rounded-lg text-white shadow-lg shadow-primary/30">
            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
          </div>
          <span>쇼츠 완전 자동화 프롬프트</span>
        </div>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Sidebar (Sticky) - 30% Width */}
          <aside className="lg:col-span-4 lg:sticky lg:top-12 space-y-8">
            {/* Book Promo Card */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center text-center space-y-6 overflow-hidden">
                
                {/* Book Cover */}
                <div className="relative w-[180px] h-[260px] md:w-[200px] md:h-[290px] shadow-2xl rounded-lg overflow-hidden border-4 border-white transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
                  <Image 
                    src="/book-cover.jpg" 
                    alt="이게 되네? AI 쇼츠 만들기 미친 자동화 22제" 
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Sheen effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                <div className="space-y-3 max-w-xs mx-auto">
                  <h2 className="text-2xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                    AI 쇼츠 만들기<br/>
                    <span className="text-primary">미친 자동화 22제</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    책에 수록된 프롬프트를<br/>복사 붙여넣기로 바로 사용하세요.
                  </p>
                </div>

                <Button asChild size="lg" className="w-full font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <BookOpen className="w-4 h-4 mr-2" />
                    도서 구매하러 가기
                  </a>
                </Button>
              </div>
            </div>

            {/* Desktop Only Footer Info */}
            <div className="hidden lg:block text-xs text-muted-foreground/60 text-center leading-relaxed">
              <p>© {new Date().getFullYear()} Golden Rabbit &amp; GDRB.</p>
              <p>All rights reserved.</p>
            </div>
          </aside>

          {/* Right Main Content - 70% Width */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* Desktop Header & Search */}
            <div className="hidden lg:flex flex-col gap-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                   <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    쇼츠 완전 자동화 프롬프트
                   </h1>
                   <p className="text-muted-foreground mt-2">
                     총 <span className="font-bold text-foreground">{filteredData.length}</span>개의 자동화 스크립트가 준비되어 있습니다.
                   </p>
                </div>
              </div>
              
              <div className="glass-panel p-2 rounded-xl sticky top-4 z-40 backdrop-blur-xl">
                 <Search 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                    placeholder="어떤 자동화 작업이 필요하신가요?" 
                  />
              </div>
            </div>

            {/* Mobile Search (Separate) */}
            <div className="lg:hidden sticky top-16 z-30 mb-6">
               <div className="glass-panel p-2 rounded-xl shadow-md">
                 <Search 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                    placeholder="프롬프트 검색..." 
                  />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">데이터를 불러오는데 실패했습니다: {error}</span>
              </div>
            )}

            {/* Content Area */}
            <div className="min-h-[500px]">
              <DataTable data={paginatedData} loading={loading} />

              {!loading && filteredData.length > 0 && (
                <div className="flex justify-center py-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
