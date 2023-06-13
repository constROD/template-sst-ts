import { CommonUtil } from '@core/utils/commons';
import { SSTConfig } from 'sst';
import { NodeJSProps } from 'sst/constructs';
import { API } from 'stacks/api';
import { Secrets } from 'stacks/secrets';
import { VPC } from 'stacks/vpc';

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
    const isCoreStage = CommonUtil.verifyCoreStage(app.stage);

    app.setDefaultFunctionProps({ nodejs: { esbuild } });
    app.stack(VPC);
    app.stack(Secrets);
    app.stack(API);

    if (isCoreStage) {
      /* Add stateful stacks here */
    }
  },
} satisfies SSTConfig;
