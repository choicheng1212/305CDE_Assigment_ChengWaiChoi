// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("gamebtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closegame")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    document.getElementById('game').innerHTML="<iframe id='game'  width='600' height='400' src='//v6p9d9t4.ssl.hwcdn.net/html/826345/index.html'></iframe>";
    
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.getElementById('game').innerHTML="";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    
        modal.style.display = "none";
        document.getElementById('game').innerHTML="";
    }
}