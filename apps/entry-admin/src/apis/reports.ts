import axios from 'axios';
import { ReportInfo } from '@entry/types';

// 지원서 목록 조회
export const fetchApplicants = async (): Promise<ReportInfo[]> => {
  const reponse = await axios.get<ReportInfo[]>('/reports');
  return reponse.data;
};

// 지원서 상세 조회
export const fetchApplicantDetails = async (reportId: number) => {
  const reponse = await fetch(`/reports/${reportId}`);
  if (!reponse.ok) {
    throw new Error('지원서 조회 실패ㅜ');
  }
  return reponse.json();
};
