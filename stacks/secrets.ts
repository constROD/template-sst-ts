import { Config, type StackContext } from 'sst/constructs';

export function Secrets({ stack }: StackContext) {
  const VERSION = new Config.Secret(stack, 'VERSION');

  return {
    VERSION,
  };
}
