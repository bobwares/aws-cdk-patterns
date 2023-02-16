import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {RestApi} from "aws-cdk-lib/aws-apigateway";
import {GenericTable} from "./GenericTable";
import {AuthorizerWrapper} from "./auth/AuthorizerWrapper";

export class DaoStack extends cdk.Stack {

    private api = new RestApi(this, 'api');
    private authorizer: AuthorizerWrapper;

    private infoTable = new GenericTable(this,{
        tableName: 'InfoTable',
        primaryKey: 'id',
        createLambdaPath: 'Create',
        readLambdaPath: 'Read',
        updateLambdaPath: 'Update',
        deleteLambdaPath: 'Delete',
        secondaryIndexes: ['location']
    } )


    constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

        this.authorizer = new AuthorizerWrapper(this, this.api);

        //API integrations:
        const infoResource = this.api.root.addResource('info');
        infoResource.addMethod('POST', this.infoTable.createLambdaIntegration);
        infoResource.addMethod('GET', this.infoTable.readLambdaIntegration);
        infoResource.addMethod('PUT', this.infoTable.updateLambdaIntegration);
        infoResource.addMethod('DELETE', this.infoTable.deleteLambdaIntegration);

    }
}
