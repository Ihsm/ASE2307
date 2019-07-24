import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('ASE2307')
    response = table.scan()
    items = response['Items']
    return(items)

