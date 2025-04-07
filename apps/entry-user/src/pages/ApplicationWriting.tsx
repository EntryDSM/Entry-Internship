import { Title, CheckContents } from '../components';
import styled from '@emotion/styled';
import { Inputs, TextAreas, Radios, SubBtn } from '@entry/ui';
import { useEffect, useState } from 'react';
import { applicationWritingApi } from '../apis';
import { useParams } from 'react-router-dom';

export const ApplicationWriting = () => {
  const { id } = useParams();
  const noticeId = id ? parseInt(id) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    const value = e.target.value;
    setdatas((prev) => ({
      ...prev,
      inputDatas: prev.inputDatas.map((data) =>
        data.label === label ? { ...data, value } : data
      ),
    }));
  };

  const handleAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    label: string
  ) => {
    const value = e.target.value;
    setdatas((prev) => ({
      ...prev,
      areaDatas: prev.areaDatas.map((data) =>
        data.label === label ? { ...data, value } : data
      ),
    }));
  };

  const [datas, setdatas] = useState<{
    noticeId: number;
    inputDatas: [
      { label: string; value: string },
      { label: string; value: string; datas: [{ label: string }] },
      { label: string; value: string }
    ];
    radioDatas: [
      {
        label: string;
        value: string;
        datas: [{ label: string; name: string }];
      },
      {
        label: string;
        value: string;
        datas: [{ label: string; name: string }];
      },
      {
        label: string;
        value: string;
        datas: [{ label: string; name: string }];
      }
    ];
    areaDatas: [
      { label: string; value: string },
      { label: string; value: string; datas: [{ label: string }] },
      { label: string; value: string }
    ];
  }>({
    noticeId: noticeId,
    inputDatas: [
      { label: '이름', value: '' },
      { label: '학번', value: '' },
      { label: '전화번호', value: '' },
    ],
    radioDatas: [
      {
        label: '프로그래밍 경력',
        value: '',
        datas: [
          { label: '매우 잘함', name: 'VERY_GOOD' },
          { label: '잘함', name: 'GOOD' },
          { label: '보통', name: 'AVERAGE' },
          { label: '못함', name: 'POOR' },
          { label: '매우못함', name: 'VERY_POOR' },
        ],
      },
      {
        label: '전공',
        value: '',
        datas: [
          { label: 'Frontend', name: 'FRONTEND' },
          { label: 'Backend', name: 'BACKEND' },
          { label: 'DevOps', name: 'DEVOPS' },
          { label: 'Design', name: 'DESIGN' },
        ],
      },
    ],
    areaDatas: [
      { label: '지원동기', value: '' },
      { label: '자기소개', value: '' },
    ],
  });

  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  useEffect(() => {
    if (
      datas.areaDatas[0].value === '' ||
      datas.areaDatas[1].value === '' ||
      datas.inputDatas[0].value === '' ||
      datas.inputDatas[1].value === '' ||
      datas.inputDatas[2].value === '' ||
      datas.radioDatas[0].value === '' ||
      datas.radioDatas[1].value === ''
    ) {
      setIsBlocked(true);
    } else {
      setIsBlocked(false);
    }
  }, [datas]);

  const handleRadioChange = (label: string, selectedValue: string) => {
    setdatas((prev) => ({
      ...prev,
      radioDatas: prev.radioDatas.map((radio) =>
        radio.label === label
          ? {
              ...radio,
              value:
                radio.datas.find((data) => data.label === selectedValue)
                  ?.name || '',
            }
          : radio
      ),
    }));
  };

  const apiSubmit = applicationWritingApi();

  const submitClick = () => {
    const payload = {
      noticeId: noticeId,
      applicantName: datas.inputDatas[0].value,
      studentId: datas.inputDatas[1].value,
      phoneNumber: datas.inputDatas[2].value,
      programmingExperience: datas.radioDatas[0].value,
      major: datas.radioDatas[1].value,
      motivation: datas.areaDatas[0].value,
      selfIntroduction: datas.areaDatas[1].value,
    };

    console.log('🔥 최종 제출 데이터:', payload);

    apiSubmit.mutate(payload);
  };

  console.log(datas);

  return (
    <WritingContainer>
      <MainContainer>
        <Title mainTitle="지원서 작성하기" />
        <InputContainer>
          {datas.inputDatas.map((data) => {
            return (
              <Inputs
                isWrite={false}
                label={data.label}
                value={data.value}
                onChange={(e) => handleInputChange(e, data.label)}
              />
            );
          })}
          {datas.radioDatas.map((data) => {
            return (
              <Radios
                label={data.label}
                isWrite={false}
                userType={'user'}
                name={data.label}
                datas={data.datas}
                onRadioChange={(selectedValue) =>
                  handleRadioChange(data.label, selectedValue)
                }
              />
            );
          })}
          {datas.areaDatas.map((data) => {
            return (
              <TextAreas
                isWrite={false}
                label={data.label}
                value={data.value}
                onChange={(e) => handleAreaChange(e, data.label)}
              />
            );
          })}
        </InputContainer>
        <SubContainer>
          <CheckContents
            label="(필수) 저는 개인정보 수집 및 이용에 동의합니다."
            setIsCheck={setIsCheck}
            isCheck={isCheck}
          />
          <SubBtn isBlocked={isBlocked} userType="user" onClick={submitClick}>
            제출하기
          </SubBtn>
        </SubContainer>
      </MainContainer>
    </WritingContainer>
  );
};

const WritingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 180px 0;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: start;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 702px;
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
  margin: 116px 0 76px 0;
`;
