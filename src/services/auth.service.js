import jwt from 'jsonwebtoken';
import { findUserByKakaoId, createUser } from '../repositories/user.repository.js';

const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me';

const fetchKakaoUser = async (kakaoAccessToken) => {
  const res = await fetch(KAKAO_USER_INFO_URL, {
    headers: { Authorization: `Bearer ${kakaoAccessToken}` },
  });
  if (!res.ok) throw Object.assign(new Error('카카오 토큰이 유효하지 않습니다.'), { status: 401 });
  return res.json();
};

export const kakaoLoginService = async (kakaoAccessToken) => {
  if (!kakaoAccessToken) throw Object.assign(new Error('kakaoAccessToken이 필요합니다.'), { status: 400 });

  const kakaoUser = await fetchKakaoUser(kakaoAccessToken);
  const kakaoId = String(kakaoUser.id);
  const profileImageUrl = kakaoUser.kakao_account?.profile?.profile_image_url ?? null;

  let user = await findUserByKakaoId(kakaoId);
  if (!user) {
    user = await createUser({ kakaoId, nickname: `user_${kakaoId.slice(-6)}`, profileImageUrl });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h',
  });

  return { accessToken, isOnboarded: user.isOnboarded };
};

export const logoutService = async (userId) => {
  // 추후 토큰 블랙리스트 처리 가능
};
