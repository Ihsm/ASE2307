var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "ASE2307";

exports.handler = function (event, context) {
    let ID = event.ID;
    let UserID = event.userID;

    let params = {
        TableName:table,
        Key:{
            'ID': ID,
            'UserID': UserID,
        }
    };

return docClient.get(params, onScan)

  function onScan (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
}
