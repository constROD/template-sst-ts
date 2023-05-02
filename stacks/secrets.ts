import { Config, type StackContext } from 'sst/constructs';

export function Secrets({ stack }: StackContext) {
  const TEST = new Config.Secret(stack, 'TEST');

  return {
    TEST,
  };
}
