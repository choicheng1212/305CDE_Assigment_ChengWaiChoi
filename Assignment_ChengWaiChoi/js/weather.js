							

$(function() {
  weather();
});

function weather(){
								var city = "Hong Kong";
								var key = '1d2107ba017fda2c17eecc4810e23f1d';
								$.ajax({
									url: 'http://api.openweathermap.org/data/2.5/weather',
									dataType: 'json',
									type: 'GET',
									data: {q:city, appid: key, units:'metric'},
									success: function(data){
										var wf ='';
										$.each(data.weather, function(imdex, val){
													 wf +='<p><b>'+data.name+"</b></p>"+data.main.temp+'&deg;C '
													 +' | ' + val.main +", "+ val.description
													 });
										$("#weather").html(wf);
									}
					});

}