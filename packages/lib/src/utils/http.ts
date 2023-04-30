import { HTTP_RESPONSES } from '../constants';

const commonHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

type MakeAPIResponseOption<TData, TError> = {
  type: keyof typeof HTTP_RESPONSES;
  data?: TData;
  error?: TError;
  isRaw?: boolean;
};

/**
 * Make a response for API Gateway
 *
 * @param type based on HTTP_RESPONSES
 * @param data the data to be returned
 * @param error the error to be returned
 * @param isRaw option to return raw data or not
 * @returns API Gateway response
 */
export const makeAPIResponse = <TData, TError>({
  type,
  data,
  error,
  isRaw = false,
}: MakeAPIResponseOption<TData, TError>) => ({
  statusCode: HTTP_RESPONSES[type].statusCode,
  headers: commonHeaders,
  body: isRaw
    ? JSON.stringify({ data, error })
    : JSON.stringify({
        message: HTTP_RESPONSES[type].message,
        code: HTTP_RESPONSES[type].code,
        data,
        error,
      }),
});
