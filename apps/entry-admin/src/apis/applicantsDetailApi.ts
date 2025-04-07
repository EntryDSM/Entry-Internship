import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { instance } from './instance';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { ReportDetailInfo } from '@entry/types';

export const fetchApplicantDetails = async (
  reportId: number,
  token: string
): Promise<ReportDetailInfo> => {
  const { data } = await instance.get(`/reports/${reportId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useApplicantDetailsApi = (
  reportId: number | null
): UseQueryResult<ReportDetailInfo, Error> => {
  const [cookies] = useCookies(['accessToken']);

  const query = useQuery<ReportDetailInfo, Error>({
    queryKey: ['applicantDetails', reportId],
    queryFn: () =>
      reportId !== null
        ? fetchApplicantDetails(reportId, cookies.accessToken)
        : Promise.reject('유효하지 않은 지원서ID 입니다.'),
    enabled: reportId !== null,
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log('지원자 상세 데이터 불러오기 성공:', query.data);
    } else if (query.isError) {
      console.error('지원자 상세 데이터를 불러오는데 실패함:', query.error);
      alert('지원자 상세 데이터를 불러오는데 실패하였습니다.');
    }
  }, [query.status, query.data, query.error, query.isSuccess, query.isError]);

  return query;
};
