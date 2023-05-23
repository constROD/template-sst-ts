import { STAGES } from '@core/constants/commons';
import { transformToPascal, verifyCoreStage } from '@core/utils/commons';
import { Vpc, type VpcLookupOptions } from 'aws-cdk-lib/aws-ec2';
import { type StackContext } from 'sst/constructs';

export function VPC({ stack, app }: StackContext) {
  const stagePascalCase = transformToPascal(app.stage);

  const isCoreStage = verifyCoreStage(app.stage);

  let vpcLookupOptions: VpcLookupOptions = { isDefault: true };

  if (isCoreStage)
    vpcLookupOptions = {
      vpcId: app.stage === STAGES.Prod ? 'vpc-for-prod' : 'vpc-for-staging-or-dev',
    };

  const vpc = Vpc.fromLookup(stack, `HireBusVPC${stagePascalCase}`, vpcLookupOptions);

  return { vpc };
}
