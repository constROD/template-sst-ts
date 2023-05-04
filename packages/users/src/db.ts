import { connection } from '@core/db';

const connect = connection();

export type Connection = typeof connect;

export const db = connect;
