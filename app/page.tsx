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

              <Button asChild className="w-full font-semibold bg-[#FF0000] hover:bg-[#CC0000] text-white shadow-sm">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  도서 구매하기 <ExternalLink className="ml-2 w-3 h-3" />
                </a>
              </Button>
            </div>

            <div className="hidden lg:block text-xs text-muted-foreground text-center">
              <p>© {new Date().getFullYear()} Golden Rabbit.</p>
            </div>
          </aside>

          {/* Right Main Content */}
          <section className="lg:col-span-9 space-y-6">
            <div className="flex flex-col gap-2">
               <h1 className="text-2xl font-bold tracking-tight">쇼츠 완전 자동화 프롬프트</h1>
               <p className="text-muted-foreground text-sm">
                 총 <span className="font-bold text-foreground">{filteredData.length}</span>개의 스크립트
               </p>
            </div>

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
