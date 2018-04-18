var postnum=0;

function init() {
         var table, tr;
  table = document.getElementById("post");
  tr = table.getElementsByTagName("tr");
   
  for (var i = 0; i < tr.length; i++) {
        tr[i].style.display = "none";
  }
  
  $.ajax(
      {
      url: "http://port-9001.web_batabase-choicheng1212693596.codeanyapp.com/index", 
      type: 'POST',
      data: "CheckPostUserName="+localStorage.getItem("UserName")+"&Password="+localStorage.getItem("Password"),
      success: function(result){
        
        if(result.length!==0){
          if(result!="0"){
          document.getElementById("NoPost").style.display ="none";
        var x = result.length;
        for(var i=0;i<result.length;i++){
        if(result.substring(x,x-1)=="1"){
            tr[i].style.display = "inline";
            postnum++;
            }
          x--;
          }
          }else{
            document.getElementById("NoPost").style.display ="inline";
          }   
        }else{
          document.getElementById("NoPost").style.display ="inline";
        }
        adjustHeightOfPage($("#favourite_menu").data("no"));
     // $("#div1").html(result);
          },error: function (xhr, textStatus, errorThrown) {
			//alert(textStatus);
                         console.log(textStatus);
          }
       }
    );
}

window.onload = init;

function Deletefavourite(buttonID){
  postnum--;
  if(postnum===0){
    document.getElementById("NoPost").style.display ="inline";
  }
  var table, tr;
    table = document.getElementById("post");
      tr = table.getElementsByTagName("tr");
       tr[parseInt(buttonID)].style.display = "none";
      var postvar;
			postvar = Math.pow(10, parseInt(buttonID));
	
  $.ajax(
      {
      url: "http://port-9001.web_batabase-choicheng1212693596.codeanyapp.com/FavouriteList", 
      type: 'POST',
      data: "UserName="+localStorage.getItem("UserName")+"&Password="+localStorage.getItem("Password")+"&Post="+postvar.toString(),
      success: function(result){
     // $("#div1").html(result);
          },error: function (xhr, textStatus, errorThrown) {
			//alert(textStatus);
                         console.log(textStatus);
          }
       }
    );
  adjustHeightOfPage($("#favourite_menu").data("no"));
}