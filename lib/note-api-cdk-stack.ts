import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class NoteApiCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Inside constructor, before Lambda definition:
    const notesTable = new dynamodb.Table(this, 'NotesTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'Notes',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT for production
    });



    // Lambda Function
    const notesLambda = new lambda.Function(this, 'NotesHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'notes.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: notesTable.tableName,
      },
    });

    // Grant read/write permissions
    notesTable.grantReadWriteData(notesLambda);


    // API Gateway
    const api = new apigateway.RestApi(this, 'NotesApi', {
      restApiName: 'Notes Service',
    });

    // /notes
    const notes = api.root.addResource('notes');

    // POST /notes
    notes.addMethod('POST', new apigateway.LambdaIntegration(notesLambda));

    // GET /notes
    notes.addMethod('GET', new apigateway.LambdaIntegration(notesLambda));

    // /notes/{id}
    const noteId = notes.addResource('{id}');

    // GET /notes/{id}
    noteId.addMethod('GET', new apigateway.LambdaIntegration(notesLambda));

    // DELETE /notes/{id}
    noteId.addMethod('DELETE', new apigateway.LambdaIntegration(notesLambda));

  }
}
