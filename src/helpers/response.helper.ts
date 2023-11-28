import { ApiResponse } from '../dtos/genericResponse.dto';

export function Response<T>(
  statusCode: number,
  message: string,
  data: T,
): ApiResponse<T> {
  return {
    message,
    data,
    statusCode,
  };
}
