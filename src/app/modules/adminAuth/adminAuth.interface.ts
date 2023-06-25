export type IAdminAuthData = {
  phoneNumber: string;
  password: string;
};

export type IAdminAuthResponse = {
  accessToken: string;
  refeshToken?: string | undefined;
};

export type IRefeshTokenResponse = {
  accessToken: string;
};
