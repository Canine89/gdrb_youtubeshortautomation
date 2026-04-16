import { useState, useEffect } from 'react';

export interface SheetRow {
  id: string;
  title: string;
  content: string;
}

export function useSheetData() {
  const [data, setData] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/sheets');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch data');
        }

        const rawValues = result.values || [];
        
        // A열(제목), B열(내용) 매핑
        const formattedData = rawValues.map((row: string[], index: number) => ({
          id: `row-${index}`,
          title: row[0] || '',
          content: row[1] || '',
        })).filter((item: SheetRow) => item.title || item.content); // 빈 행 필터링

        // 첫 번째 행이 헤더일 가능성이 높으므로 확인
        // "제목", "내용", "Title", "Content", "Prompt" 등의 키워드가 있으면 헤더로 간주하고 제외
        const headerKeywords = ['제목', '내용', 'title', 'content', 'prompt', '프롬프트'];
        const firstRowTitle = formattedData[0]?.title?.toLowerCase();
        
        const dataWithoutHeader = formattedData.length > 0 && 
                                  headerKeywords.some(k => firstRowTitle?.includes(k))
                                  ? formattedData.slice(1) 
                                  : formattedData;

        setData(dataWithoutHeader);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}


