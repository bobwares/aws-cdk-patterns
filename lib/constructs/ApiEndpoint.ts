import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import {CfnOutput} from "aws-cdk-lib";

interface ApiEndpointProps {
    domain: string,
    code: string

}
export class ApiEndpoint extends Construct {

    public readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props: ApiEndpointProps) {
        super(scope, id);

        //////////////////////////////
        // The Lambda function that contains the functionality
        //////////////////////////////
        const handler = new lambda.Function(this, `Lambda-${props.domain}`, {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'handler.handler',
            code: lambda.Code.fromInline(props.code)
        });

        // An API Gateway to make the Lambda web-accessible
        const gateway = new apigw.LambdaRestApi(this, props.domain, {
            description: `Endpoint for domain ${props.domain}`,
            handler,
        });

        this.urlOutput = new CfnOutput(this, 'Url', {
            value: gateway.url,
        });
    }
}

export interface MyConstructProps {
    bucketName: string;
}
