export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface JwtPayloadWithRefreshToken extends JwtPayload {
  refreshToken: string;
}