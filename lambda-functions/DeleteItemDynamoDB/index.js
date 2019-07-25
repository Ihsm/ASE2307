var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'ASE2307';

exports.handler = function (event, context) {
    let ID = event.ID;
    let UserID = event.userID;

    let params = {
        TableName:table,
        Key:{
            'ID': ID,
            'UserID':UserID
        }
    };

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});}
