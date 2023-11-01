export interface IUpdate<T, R> {
  updateAiqcoins(id: string, input: T): Promise<R>;
}
