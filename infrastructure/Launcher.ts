import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {DaoStack} from "./DaoStack";


// initialize cdk app
const app = new cdk.App();

const myEnvVar = process.env.AWS_PROFILE;
console.log(myEnvVar);


new DaoStack(app, 'DaoStack', {});


app.synth();