import styled from '@emotion/styled';
import { useState } from 'react';
import { ApplicantList } from '../components/';
import { ReportInfo } from '@entry/types';

export const ApplicationStatus = () => {
  const [users, setUsers] = useState<ReportInfo[]>([
    {
      reportId: 1,
      applicationName: '박지연',
      studentId: '20230001',
      phoneNumber: '010-1234-5678',
      programmingExperience: 'VERY_GOOD', // VERY_GOOD, GOOD, AVERAGE, POOR, VERY_POOR
      major: 'FRONTEND', // FRONTEND, DEVOPS, BACKEND, DESIGN
      motivation: '프론트엔드 개발에 관심이 많습니다.',
      selfIntroduction: '안녕하세요! 저는 열정적인 개발자입니다.',
    },
    {
      reportId: 2,
      applicationName: '최민수',
      studentId: '20230002',
      phoneNumber: '010-2345-6789',
      programmingExperience: 'GOOD',
      major: 'BACKEND',
      motivation: '백엔드 시스템 구축에 흥미를 느낍니다.',
      selfIntroduction: '저는 성실하고 책임감 있는 개발자로 성장하고 싶습니다.',
    },
  ]);

  return (
    <JobStatusContainer>
      {users.length > 0 ? (
        <>
          {users.map((info) => (
            <ApplicantList
              key={info.reportId}
              reportId={info.reportId}
              applicationName={info.applicationName}
              major={info.major}
              programmingExperience={info.programmingExperience}
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
