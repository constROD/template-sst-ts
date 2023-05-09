import { type APIGatewayProxyEventV2 } from 'aws-lambda';

export type APIGatewayEventType<TEvent = undefined> = TEvent extends undefined
  ? APIGatewayProxyEventV2
  : Omit<APIGatewayProxyEventV2, keyof TEvent> & TEvent;
