export type RootState = {
  user: {
    email: string | undefined,
    password: string | undefined
  }
};

export type User = {
  email: string,
  password: string,
};
