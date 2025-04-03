import { instance } from './instance';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface ApplicationWriting {
  noticeId: string | number;
  applicationName: string;
  studentId: string;
  phoneNumber: string;
  programmingExperience: string;
  major: string;
  motivation: string;
  selfIntroduction: string;
}

export const applicationWritingApi = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  return useMutation({
    mutationFn: async (applicationData: ApplicationWriting) =>
      await instance.post('/reports', applicationData, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }),
    onSuccess: () => {
      navigate('/post/:id');
      console.log('success');
    },
    onError: () => {
      alert('제출이 되지 않았습니다.');
    },
  });
};
