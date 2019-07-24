var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "ASE2307";

exports.handler = function (event, context) {
    let ID = event.ID;
    let UserID = 'testi';
    let email = event.email;
    let tila = event.tila;
    let info = event.info;
  
    let params = {
        TableName:table,
        Key:{
            'ID': ID,
            'UserID': UserID,
            'Email': email,
            'Status': tila,
            'Info': info
        }
    };
}
docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
