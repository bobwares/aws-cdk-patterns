import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {AppStack} from "../lib/app-stack";

// initialize cdk app
const app = new cdk.App();


new AppStack(app, 'AppStack', {
      env: { account: '901434253625', region: 'us-east-2' }
});


app.synth();