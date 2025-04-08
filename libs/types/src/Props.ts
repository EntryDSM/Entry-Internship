// 공고 전체 조회
export interface CareerItemProps {
  noticeId: number;
  title: string;
  keyWord: string[];
  isFocusRecruit: boolean;
  isImportant: boolean;
  onclick?:
}

// 공고 상세 조회
export interface CareerItemDetailProps extends CareerItemProps {
  titleImageUrl: string;
  description: DescriptionItem[];
}

// 지원 조건
export interface DescriptionItem {
  title: string;
  content: string;
}

// 지원서
export interface ReportInfo {
  reportId: number;
  applicationName: string;
  studentId: string;
}

// 지원서 상세 조회
export interface ReportDetailInfo {
  reportId: number;
  applicationName: string; // 이름
  studentId: string;
  phoneNumber: string; // "01041374208"
  programmingExperience: string; // VERY_GOOD, GOOD, AVERAGE, POOR, VERY_POOR
  major: string; // FRONTEND, DEVOPS, BACKEND, DESIGN
  motivation: string; // 지원동기
  selfIntroduction: string;
}
