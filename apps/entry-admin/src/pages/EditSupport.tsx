import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Inputs, InputTextArea, SubBtn } from '@entry/ui';
import { Title } from '../components';
import { useEditSupport } from '../apis';

// EditSupport 인터페이스 정의
export interface EditSupport {
  noticeId: number;
  applicationName: string;
  studentId: string;
  phoneNumber: string;
  programmingExperience: string; // VERY_GOOD, GOOD, AVERAGE, POOR, VERY_POOR
  major: string; // FRONTEND, DEVOPS, BACKEND, DESIGN
  motivation: string;
  selfIntroduction: string;
}

export const EditSupport = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [datas, setDatas] = useState<EditSupport>({
    noticeId: 1,
    applicationName: '엔트리 인턴 모집',
    studentId: '',
    phoneNumber: '',
    programmingExperience: 'GOOD',
    major: 'FRONTEND',
    motivation: '',
    selfIntroduction: '',
  });

  const editSupportMutation = useEditSupport();

  const handleEditClick = () => {
    editSupportMutation.mutate(datas);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDatas((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <EditSupportContainer>
      <TitleContainer>
        <Title
          mainTitle="지원페이지 수정하기"
          subTitle="신청 페이지를 수정할 수 있어요"
        />
        <InputContainer>
          {/* 신청 이름 */}
          <Inputs
            label="제목"
            value={datas.applicationName}
            onChange={handleInputChange}
          />

          {/* 학생 ID */}
          <Inputs
            label="학생 ID"
            value={datas.studentId}
            onChange={handleInputChange}
          />

          {/* 전화번호 */}
          <Inputs
            label="전화번호"
            value={datas.phoneNumber}
            onChange={handleInputChange}
          />

          {/* 프로그래밍 경험 */}
          <Inputs
            label="프로그래밍 경험"
            value={datas.programmingExperience}
            onChange={handleInputChange}
          />

          {/* 전공 */}
          <Inputs
            label="전공"
            value={datas.major}
            onChange={handleInputChange}
          />

          {/* 동기 */}
          <InputTextArea
            label="지원 동기"
            valueArea={datas.motivation}
            areaChange={(e) => handleInputChange(e)}
          />

          {/* 자기소개 */}
          <InputTextArea
            label="자기소개"
            valueArea={datas.selfIntroduction}
            areaChange={(e) => handleInputChange(e)}
          />
        </InputContainer>

        {/* 수정 완료 버튼 */}
        <SubBtn userType="admin" onClick={handleEditClick}>
          수정완료
        </SubBtn>
      </TitleContainer>
    </EditSupportContainer>
  );
};

const EditSupportContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 180px 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 116px;
`;

const InputContainer = styled.div`
  width: 702px;
  display: flex;
  flex-direction: column;
  gap: 63px;
`;
