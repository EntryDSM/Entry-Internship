import { instance } from './instance';
import { useCookies } from 'react-cookie';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { useEffect } from 'react';

export interface ReportData {
  reportId: number;
  applicantName?: string;
  applicationName?: string; // 서버 응답에 따라 둘 중 하나를 사용할 수 있음
  studentId: string;
  phoneNumber?: string;
  programmingExperience?: string;
  major?: string;
  motivation?: string;
  selfIntroduction?: string;
}

export interface ReportSummary {
  reportId: number;
  applicantName: string;
  studentId: string;
}

const fetchReportDetail = async (
  reportId: number,
  token: string
): Promise<ReportData> => {
  const url = `/reports/${reportId}`;
  console.log(`요청 URL: ${url}`);
  console.log(`토큰: ${token ? '존재함' : '없음'}`);
  
  try {
    const { data } = await instance.get<ReportData>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    console.error(`API 요청 실패 (${url}):`, error);
    console.error('응답 데이터:', error.response?.data);
    console.error('상태 코드:', error.response?.status);
    throw error;
  }
};

// 지원서 상세 정보 조회 (ApplicantDashboard.tsx에서 사용 중인 함수명)
export const useApplicantDetailsApi = (
  reportId: number
): UseQueryResult<ReportData, Error> => {
  const [cookies] = useCookies(['accessToken']);
  
  console.log('쿠키에서 가져온 accessToken:', cookies.accessToken ? '존재함' : '없음');
  

  const query = useQuery<ReportData, Error>({
    queryKey: ['reportDetail', reportId],
    queryFn: () => fetchReportDetail(reportId, cookies.accessToken),
    enabled: !!reportId,
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log(
        `✅ 지원서 #${reportId} 상세 정보 불러오기 성공:`,
        query.data
      );
    } else if (query.isError) {
      console.error(
        `❌ 지원서 #${reportId} 상세 정보 불러오기 실패:`,
        query.error
      );
      console.error('실패 세부 내용:', JSON.stringify(query.error));
      alert('지원서 상세 정보를 불러오는데 실패하였습니다.');
    }
  }, [
    query.data,
    query.status,
    query.error,
    query.isSuccess,
    query.isError,
    reportId,
  ]);

  return query;
};

const fetchAllReports = async (token: string): Promise<ReportSummary[]> => {
  const { data } = await instance.get<ReportSummary[]>('/reports', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useAllReportsQuery = () => {
  const [cookies] = useCookies(['accessToken']);

  return useQuery({
    queryKey: ['reports'],
    queryFn: () => fetchAllReports(cookies.accessToken),
    onSuccess: (data) => {
      console.log('✅ 지원서 목록 불러오기 성공:', data);
    },
    onError: (error) => {
      console.error('❌ 지원서 목록 불러오기 실패:', error);
      alert('지원서 목록을 불러오는 데 실패했습니다.');
    },
  });
};