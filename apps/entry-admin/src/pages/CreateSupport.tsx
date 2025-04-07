import { CheckContents, Title, KeyWord } from '../components';
import { Inputs, Label, Button, InputTextArea, SubBtn } from '@entry/ui';
import { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';

export const CreateSupport = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [keywordValue, setKeywordValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isImportant, setIsImportant] = useState<boolean>(false);
  const noticeId = crypto.randomUUID();
  const [datas, setDatas] = useState<{
    noticeId: string;
    title: string;
    keyword: string[];
    imgUrl: string;
    areaInput: { valueInput: string; valueArea: string }[];
    checkbox: { focused: boolean; important: boolean };
  }>({
    noticeId: noticeId,
    title: '',
    keyword: [],
    imgUrl: '',
    areaInput: [
      {
        valueInput: '',
        valueArea: '',
      },
    ],
    checkbox: { focused: isFocused, important: isImportant },
  });

  const completedClick = () => {
    console.log('작성 완료 데이터:', datas);
  };

  const imgBtnClick = () => {
    if (fileRef.current) {
      fileRef.current.showPicker();
    }
  };

  const handleImgChange = () => {
    const files = fileRef.current?.files;
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      console.log('Selected file URL:', url);
    }
  };

  const areaInputAddClick = () => {
    setDatas((prev) => ({
      ...prev,
      areaInput: [...prev.areaInput, { valueInput: '', valueArea: '' }],
    }));
  };

  const handleInputChange = (index: number, value: string) => {
    setDatas((prev) => {
      const updatedAreaInput = [...prev.areaInput];
      updatedAreaInput[index] = {
        ...updatedAreaInput[index],
        valueInput: value,
      };
      return {
        ...prev,
        areaInput: updatedAreaInput,
      };
    });
  };

  const handleTextAreaChange = (index: number, value: string) => {
    setDatas((prev) => {
      const updatedAreaInput = [...prev.areaInput];
      updatedAreaInput[index] = {
        ...updatedAreaInput[index],
        valueArea: value,
      };
      return {
        ...prev,
        areaInput: updatedAreaInput,
      };
    });
  };

  const handleAreaInputDelete = (index: number) => {
    setDatas((prev) => {
      const updatedAreaInput = [...prev.areaInput];
      updatedAreaInput.splice(index, 1);
      return {
        ...prev,
        areaInput: updatedAreaInput,
      };
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setDatas((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const enterKeyWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordValue) {
      console.log('입력된 키워드:', keywordValue);
      const value = keywordValue;
      setDatas((prev) => ({
        ...prev,
        keyword: [...prev.keyword, value],
      }));
      setKeywordValue('');
    }
  };

  useEffect(() => {
    setDatas((prev) => ({
      ...prev,
      checkbox: { focused: isFocused, important: isImportant },
    }));
  }, [isFocused, isImportant]);

  return (
    <CreateSupportContainer>
      <TitleContainer>
        <Title
          mainTitle="지원페이지 제작하기"
          subTitle="신청 페이지를 만들 수 있어요"
        />
        <InputContainer>
          <Inputs
            label="제목"
            value={datas.title}
            onChange={handleTitleChange}
          />
          <Inputs
            label="키워드"
            onKeyUp={enterKeyWord}
            value={keywordValue}
            onChange={(e) => setKeywordValue(e.target.value)}
          />
          <KeyWordContainer>
            {datas.keyword.map((item, index) => (
              <KeyWord key={index}>{item}</KeyWord>
            ))}
          </KeyWordContainer>
          <ImgAllContainer>
            <Label label="타이틀 사진" />
            <ImgContainer>
              <ImgBtnContainer>
                <Button isAdmin={true} onClick={imgBtnClick} />
              </ImgBtnContainer>
              {datas.imgUrl && <KeyWord>{datas.imgUrl}</KeyWord>}
            </ImgContainer>
            <FakeInput type="file" ref={fileRef} onChange={handleImgChange} />
          </ImgAllContainer>
          <>
            {datas.areaInput.map((item, index) => (
              <InputTextAreaContainer key={index}>
                <InputTextArea
                  label={`설명(${index + 1})`}
                  inputChange={(e) => handleInputChange(index, e.target.value)}
                  areaChange={(e) =>
                    handleTextAreaChange(index, e.target.value)
                  }
                  valueInput={item.valueInput}
                  valueArea={item.valueArea}
                />
                <DeleteButton onClick={() => handleAreaInputDelete(index)}>
                  삭제
                </DeleteButton>
              </InputTextAreaContainer>
            ))}
            <Button isAdmin={true} onClick={areaInputAddClick} />
          </>
        </InputContainer>
        <CheckContainer>
          <CheckBoxContainer>
            <CheckContents
              label="집중채용"
              setIsCheck={setIsFocused}
              isCheck={isFocused}
            />
            <CheckContents
              label="중요"
              setIsCheck={setIsImportant}
              isCheck={isImportant}
            />
          </CheckBoxContainer>
          <SubBtn userType="admin" onClick={completedClick}>
            작성완료
          </SubBtn>
        </CheckContainer>
      </TitleContainer>
    </CreateSupportContainer>
  );
};

const InputTextAreaContainer = styled.div`
  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: #ff4d4f;
  background-color: white;
  border: none;
  font-weight: bold;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background-color: #ee6e6e;
    color: white;
  }
`;

const CreateSupportContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 120px 0;

  @media (max-width: 1024px) {
    margin: 80px 0;
  }

  @media (max-width: 768px) {
    margin: 60px 0;
    padding: 0 16px;
  }
`;

const KeyWordContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    justify-content: center;
  }
`;

const CheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media (max-width: 1024px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    gap: 20px;
    align-items: center;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 116px;

  @media (max-width: 1024px) {
    gap: 80px;
  }

  @media (max-width: 768px) {
    gap: 50px;
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ImgBtnContainer = styled.div`
  width: 200px;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const InputContainer = styled.div`
  width: 702px;
  display: flex;
  flex-direction: column;
  gap: 63px;

  @media (max-width: 1024px) {
    width: 90%;
    gap: 50px;
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 40px;
  }
`;

const ImgAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const FakeInput = styled.input`
  display: none;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 16px;
    justify-content: center;
  }
`;
