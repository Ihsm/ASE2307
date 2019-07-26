import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
	dynamodb = boto3.resource('dynamodb')
	table = dynamodb.Table('ASE2307')
	group = event['usergroup']
	userID = event['userID']
	if group  == 'Admin':
		response = table.scan()
	else:
		response = table.scan(FilterExpression=Attr('UserID').eq(userID))
	items = response['Items']
	return(items)
