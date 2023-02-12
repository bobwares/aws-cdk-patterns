import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CfnOutput} from "aws-cdk-lib";
import {ApiEndpoint} from "./constructs/ApiEndpoint";
import * as path from "path";

export class AppStack extends cdk.Stack {

    public readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // new Pipeline(this, 'application02',
    //     {
    //         repositoryName: 'application02',
    //         pipelineName: 'appPipeline',
    //         branch: 'main'
    //     }
    // );

    new ApiEndpoint(this, 'application', {
        domain: 'stock',
        code: path.resolve(__dirname, 'app/lambda')
    })

  }
}
