'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1'
});

const table = 'ASE2307';

exports.handler = function (event, context) {
  let authtoken = event.headers['Authorization'];
    function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = new Buffer (base64Url.replace(/-/g, '+').replace(/_/g, '/'),'base64');
    var jsonPayload = base64.toString('ascii');
    return JSON.parse(jsonPayload);
}


  const checkGroup = () => {
    let usergroups = parseJwt(authtoken)['cognito:groups'];
    console.log(usergroups);
    let params = '';
    let adminGroup = usergroups.findIndex(k => k=='Admin');
      if (adminGroup == -1) {
   params = {ExpressionAttributeValues: {":UserID": parseJwt(authtoken)['sub']},FilterExpression: "UserID = :UserID",TableName: "ASE2307"};
  }
  else { params = {TableName: table}};
  return params;
  }
    let sendPromise = new AWS.DynamoDB.DocumentClient().scan(checkGroup()).promise();

  // Handle promise's fulfilled/rejected states
 return sendPromise.then(
    function(data) {
      return {
        "statusCode" : 200,
        "headers": {
"Access-Control-Allow-Origin": "*"
},
        "body" : JSON.stringify(data['Items'])};
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });

};
