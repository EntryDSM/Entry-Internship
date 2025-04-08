import { instance } from './instance';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface ApplicationWriting {
  noticeId: number;
  applicantName: string;
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
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      navigate(-1);
      alert('제출이 완료되었습니다.');
    },
    onError: (error) => {
      alert('제출이 되지 않았습니다.');
      console.log(error);
      console.log(error.response.data);
    },
  });
};
