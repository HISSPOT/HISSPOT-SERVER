export const updateUserDto = (body) => {
  const { nickname, profileImg } = body;
  const data = {};
  if (nickname) data.nickname = nickname;
  if (profileImg) data.profileImg = profileImg;
  return data;
};
