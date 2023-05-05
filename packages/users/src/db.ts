import { connection } from '@core/db';

const connect = connection();

export const db = connect;
