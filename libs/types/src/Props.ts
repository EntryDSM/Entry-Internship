// 공고 상세 조회
export interface CareerItemProps {
  noticeId: number;
  title: string;
  keyWord: string[];
  titleImageUrl: string;
  description: DescriptionItem[];
  isFocusRecruit: boolean;
  isImportant: boolean;
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
  phoneNumber: string;
  programmingExperience: string; // VERY_GOOD, GOOD, AVERAGE, POOR, VERY_POOR
  major: string; // FRONTEND, DEVOPS, BACKEND, DESIGN
  motivation: string;
  selfIntroduction: string;
}
