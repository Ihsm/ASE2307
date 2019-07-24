const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'ASE2307';

exports.handler = function (event, context) {
  let ID = event.ID;
  let UserID = event.UserID;
  let email = event.email;
  let tila = event.tila;
  let info = event.info;

  var params = {
      TableName:table,
      Key:{
          'ID': ID,
          'UserID': UserID
      },
  UpdateExpression: "set Tila = :s",
    ExpressionAttributeValues:{
        ":s": tila    
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
};