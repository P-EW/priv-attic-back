export const jwtConstants = {
  secret: 'secretKey',
  expireTime: '3000s',
  expireTimeNumber: 3000,
};

export interface Token {
  access_token: string;
  expiry: number;
  pseudo: string;
}
