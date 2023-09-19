export abstract class RefreshTokenRepository {
  abstract getStoredTokens(id: string): Promise<any[]>;
  abstract updateAccount(
    id: string,
    access_token: string,
    refresh_token: string,
  ): Promise<number>;
}
