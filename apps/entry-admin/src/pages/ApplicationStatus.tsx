import styled from '@emotion/styled';
import { ApplicantList } from '../components';
import { useAllReportsQuery } from '../apis/applicantApi';

export const ApplicationStatus = () => {
  const { data: applicants = [], isLoading, isError } = useAllReportsQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>지원자 정보를 불러올 수 없습니다.</div>;

  return (
    <JobStatusContainer>
      {applicants.length > 0 ? (
        <>
          {applicants.map((info) => (
            <ApplicantList
              key={info.reportId}
              reportId={info.reportId}
              applicationName={info.applicantName}
              studentId={info.studentId}
            />
          ))}
        </>
      ) : (
        <div>지원자가 없습니다</div>
      )}
    </JobStatusContainer>
  );
};

const JobStatusContainer = styled.div`
  width: 100vw;
  height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding-top: 100px;
`;
