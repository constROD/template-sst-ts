import { HTTP_RESPONSES } from '../constants/http';

const commonHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

type MakeAPIResponseOption<TData, TError, TRaw> = {
  type: keyof typeof HTTP_RESPONSES;
  data?: TData;
  raw?: TRaw;
  error?: TError;
};

/**
 * Make a response for API Gateway
 *
 * @param type based on HTTP_RESPONSES
 * @param data the data to be returned
 * @param error the error to be returned
 * @param raw the raw data to be returned
 * @returns API Gateway response
 */
export function makeAPIResponse<TData, TError, TRaw>({
  type,
  data,
  error,
  raw = undefined,
}: MakeAPIResponseOption<TData, TError, TRaw>) {
  return {
    statusCode: HTTP_RESPONSES[type].statusCode,
    headers: commonHeaders,
    body: raw
      ? JSON.stringify({ ...raw, data, error })
      : JSON.stringify({
          message: HTTP_RESPONSES[type].message,
          code: HTTP_RESPONSES[type].code,
          data,
          error,
        }),
  };
}
