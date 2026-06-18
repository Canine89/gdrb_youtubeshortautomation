import { google } from 'googleapis';
import type { JWTInput } from 'google-auth-library';
import { readFileSync } from 'fs';
import { join } from 'path';

// 환경 변수 또는 하드코딩된 ID 사용
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || '1183q2XyX1QSM8Qs71hERWuCbBbyfBO2F8eN1QOhGSaI';

type GoogleApiError = Error & {
  code?: string | number;
  response?: {
    status?: number;
    data?: {
      error?: {
        message?: string;
      };
    };
  };
};

function normalizeError(error: unknown): GoogleApiError {
  return error instanceof Error
    ? error as GoogleApiError
    : new Error(String(error)) as GoogleApiError;
}

export async function getGoogleSheetsClient() {
  let serviceAccount: JWTInput;
  
  // 환경 변수에서 서비스 계정 정보 가져오기
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  
  if (serviceAccountJson) {
    // 환경 변수가 있으면 사용
    try {
      serviceAccount = JSON.parse(serviceAccountJson) as JWTInput;
    } catch {
      throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON. Make sure it is valid JSON.');
    }
  } else {
    // 환경 변수가 없으면 로컬 파일 읽기 (개발 환경)
    try {
      const filePath = join(process.cwd(), 'service-account-file.json');
      const fileContent = readFileSync(filePath, 'utf-8');
      serviceAccount = JSON.parse(fileContent) as JWTInput;
    } catch (error: unknown) {
      const fileError = normalizeError(error);

      if (fileError.code === 'ENOENT') {
        throw new Error('Service account file not found. Please set GOOGLE_SERVICE_ACCOUNT_JSON environment variable or place service-account-file.json in the project root.');
      }
      throw new Error(`Failed to read service account file: ${fileError.message}`);
    }
  }

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

export async function getSheetData() {
  try {
    const sheets = await getGoogleSheetsClient();
    
    // 시트 목록 가져오기
    const spreadsheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    // 첫 번째 시트 사용
    const sheet = spreadsheetInfo.data.sheets?.[0];

    if (!sheet || !sheet.properties?.title) {
      throw new Error('No sheets found in the spreadsheet');
    }

    const actualSheetName = sheet.properties.title;
    
    // 전체 데이터 가져오기
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: actualSheetName,
    });

    return {
      values: response.data.values || [],
      range: response.data.range || '',
      sheetName: actualSheetName,
    };
  } catch (error: unknown) {
    const sheetError = normalizeError(error);

    console.error('Error fetching sheet data:', sheetError);
    console.error('Error details:', {
      code: sheetError.code,
      message: sheetError.message,
      response: sheetError.response?.data,
    });
    
    // 더 자세한 에러 메시지 제공
    if (sheetError.code === 'ENOENT') {
      throw new Error('Service account file not found');
    } else if (sheetError.code === 403 || sheetError.response?.status === 403) {
      throw new Error('Permission denied. Please check if the service account has access to the spreadsheet.');
    } else if (sheetError.code === 404 || sheetError.response?.status === 404) {
      throw new Error(`Spreadsheet not found. Please check the spreadsheet ID: ${SPREADSHEET_ID}`);
    }
    
    // Google API 에러 처리
    if (sheetError.response?.data?.error) {
      const apiError = sheetError.response.data.error;
      throw new Error(`Google API Error: ${apiError.message || JSON.stringify(apiError)}`);
    }
    
    throw sheetError;
  }
}

