

function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchbar");
  filter = input.value.toUpperCase();
  table = document.getElementById("post");
  tr = table.getElementsByTagName("tr");
  


  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        adjustHeightOfPage($("#postbutton").data("no"));
      } else {
        tr[i].style.display = "none";
        adjustHeightOfPage($("#postbutton").data("no"));
      }
    }       
  }
}

$("#postbutton").click(function(){
  if(localStorage.getItem("LogIn") == "LogIned"){
    $.ajax(
      {
      url: "http://port-9001.web_batabase-choicheng1212693596.codeanyapp.com/index", 
      type: 'POST',
      data: "CheckPostUserName="+localStorage.getItem("UserName")+"&Password="+localStorage.getItem("Password"),
      success: function(result){
        if(result!=null){
        var x = result.length;
        for(var i=0;i<result.length;i++){
        if(result.substring(x,x-1)=="1"){
          document.getElementById(i.toString()).value= "Favourite";
          document.getElementById(i.toString()).disabled = true;
            }
          x--;
          }
        }
     // $("#div1").html(result);
          },error: function (xhr, textStatus, errorThrown) {
			//alert(textStatus);
                         console.log(textStatus);
          }
       }
    );}
});

function add(buttonID){
  if(localStorage.getItem("LogIn") == "LogIned"){
  document.getElementById(buttonID).value= "Favourite";
  document.getElementById(buttonID).disabled = true;
    var postvar;
     postvar = Math.pow(10, parseInt(buttonID));       
  $.ajax(
      {
      url: "http://port-9001.web_batabase-choicheng1212693596.codeanyapp.com/index", 
      type: 'POST',
      data: "PostMarkUserName="+localStorage.getItem("UserName")+"&Password="+localStorage.getItem("Password")+"&Post="+postvar.toString(),
      success: function(result){
     // $("#div1").html(result);
          },error: function (xhr, textStatus, errorThrown) {
			//alert(textStatus);
                         console.log(textStatus);
          }
       }
    );
  }else{
    alert("Please login your account.")
  }
}