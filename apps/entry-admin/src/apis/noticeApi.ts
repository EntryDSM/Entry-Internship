import { instance } from './instance';
import { useCookies } from 'react-cookie';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { CareerItemDetailProps } from '@entry/types';
import { useEffect } from 'react';

// 타입 정의
export interface NoticeData {
  title: string;
  keyWord: string[];
  titleImageUrl: string;
  description: { title: string; content: string }[];
  focusRecruit: boolean;
  important: boolean;
}

export interface EditNoticeData extends NoticeData {
  noticeId: number;
}

// 모든 공고 목록 가져오기
const fetchNotices = async (token: string) => {
  const { data } = await instance.get('/notices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useNoticesQuery = () => {
  const [cookies] = useCookies(['accessToken']);

  return useQuery({
    queryKey: ['notices'],
    queryFn: () => fetchNotices(cookies.accessToken),
    onSuccess: (data) => {
      console.log('✅ 공고 목록 불러오기 성공:', data);
    },
    onError: (error) => {
      console.error('❌ 공고 목록 불러오기 실패:', error);
      alert('공고 목록을 불러오는 데 실패했습니다.');
    },
  });
};

// 단일 공고 상세 정보 가져오기
const fetchNoticeDetail = async (
  noticeId: number,
  token: string
): Promise<CareerItemDetailProps> => {
  const { data } = await instance.get<CareerItemDetailProps>(
    `/notices/${noticeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useNoticeDetailQuery = (
  noticeId: number
): UseQueryResult<CareerItemDetailProps, Error> => {
  const [cookies] = useCookies(['accessToken']);

  const query = useQuery<CareerItemDetailProps, Error>({
    queryKey: ['noticeDetail', noticeId],
    queryFn: () => fetchNoticeDetail(noticeId, cookies.accessToken),
    enabled: !!noticeId,
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log(`✅ 공고 #${noticeId} 상세 정보 불러오기 성공:`, query.data);
    } else if (query.isError) {
      console.error(
        `❌ 공고 #${noticeId} 상세 정보 불러오기 실패:`,
        query.error
      );
      alert('공고 상세 정보를 불러오는데 실패하였습니다.');
    }
  }, [
    query.data,
    query.status,
    query.error,
    query.isSuccess,
    query.isError,
    noticeId,
  ]);

  return query;
};

// 공고 생성
const createNotice = async (noticeData: NoticeData, token: string) => {
  const { data } = await instance.post('/notices', noticeData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return data;
};

export const useCreateNoticeMutation = () => {
  const [cookies] = useCookies(['accessToken']);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noticeData: NoticeData) =>
      createNotice(noticeData, cookies.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      console.log('✅ 공고 생성 성공!');
    },
    onError: (error) => {
      console.error('❌ 공고 생성 실패:', error);
      alert('공고를 생성하는 데 실패했습니다.');
    },
  });
};

// 공고 수정
const editNotice = async (noticeData: EditNoticeData, token: string) => {
  const { data } = await instance.post('/notices', noticeData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return data;
};

export const useEditNoticeMutation = () => {
  const [cookies] = useCookies(['accessToken']);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noticeData: EditNoticeData) =>
      editNotice(noticeData, cookies.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      queryClient.invalidateQueries({ queryKey: ['noticeDetail'] });
      console.log('✅ 공고 수정 성공!');
    },
    onError: (error) => {
      console.error('❌ 공고 수정 실패:', error);
      alert('공고를 수정하는 데 실패했습니다.');
    },
  });
};

// 공고 삭제
const deleteNotice = async (noticeId: number, token: string): Promise<void> => {
  await instance.delete(`/notices/${noticeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const useDeleteNoticeMutation = () => {
  const [cookies] = useCookies(['accessToken']);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noticeId: number) =>
      deleteNotice(noticeId, cookies.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      console.log('✅ 공고 삭제 성공!');
    },
    onError: (error) => {
      console.error('❌ 공고 삭제 실패:', error);
      alert('공고를 삭제하는 데 실패했습니다.');
    },
  });
};
