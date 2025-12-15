# 이게 되네? AI 쇼츠 만들기 미친 자동화 22제

Google 스프레드시트의 A열(제목)과 B열(내용)을 보기 좋은 테이블 UI로 제공하고, 클릭하여 복사할 수 있는 웹 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Theme**: tweakcn soft-pop 테마
- **API**: Google Sheets API (googleapis)
- **Deployment**: Vercel

## 주요 기능

- 📊 Google 스프레드시트 연동 (A열: 제목, B열: 내용)
- 🔍 실시간 검색 기능 (제목 및 내용 검색)
- 📄 페이지네이션 (10/20/50/100개씩 표시)
- 📋 클릭하여 복사 기능 (B열 내용 클립보드 복사)
- 🎨 soft-pop 테마 적용

## 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `service-account-file.json` 파일을 배치하거나, `.env.local` 파일에 다음을 설정:

```env
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
SPREADSHEET_ID=1183q2XyX1QSM8Qs71hERWuCbBbyfBO2F8eN1QOhGSaI
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## Vercel 배포

### 1. GitHub에 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Vercel 프로젝트 생성

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 이름을 `gdrb-autoshorts`로 설정
5. 환경 변수 설정:
   - `GOOGLE_SERVICE_ACCOUNT_JSON`: 서비스 계정 JSON 전체 내용 (한 줄)
   - `SPREADSHEET_ID`: `1183q2XyX1QSM8Qs71hERWuCbBbyfBO2F8eN1QOhGSaI`
6. "Deploy" 클릭

### 3. 배포 확인

배포 완료 후 `https://gdrb-autoshorts.vercel.app`에서 확인할 수 있습니다.

## 프로젝트 구조

```
gdrb_youtubeshortautomation/
├── app/
│   ├── api/sheets/route.ts      # Google Sheets API 엔드포인트
│   ├── globals.css              # soft-pop 테마 CSS 변수
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 메인 페이지
├── components/
│   ├── DataTable.tsx            # 테이블 컴포넌트 (복사 기능 포함)
│   ├── Pagination.tsx           # 페이지네이션
│   ├── Search.tsx               # 검색 컴포넌트
│   └── ui/                      # shadcn 컴포넌트
├── hooks/
│   └── useSheetData.ts          # 데이터 fetching hook
├── lib/
│   ├── sheets.ts                # Google Sheets 연동 로직
│   └── utils.ts                 # 유틸리티 함수
└── package.json
```

## 라이선스

© 2024 GDRB. All rights reserved.
