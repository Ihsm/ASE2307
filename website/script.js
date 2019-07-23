function submitToAPI(e) {
         e.preventDefault();
         var URL = "https://g8agtjpa20.execute-api.eu-west-1.amazonaws.com/v1/palaute";

              var Namere = /[A-Za-z]{1}[A-Za-z]/;
              if (!Namere.test($("#name-input").val())) {
                           alert ("Name can not less than 2 char");
                  return;
              }
              var mobilere = /[0-9]{10}/;
              if (!mobilere.test($("#phone-input").val())) {
                  alert ("Please enter valid mobile number");
                  return;
              }
              if ($("#email-input").val()=="") {
                  alert ("Please enter your email id");
                  return;
              }

              var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
              if (!reeamil.test($("#email-input").val())) {
                  alert ("Please enter valid email address");
                  return;
              }

         var name = $("#name-input").val();
         var phone = $("#phone-input").val();
         var email = $("#email-input").val();
         var desc = $("#description-input").val();
         var data = {
            name : name,
            phone : phone,
            email : email,
            palaute : desc
          };

         $.ajax({
           type: "POST",
           url : "https://g8agtjpa20.execute-api.eu-west-1.amazonaws.com/v1/palaute",
           dataType: "json",
           crossDomain: "true",
           contentType: "application/json; charset=utf-8",
           data: JSON.stringify(data),
           success: function () {
             // clear form and show a success message
             alert("Successfull");
             document.getElementById("contact-form").reset();
         location.reload();
           },
           error: function () {
             // show an error message
             alert("UnSuccessfull");
           }});
};

function poistaDynamosta(inputti) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "https://g8agtjpa20.execute-api.eu-west-1.amazonaws.com/v1/palaute",true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = JSON.stringify({"name" : inputti})
  xhttp.send(data);
  setTimeout(function(){location.reload();},3000);
};


function paivitaDynamo() {
var xhttp = new XMLHttpRequest();
xhttp.open("PATCH", "https://g8agtjpa20.execute-api.eu-west-1.amazonaws.com/v1/palaute",true);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
var data = {
   name : $("#name-input").val(),
   phone : $("#phone-input").val(),
   email : $("#email-input").val(),
   palaute : $("#description-input").val()
 };
xhttp.send(JSON.stringify(data));
setTimeout(function(){location.reload();},3000);
};

function lisaaDynamoon() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://g8agtjpa20.execute-api.eu-west-1.amazonaws.com/v1/palaute",true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = {
     name : $("#name-input").val(),
     phone : $("#phone-input").val(),
     email : $("#email-input").val(),
     palaute : $("#description-input").val()
   };
  xhttp.send(JSON.stringify(data));
  setTimeout(function(){location.reload();},3000);
};

function readDynamo() {
  var xmlhttp, myObj, x, txt = "";
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      txt += "<table border='1' width='500px'>"
      txt += "<tr><td>Nimi</td><td>Puhelin</td><td>Sähköposti</td><td>Palaute</td></tr>"
      for (x in myObj) {
        txt += "<td>" + myObj[x].name + "</td>";
        txt += "<td>" + myObj[x].phone + "</td>";
        txt += "<td>" + myObj[x].email + "</td>";
        txt += "<td>" + myObj[x].palaute + "</td>";
        txt += "<td><button type=\"button\" onClick=\"poistaDynamosta(this.id)\" id=\""+myObj[x].name+"\" class=\"btn\">Poista</button></td></tr>";
      }
      txt += "</table>"
      document.getElementById("demo").innerHTML = txt;
    }
  };
};
