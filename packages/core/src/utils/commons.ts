import { STAGES } from '@core/constants/commons';
import dayjs from 'dayjs';
import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';

export * as CommonUtil from './commons';

export function formatDate(date: Date | null, desiredFormat?: string) {
  if (!date) return '';
  const dateFormat = desiredFormat || 'YYYY-MM-DD HH:mm:ss Z';
  return dayjs(date).format(dateFormat);
}

export function logger({ path, event, log }: { path: string; event: string; log: unknown }) {
  const date = dayjs().format('YYYY/MM/DD hh:mm:ss');
  // eslint-disable-next-line no-console
  console.debug(`[${date}]: ${path} (${event}) >> `, JSON.stringify(log, null, 2));
}

export function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function transformToPascal(text: string) {
  return startCase(camelCase(text)).replace(/ /g, '');
}

export function verifyCoreStage(stage: string) {
  const stageValue = stage as (typeof STAGES)[keyof typeof STAGES];
  return [STAGES.Dev, STAGES.Staging, STAGES.Prod].includes(stageValue);
}
