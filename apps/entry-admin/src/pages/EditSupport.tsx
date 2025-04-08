import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Inputs, InputTextArea, SubBtn } from '@entry/ui';
import { Title } from '../components';
import { useEditSupport, useSupportDetailQuery } from '../apis';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const noticeIdNumber = noticeId ? Number(noticeId) : 0;

  const [datas, setDatas] = useState<EditSupport>({
    noticeId: noticeIdNumber,
    applicationName: '',
    studentId: '',
    phoneNumber: '',
    programmingExperience: 'GOOD',
    major: 'FRONTEND',
    motivation: '',
    selfIntroduction: '',
  });

  // 지원서 상세 정보 조회
  const { data: supportData, isLoading, isError } = useSupportDetailQuery(noticeIdNumber);

  // 데이터 로드 시 폼 데이터 업데이트
  useEffect(() => {
    if (supportData) {
      setDatas({
        noticeId: noticeIdNumber,
        applicationName: supportData.applicationName || '',
        studentId: supportData.studentId || '',
        phoneNumber: supportData.phoneNumber || '',
        programmingExperience: supportData.programmingExperience || 'GOOD',
        major: supportData.major || 'FRONTEND',
        motivation: supportData.motivation || '',
        selfIntroduction: supportData.selfIntroduction || '',
      });
    }
  }, [supportData, noticeIdNumber]);

  const editSupportMutation = useEditSupport();

  const handleEditClick = () => {
    editSupportMutation.mutate(datas, {
      onSuccess: () => {
        // 성공 시 목록 페이지로 이동
        navigate('/admin/support');
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDatas((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <EditSupportContainer>
      {isLoading ? (
        <LoadingContainer>지원서 정보를 불러오는 중입니다...</LoadingContainer>
      ) : isError ? (
        <ErrorContainer>지원서 정보를 불러오는데 실패했습니다.</ErrorContainer>
      ) : (
        <TitleContainer>
          <Title
            mainTitle="지원페이지 수정하기"
            subTitle="신청 페이지를 수정할 수 있어요"
          />
          <InputContainer>
            {/* 신청 이름 */}
            <Inputs
              label="제목"
              name="applicationName"
              value={datas.applicationName}
              onChange={handleInputChange}
            />

            {/* 학생 ID */}
            <Inputs
              label="학생 ID"
              name="studentId"
              value={datas.studentId}
              onChange={handleInputChange}
            />

            {/* 전화번호 */}
            <Inputs
              label="전화번호"
              name="phoneNumber"
              value={datas.phoneNumber}
              onChange={handleInputChange}
            />

            {/* 프로그래밍 경험 선택 */}
            <LabelContainer>
              <InputLabel>프로그래밍 경험</InputLabel>
              <Select
                name="programmingExperience"
                value={datas.programmingExperience}
                onChange={handleInputChange}
              >
                <option value="VERY_GOOD">매우 좋음</option>
                <option value="GOOD">좋음</option>
                <option value="AVERAGE">보통</option>
                <option value="POOR">부족함</option>
                <option value="VERY_POOR">매우 부족함</option>
              </Select>
            </LabelContainer>

            {/* 전공 선택 */}
            <LabelContainer>
              <InputLabel>전공</InputLabel>
              <Select
                name="major"
                value={datas.major}
                onChange={handleInputChange}
              >
                <option value="FRONTEND">프론트엔드</option>
                <option value="BACKEND">백엔드</option>
                <option value="DEVOPS">데브옵스</option>
                <option value="DESIGN">디자인</option>
              </Select>
            </LabelContainer>

            {/* 동기 */}
            <InputTextArea
              label="지원 동기"
              name="motivation"
              valueArea={datas.motivation}
              areaChange={(e) => handleInputChange(e)}
            />

            {/* 자기소개 */}
            <InputTextArea
              label="자기소개"
              name="selfIntroduction"
              valueArea={datas.selfIntroduction}
              areaChange={(e) => handleInputChange(e)}
            />
          </InputContainer>

          {/* 수정 완료 버튼 */}
          <ButtonContainer>
            <CancelButton onClick={() => navigate('/admin/support')}>취소</CancelButton>
            <SubBtn userType="admin" onClick={handleEditClick}>
              수정완료
            </SubBtn>
          </ButtonContainer>
        </TitleContainer>
      )}
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

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #38c278;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f5f5f5;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 18px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 18px;
  color: #ff6666;
`;
