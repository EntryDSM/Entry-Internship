export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration?: string;
  refreshTokenExpiration?: string;
}
