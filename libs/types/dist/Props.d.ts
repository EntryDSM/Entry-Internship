export interface CareerItemProps {
    noticeId: number;
    title: string;
    keyWord: string[];
    isFocusRecruit: boolean;
    isImportant: boolean;
    onclick?: () => void;
}
export interface CareerItemDetailProps extends CareerItemProps {
    titleImageUrl: string;
    description: DescriptionItem[];
}
export interface DescriptionItem {
    title: string;
    content: string;
}
export interface ReportInfo {
    reportId: number;
    applicationName: string;
    studentId: string;
}
export interface ReportDetailInfo {
    reportId: number;
    applicationName: string;
    studentId: string;
    phoneNumber: string;
    programmingExperience: string;
    major: string;
    motivation: string;
    selfIntroduction: string;
}
//# sourceMappingURL=Props.d.ts.map