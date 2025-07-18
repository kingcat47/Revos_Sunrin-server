// src/pages/AuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import baseAxios from '../../../utils/baseAxios';

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const api = baseAxios();

    useEffect(() => {
        const code = searchParams.get('code');
        if (!code) {
            alert('인증 코드가 없습니다.');
            navigate('/');
            return;
        }

        // 백엔드에 인증 코드 전달 → 토큰 발급 요청
        api.post('/auth/google/callback', { code })
            .then(res => {
                // 응답 구조 확인
                console.log('응답:', res);
                if (res.data?.accessToken && res.data?.refreshToken) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                    navigate('/');
                } else {
                    alert('토큰이 없습니다.');
                    navigate('/');
                }
            })
            .catch((err) => {
                console.error('로그인 실패:', err);
                alert('로그인에 실패했습니다.');
                navigate('/');
            });
    }, [searchParams, navigate, api]);

    return <div>로그인 처리 중입니다...</div>;
}