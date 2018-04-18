var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
  var fs, http, qs, server, url, finalcount;

  http = require('http');

  url = require('url');

  qs = require('querystring');

  fs = require('fs');

  server = http.createServer(function(req, res) {
    var action, form, formData, msg, publicPath, urlData, stringMsg,bookmark;
		var request = req;
		var response = res;
    urlData = url.parse(req.url, true);
    action = urlData.pathname;
    publicPath = __dirname + "\\public\\";
   console.log(req.url);
    if (action === "/Signup") {
       console.log("signup");
      if (req.method === "POST") {
        console.log("action = post");
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          
          console.log("form data="+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
						console.log("mess="+msg);
           // console.log("mess="+formData);
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Content-Length": msg.length
            });
            return res.end();
          });
        });
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "Signup.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }
    }else if (action === "/register") {
       console.log("register");
			
      if (req.method === "POST") {
        console.log("action = post");
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          
          console.log("form data="+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
           // console.log("mess="+formData);
						
           /* res.writeHead(200, {
              "Content-Type": "application/json",
              "Content-Length": msg.length
            });*/
						
						MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;
							
							
							dbo.collection("customers").find({}).toArray(function(err, result) {
    						if (err) throw err;
								console.log(result);
								
							for(var i =0;i< result.length;i++)
								   if(result[i].UserName == myobj.UserName){
										 console.log(result[i].UserName);
										 			console.log("Username is exist");
									 				return res.end("Username is exist");
									 }
								
										dbo.collection("customers").count({}, function (error, count) {
  						console.log(error, count);
											user.id = (count+1).toString();
            					msg = JSON.stringify(user);
											myobj = JSON.parse(msg);
										dbo.collection("customers").insertOne(myobj, function(err, result) {
    									if (err) throw err;
    								console.log("1 document inserted");
											db.close();
											return res.end("OK");
  								});
								}); 
 						 });
						});
          });
        });
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "register.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end();
          }
        });
      }
    }	else if (action === "/index") {
       console.log("index");
      if (req.method === "POST") {
        console.log("action = post");
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          
          console.log("form data="+ formData);
          return req.on('end', function() {
						
						if(formData.substring(0,8)=="PostMark"||formData.substring(0,8)=="UserInfo"){
							bookmark = formData.substring(0,8);
							formData = formData.substring(8);
						}else if(formData.substring(0,9)=="CheckPost"){
							bookmark = formData.substring(0,9);
							formData = formData.substring(9);
						}
							
            var user;
            user = qs.parse(formData);
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
            console.log("mess="+formData);
						
           // res.writeHead(200, {
            //  "Content-Type": "application/json",
             // "Content-Length": msg.length
            //});

						
						MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;
  					console.log("mess="+myobj.UserName);
							console.log("bookmark="+bookmark);
						//dbo.collection("customers").insertOne(myobj, function(err, res) {
    				//if (err) throw err;
    				//console.log("1 document inserted");
    				//db.close();
  					//});

							
							
							
							if(bookmark=="UserInfo")
               dbo.collection("customers").find({"UserName": myobj.UserName, "Password":myobj.Password}).toArray(function(err, result) {
    						if (err) throw err;
								   if(result[0].UserName == myobj.UserName){
										 			console.log("OK");
										 			db.close();
									 				return res.end(result[0].Email);
									 }
								db.close();
								return res.end("NO");
 						 });else  if(bookmark=="CheckPost"){
               dbo.collection("customers").find({"UserName": myobj.UserName, "Password":myobj.Password}).toArray(function(err, result) {
    						if (err) throw err;
								   if(result[0].UserName == myobj.UserName){
										 			console.log("OK");
									 				return res.end(result[0].Post);
									 }
								db.close();
								return res.end("NO");
 						 });
							}
							else if(bookmark=="PostMark"){
								var newvalues,postvar;
						dbo.collection("customers").find({"UserName": myobj.UserName, "Password":myobj.Password}).toArray(function(err, result) {
    						if (err) throw err;
								   if(result[0].UserName == myobj.UserName){
											if(result[0].Post!=null)
										 postvar = parseInt(result[0].Post)+ parseInt(myobj.Post);
										 else
										 postvar = parseInt(myobj.Post);
										 newvalues = {$set: {Post:  postvar.toString()} };
								 }
								var myquery = {UserName: myobj.UserName};
                	dbo.collection("customers").update(myquery, newvalues,function(err, result) {
                  		if (err) throw err;
                  			console.log("1 document updated");
                  	db.close();
              	});
															
							db.close();
							});
							}else          //LogIn
								dbo.collection("customers").find({}).toArray(function(err, result) {
    						if (err) throw err;
							for(var i =0;i< result.length;i++)
								   if(result[i].UserName == myobj.UserName&&result[i].Password == myobj.Password){
										 			console.log("OK");
									 				return res.end("OK");
									 }
								db.close();
							return res.end("NO");
 						 });
								

							
							
							
							
							
							
							/*
							dbo.collection("customers").find({"UserName" : myobj.UserName}).toArray(function(err, result) {
    						if (err) throw err;
								
    						console.log("OK   "+result);
    					db.close();
  });*/
							
							
			//				var myquery = { Name: 'apple' };
		//					dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    //if (err) throw err;
    //console.log("1 document deleted");
    //db.close();
  //});
							
							
							// count=dbo.collection("customers").find({"Name" : "ALEX"}).count();
							//console.log("total count="+dbo.collection("customers").find({"Name" : "ALEX"}).count());
							/*
							dbo.collection("customers").count({"UserName" : "Hello123"}, function (error, count) {
  						console.log(error, count);
							
								 finalcount=count;
								
								
							});
							
							*/
		
							//o.collection("customers").find({}).toArray(function(err, result) {
    // (err) throw err;
   //console.log(result);
  //db.close();
//);
							
			//				dbo.collection("customers").find({"Name": "ALEX"}).toArray(function(err, result) {
    //if (err) throw err;
    //console.log(result);
    //db.close();
	//}); 
							
								//console.log("final count="+finalcount);
						
					});
						
            
          });
        });
				
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "index.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }
    } else if (action === "/FavouriteList") {
       console.log("FavouriteList");
      if (req.method === "POST") {
        console.log("action = post");
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          
          console.log("form data="+ formData);
          return req.on('end', function() {
						
            var user;
            user = qs.parse(formData);
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
            console.log("mess="+formData);
						
           // res.writeHead(200, {
            //  "Content-Type": "application/json",
             // "Content-Length": msg.length
            //});

						
						MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;
  					console.log("mess="+myobj.UserName);
							
						//dbo.collection("customers").insertOne(myobj, function(err, res) {
    				//if (err) throw err;
    				//console.log("1 document inserted");
    				//db.close();
  					//});
							dbo.collection("customers").find({}).toArray(function(err, result) {
    						if (err) throw err;
							console.log(result);
								
								
							console.log("bookmark="+bookmark);
							
							
							

									var newvalues,postvar;
									for(var i =0;i< result.length;i++)
								   if(result[i].UserName == myobj.UserName&&result[i].Password == myobj.Password){
										 postvar = parseInt(result[i].Post)- parseInt(myobj.Post);
										 newvalues = {$set: {Post:  postvar.toString()} };
									 }
								var myquery = {UserName: myobj.UserName, Password: myobj.Password};
                	dbo.collection("customers").update(myquery, newvalues,function(err, result) {
                  		if (err) throw err;
                  			console.log("1 document updated");
                  	db.close();
              	});
							
									
								
							db.close();});
							
								console.log("final count="+finalcount);
						
					});
						
            
          });
        });
				
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "FavouriteList.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }
    }
		

		else if( action==="/newpage"){
       res.writeHead(200, {
        "Content-Type": "text/html"
      });
      return res.end("<h1>�w����{Node.js�泾���O2</h1><p><a href=\"/Signup\">���U</a></p>");
    }
		else	if(request.url === "/post1"){
		//sendFileContent(response, "callajax.html", "text/html");
		sendFileContent(response, "post1.html", "text/html");
	}		
		else	if(request.url === "/post2"){
		//sendFileContent(response, "callajax.html", "text/html");
		sendFileContent(response, "post2.html", "text/html");
	} 		
		else	if(request.url === "/post3"){
		//sendFileContent(response, "callajax.html", "text/html");
		sendFileContent(response, "post3.html", "text/html");
	} 		
		else	if(request.url === "/post4"){
		//sendFileContent(response, "callajax.html", "text/html");
		sendFileContent(response, "post4.html", "text/html");
	} 
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
		else if(/^\/[a-zA-Z0-9\/]*.magnificpopup.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
		else if(/^\/[a-zA-Z0-9\/]*.1.11.3.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
		else if(/^\/[a-zA-Z0-9\/]*.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
			else if(/^\/[a-zA-Z0-9\/]*.min.map$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
else if(/^\/[a-zA-Z0-9\/]*.min.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/]*.min.css.map$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpg");
	}
		else if(/^\/[a-zA-Z0-9\/]*.jpeg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpeg");
	}
		else if(/^\/[a-zA-Z0-9\/]*.png/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/png");
	}
		else if(/^\/[a-zA-Z0-9\/]*.ico$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/x-icon");
	}
		else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.woff/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/x-font-woff");
	}
		else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.ttf/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/x-font-ttf");
	}
		else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.eot/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/x-font-eot");
		}
		else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.svg/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/svg+xml");
		}
		
    
    else {
      
      console.log("callhtml");
		sendFileContent(res, "index.html", "text/html");

     
      //res.writeHead(200, {
      //  "Content-Type": "text/html"
     // });
      //return res.end("<h1>�w����{Node.js�泾���O</h1><p><a href=\"/Signup\">���U</a></p>");
    }
  });

  server.listen(9001);

  console.log("Server is running�Atime is" + new Date());

  
  
  
  
  
function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}
}).call(this);


