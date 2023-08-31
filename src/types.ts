export type RootState = {
  userReducer: {
    email: string | undefined,
    password: string | undefined
  }
};

export type User = {
  email: string,
  password: string,
};
