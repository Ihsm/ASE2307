import json
import boto3
import pprint

def lambda_handler(event, context):
    

    bucket = event['Records'][0]['s3']['bucket']['name']
    fileName = event['Records'][0]['s3']['object']['key']
    
    client=boto3.client('rekognition')
    
    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':fileName}})
    catInPicture = False
    
    for label in response['Labels']:
        if label['Name'] == 'Cat':
            catInPicture = True
            #print (label['Name'] + ' : ' + str(label['Confidence']))
    
    
    if catInPicture == True:
        sns = boto3.client('sns')
        sns.publish(
            TopicArn = 'arn:aws:sns:eu-west-1:065516413468:ASE2307',
            Subject = 'KISSA KUVASSA!!',
            Message = '^_^')
   
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

