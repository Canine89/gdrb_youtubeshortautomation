"use client"

import { useState, useMemo } from 'react';
import { useSheetData } from '@/hooks/useSheetData';
import { DataTable } from '@/components/DataTable';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { AlertCircle, Youtube, Play, Menu, Bell, Video, User, ExternalLink, ShoppingBag } from 'lucide-react';
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
    <main className="min-h-screen bg-background">
      {/* Youtube-style Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="shrink-0 hidden md:flex">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-1 font-bold text-xl tracking-tighter cursor-pointer">
              <div className="relative flex items-center justify-center w-8 h-6 bg-primary rounded-[4px] text-white">
                <Play className="w-4 h-4 fill-white" />
              </div>
              <span className="hidden sm:inline-block">Shorts Studio</span>
            </div>
          </div>

          <div className="flex-1 flex justify-center max-w-2xl mx-auto">
            <Search 
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="프롬프트 검색" 
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
             <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
               <User className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Book Promo Banner */}
        <div className="mb-10 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-900/50 rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden shadow-sm">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 shrink-0 transform transition-transform hover:scale-105 duration-300">
            <div className="relative w-[160px] h-[220px] sm:w-[180px] sm:h-[260px] shadow-2xl rounded-lg overflow-hidden border-2 border-white/20">
              <Image 
                src="/book-cover.jpg" 
                alt="이게 되네? AI 쇼츠 만들기 미친 자동화 22제" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-4 z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5" />
              Best Seller
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              이 사이트는 <span className="text-primary">도서의 독자</span>를 위해<br className="hidden sm:block" /> 만들어졌습니다
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              《이게 되네? AI 쇼츠 만들기 미친 자동화 22제》에 수록된 
              모든 프롬프트를 복사 붙여넣기만으로 간편하게 사용해보세요.
            </p>
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3">
              <Button asChild size="lg" className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  도서 구매하기 <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            프롬프트 <span className="text-primary">전체 목록</span>
          </h1>
          <p className="text-muted-foreground">
            원하는 자동화 작업을 검색하고 클릭 한 번으로 사용하세요.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>데이터를 불러오는데 실패했습니다: {error}</span>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              총 <span className="text-foreground font-bold">{filteredData.length}</span>개의 스크립트
            </div>
          </div>

          <DataTable data={paginatedData} loading={loading} />

          {!loading && filteredData.length > 0 && (
            <div className="flex justify-center py-4">
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
        
        <footer className="mt-16 py-8 border-t text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GDRB &amp; Golden Rabbit. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            본 사이트는 도서 구매자를 위한 보조 도구입니다.
          </p>
        </footer>
      </div>
    </main>
  );
}
