import { SSTConfig } from 'sst';
import { NodeJSProps } from 'sst/constructs';
import { API } from 'stacks/api';
import { Secrets } from 'stacks/secrets';

const esbuild: NodeJSProps['esbuild'] = {
  target: 'node16',
  bundle: true,
  minify: false,
  sourcemap: true,
  external: ['aws-sdk', 'prisma'],
};

export default {
  config(_input) {
    return {
      name: 'template-sst-ts',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({ nodejs: { esbuild } });
    app.stack(Secrets);
    app.stack(API);
  },
} satisfies SSTConfig;
