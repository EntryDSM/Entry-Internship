import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { kebabIcon } from '@entry/ui';
import { useModal } from '@entry/hooks';
import { CareerItemProps } from '@entry/types';
import { useDeletePostApi } from '../../apis';

type CareerITemType = Pick<
  CareerItemProps,
  'noticeId' | 'title' | 'isFocusRecruit' | 'isImportant' | 'keyWord'
>;

export const CareerItem = ({
  noticeId,
  title,
  isFocusRecruit,
  isImportant,
  keyWord,
}: CareerITemType) => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const deletePostMutation = useDeletePostApi();

  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  const handleKebabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowDelete(!showDelete);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowDelete(false);
    openModal();
  };

  const handleConfirmDelete = async () => {
    console.log(`공고${noticeId} 삭제 시작`);
    deletePostMutation.mutate(noticeId, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropMenuRef.current &&
        !dropMenuRef.current.contains(event.target as Node)
      ) {
        setShowDelete(false);
      }
    };

    if (showDelete) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDelete]);

  return (
    <>
      <CarrerItemContainer onClick={() => navigate(`/job-status/${noticeId}`)}>
        <Top>
          <ListItemContent>{title}</ListItemContent>
          <ImportantList>
            {isFocusRecruit && <Focus>집중채용</Focus>}
            {isImportant && <Important>중요</Important>}
          </ImportantList>
          <KebabContainer ref={dropMenuRef}>
            <KebabMenu onClick={handleKebabClick}>
              <img src={kebabIcon} alt=":" />
            </KebabMenu>
            {showDelete && (
              <DropMenu>
                <DropDelete onClick={handleDeleteClick}>삭제</DropDelete>
              </DropMenu>
            )}
          </KebabContainer>
        </Top>
        <TagsContainer>
          <TechStack>
            {keyWord.map((tag, index) => (
              <TechTag key={index}>{tag}</TechTag>
            ))}
          </TechStack>
        </TagsContainer>
      </CarrerItemContainer>

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>삭제 확인</ModalTitle>
            <ModalDescription>정말로 삭제하시겠습니까?</ModalDescription>
            <ModalActions>
              <CancelButton onClick={closeModal}>취소</CancelButton>
              <ConfirmButton onClick={handleConfirmDelete}>삭제</ConfirmButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const CancelButton = styled.button`
  background-color: ${colors.gray[200]};
  color: ${colors.gray[600]};
  border: none;
  padding: 8px;
  margin-right: 8px;
  width: 20%;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c8c5c5;
  }
`;

const ConfirmButton = styled.button`
  background-color: #ff8484;
  color: white;
  border: none;
  width: 20%;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e27f7f;
  }
`;

const DropMenu = styled.div`
  position: absolute;
  right: -110px;
  top: 50%;
  background: white;
  text-align: center;
  color: #a1a0a0;
  border: 1px solid #a1a0a0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  z-index: 20;
`;

const DropDelete = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: ${colors.gray[600]};
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray[100]};
    color: #ff8484;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 400px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.gray[800]};
  margin-bottom: 16px;
`;

const ModalDescription = styled.p`
  font-size: 14px;
  color: ${colors.extra.error};
  font-weight: bold;
  text-align: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const KebabContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

const KebabMenu = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  img {
    width: 25px;
    height: 25px;
  }
`;

const TagsContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const TechStack = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const TechTag = styled.div`
  color: ${colors.gray[600]};
  font-size: 12px;
  font-weight: 500;
`;

const Focus = styled.div`
  width: 60px;
  height: 22px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc9c9;
  color: #ff6666;
  border-radius: 15px;
`;

const Important = styled.div`
  width: 60px;
  height: 22px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9eaeff;
  color: #002fff;
  border-radius: 15px;
`;

const ImportantList = styled.div`
  display: flex;
  font-size: 11px;
  gap: 10px;
  font-weight: bold;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 2%;
  gap: 9px;
`;

const ListItemContent = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.extra.black};
  font-weight: bold;
`;

const CarrerItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  border-radius: 15px;
  transition: all 0.2s ease-in-out;
  min-height: 120px;
  flex-direction: column;
  width: 100%;
  min-width: 335px;

  &:hover {
    background-color: #f1f1f1;
    transform: translateY(-2px);
  }
`;
