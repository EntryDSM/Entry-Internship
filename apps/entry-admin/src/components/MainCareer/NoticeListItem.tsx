import styled from '@emotion/styled';
import { Button } from '@entry/ui';
import { useNavigate } from 'react-router-dom';
import { colors } from '@entry/design-token';

type NoticeListItemProps = {
  noticeId: number;
  title: string;
  keyWord: string[];
};

export const NoticeListItem = ({
  noticeId,
  title,
  keyWord,
}: NoticeListItemProps) => {
  const navigate = useNavigate();

  return (
    <NoticeItemContainer>
      <NoticeInfoContainer>
        <NoticeTitleContainer>{title}</NoticeTitleContainer>
        <TagsContainer>
          {keyWord.map((tag, index) => (
            <TagItem key={index}>{tag}</TagItem>
          ))}
        </TagsContainer>
      </NoticeInfoContainer>
      <ActionButton onClick={() => navigate(`/admin/job-status/${noticeId}`)}>
        보기
      </ActionButton>
    </NoticeItemContainer>
  );
};

const NoticeItemContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
  border-bottom: 1px solid ${colors.gray[200]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoticeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NoticeTitleContainer = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${colors.gray[800]};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LocationTag = styled.span`
  font-size: 14px;
  color: ${colors.gray[500]};
  font-weight: normal;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const TagItem = styled.div`
  font-size: 13px;
  color: ${colors.gray[500]};
`;

const ActionButton = styled.button`
  background-color: #2ac975;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 80px;
  height: 39px;

  &:hover {
    background-color: #229a59;
  }
`;
