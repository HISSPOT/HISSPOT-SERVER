export const signUpDto = (body) => {
  const { email, password, nickname } = body;
  if (!email || !password || !nickname) {
    throw Object.assign(new Error('email, password, nickname은 필수입니다.'), { status: 400 });
  }
  return { email, password, nickname };
};

export const signInDto = (body) => {
  const { email, password } = body;
  if (!email || !password) {
    throw Object.assign(new Error('email과 password는 필수입니다.'), { status: 400 });
  }
  return { email, password };
};
