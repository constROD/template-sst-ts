import { format } from 'date-fns';
import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';

export const formatDate = (date: Date | null, desiredFormat?: string) => {
  if (!date) return '';
  const dateFormat = desiredFormat || 'yyyy-MM-dd HH:mm:ss xx';
  return format(date, dateFormat);
};

export const logger = ({ path, event, log }: { path: string; event: string; log: unknown }) => {
  const date = format(new Date(), 'yyyy/MM/dd hh:mm:ss');
  // eslint-disable-next-line no-console
  console.debug(`[${date}]: ${path} (${event}) >> `, JSON.stringify(log, null, 2));
};

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const transformToPascal = (text: string) => startCase(camelCase(text)).replace(/ /g, '');
