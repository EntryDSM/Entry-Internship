import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ApplicantList } from '../components/';
import { ReportInfo } from '@entry/types';
import axios from 'axios';

export const ApplicationStatus = () => {
  const [applicants, setApplicants] = useState<ReportInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ReportInfo[]>('/reports');
        setApplicants(response.data);
      } catch (err) {
        console.error('지워자 목록을 불러오는 중 오류가 발생했습니다.', err);
        setError('지원자 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <JobStatusContainer>
      {applicants.length > 0 ? (
        <>
          {applicants.map((info) => (
            <ApplicantList
              key={info.reportId}
              reportId={info.reportId}
              applicationName={info.applicationName}
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
