
var	logined =false;

  function show(id) {
		if(localStorage.getItem("LogIn") == "LogIned")
    document.getElementById(id).style.visibility = "visible";
		
  }
  function hide(id) {
    document.getElementById(id).style.visibility = "hidden";
  }
$("#LogOut").click(function(){
		if (typeof(Storage) !== "undefined") {
					localStorage.clear();
					location.reload();
					} else {
    			alert("Sorry, your browser does not support Web Storage...");
					}
});

$("#usermenu").click(function(){
	if(localStorage.getItem("LogIn") == "LogIned"){
	$.ajax(
      {
      url: "http://port-9001.web_batabase-choicheng1212693596.codeanyapp.com/index", 
      type: 'POST',
      data: "UserInfoUserName="+localStorage.getItem("UserName")+"&Password="+localStorage.getItem("Password"),
      success: function(result){
				document.getElementById("username_text").innerHTML = "User Name: "+ localStorage.getItem("UserName");
				document.getElementById("email_text").innerHTML = "Email: "+result; 
				
     // $("#div1").html(result);
          },error: function (xhr, textStatus, errorThrown) {
			//alert(textStatus);
                         console.log(textStatus);
          }
       }
    );
	}
	adjustHeightOfPage($("#usermenu").data("no"));
});

$(function() {
				
    		if(localStorage.getItem("LogIn") == "LogIned"){
					document.getElementById("LogIn_Text").innerHTML = "UserInfo";
				document.getElementById("LogInedPage").style.display = "inline";
				document.getElementById("LogInPage").style.display = "none";
			document.getElementById("tm-LogIn-page").style.maxWidth = "1000px";
		}else{
				document.getElementById("LogIn_Text").innerHTML = "LogIn/Register";
				document.getElementById("LogInPage").style.display = "inline";
				document.getElementById("LogInedPage").style.display = "none";
				document.getElementById("tm-LogIn-page").style.maxWidth = "640px";
	}
});	

function OK(){
        var username = document.getElementById("UserName");       
    		var password = document.getElementById("UserPassword");
			  var wrong = document.getElementById("wrong");
	$.ajax(
      {
      url: "http://port-9001.web_batabase-choicheng1212693596.codeanyapp.com/index", 
      type: 'POST',
      data: $('#loginform').serialize(),
      success: function(result){
        //alert("ddd");
				if(result == "OK"){
					logined = true;

					document.getElementById("wrong").innerHTML = "";
					if (typeof(Storage) !== "undefined") {
    			localStorage.setItem("LogIn", "LogIned");
					localStorage.setItem("UserName", document.getElementById("UserName").value);
					localStorage.setItem("Password", document.getElementById("UserPassword").value);
					location.reload();
					} else {
    			alert("Sorry, your browser does not support Web Storage...");
					}
				}else{
					document.getElementById("wrong").innerHTML = "Wrong UserName or Password";
				} 
     // $("#div1").html(result);
          },error: function (xhr, textStatus, errorThrown) {
			alert(textStatus);
                         console.log(textStatus);

          }
       }
    );
}
		






	$("#register").click(function(){

		
		if(CreateAccount()){	
    $.ajax(
      {
      url: "http://port-9001.web_batabase-choicheng1212693596.codeanyapp.com/register", 
      type: 'POST',
      data: $('#registerform').serialize(),
      success: function(result){
				if(result =="Username is exist"){
					alert("Username is exist");
					document.getElementById("wrong_username").innerHTML = "Username is exist";
				}else{
					if(result =="OK"){
					document.getElementById("wrong_username").innerHTML = "";
					alert("Account is created");
						location.href="/";
					}
				}
     // $("#div1").html(result);
          },error: function (xhr, textStatus, errorThrown) {
			alert(textStatus);
                         console.log(textStatus);
                     }
      }
    );
			
		}
  });

		function CreateAccount(){
			  var username = document.getElementById("UserName");       
    		var password = document.getElementById("UserPassword");
				var ConfirmPassword = document.getElementById("ConfirmPassword");
				var Email = document.getElementById("Email");

			
			if(username.value.length<8)
      						document.getElementById("wrong_username").innerHTML = "Wrong UserName (User Name must be at least 8 characters)";
			else 
									document.getElementById("wrong_username").innerHTML = "";
										
			if(password.value.length<8)
      		          document.getElementById("wrong_password").innerHTML = "Wrong Password (Password must be at least 8 characters)";
						else 
									document.getElementById("wrong_password").innerHTML = "";

				if(password.value!=ConfirmPassword.value)
      		          document.getElementById("wrong_ConfirmPassword").innerHTML = "Wrong Confirm Password";
						else 
									document.getElementById("wrong_ConfirmPassword").innerHTML = "";

				if(!Email.value.includes("@"))
						       	document.getElementById("wrong_Email").innerHTML = "Wrong Email";
						else 
									document.getElementById("wrong_Email").innerHTML = "";
				
				if(username.value.length>=8&&password.value.length>=8&&password.value==ConfirmPassword.value&&Email.value.includes("@"))
					  				return true;
				else
										return false;
		}



