import * as cdk from "aws-cdk-lib";
import {CfnOutput} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as codecommit from "aws-cdk-lib/aws-codecommit";
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";

interface PipelineProps extends cdk.StackProps{
    pipelineName: string,
    repositoryName: string,
    branch: string
}

export class Pipeline extends cdk.Stack {

    public readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props: PipelineProps) {
        super(scope, id, props);

        const codeRepository = new codecommit.Repository(this, props.repositoryName, {
            repositoryName: props.repositoryName
        });

        new CodePipeline(this, props.pipelineName, {
            pipelineName: props.pipelineName,
            synth: new CodeBuildStep('SynthStep',
                {
                    input: CodePipelineSource.codeCommit(codeRepository, props.branch),
                    installCommands: [
                        'npm i -g npm@latest',
                        'npm install -g aws-cdk'
                    ],
                    commands: [
                        'npm ci',
                        'npm run build',
                        'npx cdk synth'
                    ]
                }
            )
        });
    }
}