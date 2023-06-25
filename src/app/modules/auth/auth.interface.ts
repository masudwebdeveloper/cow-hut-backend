export type ILoginData = {
  phoneNumber: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refeshToken?: string;
};

export type IRefeshTokenResponse = {
  accessToken: string;
};
