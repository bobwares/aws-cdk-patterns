import * as cdk from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";

export class snsTopic extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // create an SNS topic
        new sns.Topic(this, 'CodeChanges', {
            displayName: 'Source Code Changes',
        });
    }
}