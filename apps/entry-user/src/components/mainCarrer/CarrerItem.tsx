import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { colors } from '@entry/design-token';
import { IconStore } from '@entry/ui';
import { UserType } from '@entry/types';

interface IItemType {
  isAdmin?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  title?: string;
  keyWord?: string[];
  isFocusRecruit?: boolean;
  isImportant?: boolean;
}

export const CarrerItem = ({
  isAdmin,
  onClick,
  title,
  keyWord,
  isFocusRecruit,
  isImportant,
}: IItemType) => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();

  const handleKebabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowDelete(!showDelete);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowDelete(false);
    console.log(`게시글 ${id} 삭제`); // 삭제 api 호출해버려
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
    <CarrerItemContainer onClick={onClick}>
      <Top>
        <ListItemContent>{title}</ListItemContent>
        <ImportantList>
          {isFocusRecruit && <Focus>집중채용</Focus>}{' '}
          {isImportant && <Important>중요</Important>}
        </ImportantList>
        {isAdmin && (
          <KebabContainer ref={dropMenuRef}>
            <KebabMenu onClick={handleKebabClick}>
              <IconStore name="KebabMenu" width="25px" height="25px" />
            </KebabMenu>
          </KebabContainer>
        )}
      </Top>
      <TagsContainer>
        <TechStack>
          {keyWord && keyWord.map((data) => <TechTag>{data}</TechTag>)}
        </TechStack>
      </TagsContainer>
    </CarrerItemContainer>
  );
};

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
  z-index: 1000;
`;

const DropDelete = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: ${colors.gray[500]};
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray[100]};
    color: #ff8484;
  }
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
  color: ${colors.gray[400]};
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
  color: ${colors.gray[500]};
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
