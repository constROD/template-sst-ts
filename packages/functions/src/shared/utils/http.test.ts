import { describe, expect, it } from 'vitest';
import { HTTP_RESPONSES } from '../constants/http';
import { makeAPIResponse } from './http';

describe('makeAPIResponse', () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  };

  it('should create a response with the correct type, data, and error', () => {
    const type = 'Success';
    const data = { message: 'Hello, world!' };
    const error = { message: 'Something went wrong' };

    const result = makeAPIResponse({
      type,
      data,
      error,
    });
    const expectedResult = {
      statusCode: HTTP_RESPONSES[type].statusCode,
      headers,
      body: JSON.stringify({
        message: HTTP_RESPONSES[type].message,
        code: HTTP_RESPONSES[type].code,
        data,
        error,
      }),
    };

    expect(result).toEqual(expectedResult);
  });

  it('should create a response with raw data and error when isRaw is true', () => {
    const type = 'Success';
    const data = { message: 'Hello, world!' };
    const error = { message: 'Something went wrong' };

    const result = makeAPIResponse({
      type,
      data,
      error,
      isRaw: true,
    });
    const expectedResult = {
      statusCode: HTTP_RESPONSES[type].statusCode,
      headers,
      body: JSON.stringify({ data, error }),
    };

    expect(result).toEqual(expectedResult);
  });

  it('should create a response without data and error when they are not provided', () => {
    const type = 'Success';

    const result = makeAPIResponse({
      type,
    });
    const expectedResult = {
      statusCode: HTTP_RESPONSES[type].statusCode,
      headers,
      body: JSON.stringify({
        message: HTTP_RESPONSES[type].message,
        code: HTTP_RESPONSES[type].code,
        data: undefined,
        error: undefined,
      }),
    };

    expect(result).toEqual(expectedResult);
  });
});
