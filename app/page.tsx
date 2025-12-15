"use client"

import { useState, useMemo } from 'react';
import { useSheetData } from '@/hooks/useSheetData';
import { DataTable } from '@/components/DataTable';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { AlertCircle, Youtube, Play, Menu, Bell, Video, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
        <div className="mb-8 space-y-4 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            이게 되네? <span className="text-primary">AI 쇼츠 만들기</span> 미친 자동화 22제
          </h1>
          <p className="text-muted-foreground text-lg">
            영상 제작 시간을 획기적으로 줄여줄 22가지 자동화 프롬프트 모음입니다.
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
      </div>
    </main>
  );
}
