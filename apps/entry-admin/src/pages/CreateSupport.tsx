import { CheckContents, Title, KeyWord } from '../components';
import { Inputs, Label, Button, InputTextArea, SubBtn } from '@entry/ui';
import { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useCreateNoticeMutation } from '../apis';

export const CreateSupport = () => {
  const navigate = useNavigate();
  const createNoticeMutation = useCreateNoticeMutation();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [keywordValue, setKeywordValue] = useState<string>('');
  const [isFocusRecruit, setIsFocusRecruit] = useState<boolean>(false);
  const [isImportant, setIsImportant] = useState<boolean>(false);
  const [titleImageUrl, setTitleImageUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<{ title: string; content: string }[]>([
    { title: '', content: '' }
  ]);

  const handleSubmit = () => {
    // 필수 필드 검증
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (keyWords.length < 1) {
      alert('키워드를 최소 1개 이상 입력해주세요.');
      return;
    }
    
    if (!titleImageUrl) {
      alert('타이틀 이미지를 업로드해주세요.');
      return;
    }

    // API에 필요한 형태로 데이터 구성
    const noticeData = {
      title,
      keyWord: keyWords,
      titleImageUrl,
      description: descriptions.filter(desc => desc.title.trim() !== '' && desc.content.trim() !== ''),
      focusRecruit: isFocusRecruit,
      important: isImportant
    };

    console.log('제출할 데이터:', noticeData);

    // API 호출
    createNoticeMutation.mutate(noticeData, {
      onSuccess: () => {
        alert('공고가 성공적으로 등록되었습니다.');
        navigate('/admin/job-status');
      }
    });
  };

  const imgBtnClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleImgChange = () => {
    const files = fileRef.current?.files;
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setTitleImageUrl(url);
      console.log('Selected file URL:', url);

      // 실제 API 연동 시에는 파일 업로드 로직이 필요합니다.
      // 이 예제에서는 로컬 URL을 사용합니다.
    }
  };

  const addDescription = () => {
    setDescriptions(prev => [...prev, { title: '', content: '' }]);
  };

  const handleInputChange = (index: number, value: string) => {
    setDescriptions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], title: value };
      return updated;
    });
  };

  const handleTextAreaChange = (index: number, value: string) => {
    setDescriptions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], content: value };
      return updated;
    });
  };

  const handleDescriptionDelete = (index: number) => {
    if (descriptions.length > 1) {
      setDescriptions(prev => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    } else {
      alert('최소 1개의 설명이 필요합니다.');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const enterKeyWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordValue.trim()) {
      if (!keyWords.includes(keywordValue.trim())) {
        setKeyWords(prev => [...prev, keywordValue.trim()]);
        setKeywordValue('');
      } else {
        alert('이미 추가된 키워드입니다.');
      }
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeyWords(prev => prev.filter(keyword => keyword !== keywordToRemove));
  };

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
            value={title}
            onChange={handleTitleChange}
          />
          <Inputs
            label="키워드"
            onKeyUp={enterKeyWord}
            value={keywordValue}
            onChange={(e) => setKeywordValue(e.target.value)}
            placeholder="엔터 키를 눌러 키워드를 추가하세요"
          />
          <KeyWordContainer>
            {keyWords.map((keyword, index) => (
              <KeywordItem key={index} onClick={() => removeKeyword(keyword)}>
                <KeyWord>{keyword}</KeyWord>
              </KeywordItem>
            ))}
          </KeyWordContainer>
          <ImgAllContainer>
            <Label label="타이틀 사진" />
            <ImgContainer>
              <ImgBtnContainer>
                <Button isAdmin={true} onClick={imgBtnClick}>
                  이미지 업로드
                </Button>
              </ImgBtnContainer>
              {titleImageUrl && (
                <ImagePreviewContainer>
                  <ImagePreview src={titleImageUrl} alt="미리보기" />
                </ImagePreviewContainer>
              )}
            </ImgContainer>
            <FakeInput type="file" ref={fileRef} onChange={handleImgChange} accept="image/*" />
          </ImgAllContainer>
          <>
            {descriptions.map((item, index) => (
              <InputTextAreaContainer key={index}>
                <InputTextArea
                  label={`설명(${index + 1})`}
                  inputChange={(e) => handleInputChange(index, e.target.value)}
                  areaChange={(e) => handleTextAreaChange(index, e.target.value)}
                  valueInput={item.title}
                  valueArea={item.content}
                />
                {descriptions.length > 1 && (
                  <DeleteButton onClick={() => handleDescriptionDelete(index)}>
                    삭제
                  </DeleteButton>
                )}
              </InputTextAreaContainer>
            ))}
            <AddButtonContainer>
              <Button isAdmin={true} onClick={addDescription}>
                설명 추가하기
              </Button>
            </AddButtonContainer>
          </>
        </InputContainer>
        <CheckContainer>
          <CheckBoxContainer>
            <CheckContents
              label="집중채용"
              setIsCheck={setIsFocusRecruit}
              isCheck={isFocusRecruit}
            />
            <CheckContents
              label="중요"
              setIsCheck={setIsImportant}
              isCheck={isImportant}
            />
          </CheckBoxContainer>
          <SubBtn userType="admin" onClick={handleSubmit}>
            작성완료
          </SubBtn>
        </CheckContainer>
      </TitleContainer>
    </CreateSupportContainer>
  );
};

const ImagePreviewContainer = styled.div`
  margin-top: 10px;
  width: 200px;
  height: 120px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const KeywordItem = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const AddButtonContainer = styled.div`
  margin-top: 20px;
  width: 200px;
`;

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
  flex-direction: column;
  gap: 28px;

  @media (max-width: 768px) {
    gap: 16px;
    align-items: center;
  }
`;
