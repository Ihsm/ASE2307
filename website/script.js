function submitToAPI(e) {
  var access_token = getToken();
  var user_id =  parseJwt(access_token)['sub'];
         e.preventDefault();
         var URL = "https://bhxuhr4xr0.execute-api.eu-west-1.amazonaws.com/v1/ase2307";
              if ($("#email-input").val()=="") {
                  alert ("Please enter your email id");
                  return;
              }

              var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
              if (!reeamil.test($("#email-input").val())) {
                  alert ("Please enter valid email address");
                  return;
              }

         var email = $("#email-input").val();
         var tiketti = $("#ticket-input").val();
         var data = {
          email : email,
          info : tiketti,
          userID: user_id
          };

         $.ajax({
           type: "POST",
           url : "https://bhxuhr4xr0.execute-api.eu-west-1.amazonaws.com/v1/ase2307",
           dataType: "json",
           crossDomain: "true",
           headers: {'Authorization': access_token},
           contentType: "application/json; charset=utf-8",
           data: JSON.stringify(data),
           success: function () {
             // clear form and show a success message
             alert("Successful");
             document.getElementById("ticket-form").reset();
         location.reload();
           },
           error: function () {
             // show an error message
             alert("UnSuccessful");
           }});
};

function deleteItemDynamo(inputti) {
  var access_token = getToken();
  var user_id =  parseJwt(access_token)['sub'];
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "https://bhxuhr4xr0.execute-api.eu-west-1.amazonaws.com/v1/ase2307",true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization",access_token);
  var data = JSON.stringify({"ID" : inputti, "userID" :user_id});
  xhttp.send(data);
  setTimeout(function(){scanDynamo();},3000);
};


function updateItemDynamo(ID,UserID) {
  var access_token = getToken();
  var nappula = document.getElementById(ID);
  var Email = nappula.getAttribute("data-testi");
  var xhttp = new XMLHttpRequest();
  xhttp.open("PATCH", "https://bhxuhr4xr0.execute-api.eu-west-1.amazonaws.com/v1/ase2307",true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization",access_token);
  var data = {
    ID : ID,
    userID: UserID,
    email:Email,
    tila: 'OK'
   };
  xhttp.send(JSON.stringify(data));
  setTimeout(function(){scanDynamo();},3000);
};

function createItemDynamo() {
  var access_token = getToken();
  var user_id =  parseJwt(access_token)['sub'];
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://bhxuhr4xr0.execute-api.eu-west-1.amazonaws.com/v1/ase2307",true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization",access_token);
  var data = {
     email : $("#email-input").val(),
     info : $("#ticket-input").val(),
     userID: user_id
   };
  xhttp.send(JSON.stringify(data));
  setTimeout(function(){scanDynamo();},3000);
};

function scanDynamo_user() {
  var access_token = getToken();
  var user_id =  parseJwt(access_token)['sub'];
  var groups =  parseJwt(access_token)['cognito:groups'][0];
  var xmlhttp, myObj, x, txt = "";
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      txt += "<table border='1' width='500px'>"
      txt += "<tr><td>Tiketin ID</td><td>Käyttäjä ID</td><td>Sähköposti</td><td>Tiketti</td><td>Tila</td></tr>"
      for (x in myObj) {
        txt += "<td>" + myObj[x].ID + "</td>";
        txt += "<td>" + myObj[x].UserID + "</td>";
        txt += "<td>" + myObj[x].Email + "</td>";
        txt += "<td>" + myObj[x].Info + "</td>";
        txt += "<td>" + myObj[x].Tila + "</td>";
        txt += "<td><button type=\"button\" onClick=\"deleteItemDynamo(this.id)\" id=\""+myObj[x].ID+"\" class=\"btn\">Poista</button></td></tr>";
      }
      txt += "</table>"
      document.getElementById("tiketit").innerHTML = txt;
    }
  };
  var data = {
    group:groups,
    userID: user_id
   };
  xhttp.open("GET", "https://bhxuhr4xr0.execute-api.eu-west-1.amazonaws.com/v1/ase2307", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization",access_token);
  xhttp.send(JSON.stringify(data));
};
function scanDynamo() {
  var access_token = getToken();
  var user_id =  parseJwt(access_token)['sub'];
  var groups =  parseJwt(access_token)['cognito:groups'];
  var xmlhttp, myObj, x, txt = "";
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      txt += "<table border='1' width='500px'>"
      txt += "<tr><td>Tiketin ID</td><td>Käyttäjä ID</td><td>Sähköposti</td><td>Tiketti</td><td>Tila</td></tr>"
      for (x in myObj) {
        txt += "<td>" + myObj[x].ID + "</td>";
        txt += "<td>" + myObj[x].UserID + "</td>";
        txt += "<td>" + myObj[x].Email + "</td>";
        txt += "<td>" + myObj[x].Info + "</td>";
        txt += "<td>" + myObj[x].Tila + "</td>";
        txt += "<td><button type=\"button\" onClick=\"deleteItemDynamo(this.name)\" name=\""+myObj[x].ID+"\" class=\"btn\">Poista</button></td>";
        txt += "<td><button type=\"button\" data-testi=\""+myObj[x].Email+"\" onClick=\"updateItemDynamo(this.id,this.name)\" id=\""+myObj[x].ID+"\" name=\""+myObj[x].UserID+"\" class=\"btn\">Vaihda Status</button></td></tr>";
      }
      txt += "</table>"
      document.getElementById("tiketit").innerHTML = txt;
    }
  };
  xhttp.open("GET", "https://bhxuhr4xr0.execute-api.eu-west-1.amazonaws.com/v1/ase2307", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization",access_token);
  xhttp.send();
};
//Funktio hakee URLin ja parsettaa sieltä access_tokenin.
function getToken(){
let urlString = window.location.href;
var vars = urlString.substring(1).split('&');
var key = {};
for (i=0; i<vars.length; i++) {
  var tmp = vars[i].split('=');
  key[tmp[0]] = tmp[1];
};
return key['access_token'];
}
//Funktio käsittelee access_tokenin ja dekoodaa datan JSONiksi.
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
