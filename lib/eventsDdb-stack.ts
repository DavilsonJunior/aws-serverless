import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export class EventsDdbStack extends cdk.Stack {
  readonly table: dynamodb.Table

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.table = new dynamodb.Table(this, "EventsDdb", {
      tableName: 'events',
      // Se apagar a stack, vai apagar todos os recursos
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name : 'sk',
        type: dynamodb.AttributeType.STRING
      },
      // Duração do dado no banco, passando esse tempo é apagado automaticamente
      timeToLiveAttribute: 'ttl',
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1
    })
  }
}