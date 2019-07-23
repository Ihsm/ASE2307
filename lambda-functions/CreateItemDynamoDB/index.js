const AWS = require('aws-sdk');
const uuid4 = require('uuid/v4');

AWS.config.update({
  region: 'eu-west-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'ASE2307';


exports.handler = function (event, context) {
  let ID = uuid4();
  let UserID = 'testi';
  let email = event.email;
  let status = event.status;
  let info = event.info;

  let params = {
      TableName:table,
      Item:{
          'ID': ID,
          'UserID': UserID,
          'Email': email,
          'Status': status,
          'Info': info
      }
  };
  console.log(params);
  docClient.put(params, function(err, data) {
      if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      }
      else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
  });
};
