export interface IResult {
  isSuccess: boolean;
  message?: string;
}

export interface IVersionResult extends IResult {
  version: string;
}
