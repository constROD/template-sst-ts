/* eslint-disable no-console */
import { STAGES } from '@core/constants/commons';
import { format } from 'date-fns';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CommonUtil } from './commons';

describe('formatDate', () => {
  it('should return an empty string when date is null', () => {
    expect(CommonUtil.formatDate(null)).toBe('');
  });

  it('should return a correctly formatted date string', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const expected = format(date, 'yyyy-MM-dd HH:mm:ss xx');
    expect(CommonUtil.formatDate(date)).toBe(expected);
  });

  it('should return a correctly formatted date string with custom format', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const customFormat = 'yyyy/MM/dd';
    const expected = format(date, customFormat);
    expect(CommonUtil.formatDate(date, customFormat)).toBe(expected);
  });
});

describe('logger', () => {
  const originalConsoleLog = console.debug;

  beforeEach(() => {
    console.debug = vi.fn();
  });

  afterEach(() => {
    console.debug = originalConsoleLog;
  });

  it('should call console.debug with correct format', () => {
    const testData = { path: '/test', event: 'test_event', log: { message: 'test_message' } };
    const date = format(new Date(), 'yyyy/MM/dd hh:mm:ss');
    const expectedMessage = `[${date}]: ${testData.path} (${testData.event}) >> `;

    CommonUtil.logger(testData);

    expect(console.debug).toHaveBeenCalledWith(
      expectedMessage,
      JSON.stringify(testData.log, null, 2)
    );
  });
});

describe('wait', () => {
  it('should wait for the specified time', async () => {
    const startTime = Date.now();
    const waitTime = 500; // milliseconds

    await CommonUtil.wait(waitTime);

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).toBeGreaterThanOrEqual(waitTime);
    expect(elapsedTime).toBeLessThanOrEqual(waitTime + 20);
  });
});

describe('transformToPascal', () => {
  it('should transform a kebab-case string to PascalCase', () => {
    const input = 'hello-world';
    const expectedResult = 'HelloWorld';

    const result = CommonUtil.transformToPascal(input);
    expect(result).toEqual(expectedResult);
  });

  it('should transform a snake_case string to PascalCase', () => {
    const input = 'hello_world';

    const result = CommonUtil.transformToPascal(input);
    const expectedResult = 'HelloWorld';

    expect(result).toEqual(expectedResult);
  });

  it('should transform a camelCase string to PascalCase', () => {
    const input = 'helloWorld';

    const result = CommonUtil.transformToPascal(input);
    const expectedResult = 'HelloWorld';

    expect(result).toEqual(expectedResult);
  });

  it('should transform a space separated string to PascalCase', () => {
    const input = 'hello world';

    const result = CommonUtil.transformToPascal(input);
    const expectedResult = 'HelloWorld';

    expect(result).toEqual(expectedResult);
  });

  it('should transform a mixed string to PascalCase', () => {
    const input = 'hello-world_this is an_example';

    const result = CommonUtil.transformToPascal(input);
    const expectedResult = 'HelloWorldThisIsAnExample';

    expect(result).toEqual(expectedResult);
  });
});

describe('verifyCoreStage', () => {
  it('should return true for core stages', () => {
    expect(CommonUtil.verifyCoreStage(STAGES.Dev)).toBe(true);
    expect(CommonUtil.verifyCoreStage(STAGES.Staging)).toBe(true);
    expect(CommonUtil.verifyCoreStage(STAGES.Prod)).toBe(true);
  });

  it('should return false for non-core stages', () => {
    expect(CommonUtil.verifyCoreStage('nonexistent')).toBe(false);
  });
});
