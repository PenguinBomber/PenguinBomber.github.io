var socket = io();
var lastpass = "";
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
console.log(getCookie("username"));
document.addEventListener("DOMContentLoaded", function() {
	template = document.querySelector('template#listItem');
	if (getCookie("username")) {
	  socket.emit("login", {
			user : getCookie("username"),
			password : getCookie("password")
		});
		lastpass = getCookie("password");
	}
	document.querySelector("#login button").onclick = function() {
		socket.emit("login", {
			user : document.querySelector("#login #username").value,
			password : document.querySelector("#login #password").value
		});
		lastpass = document.querySelector("#login #password").value;
		event.preventDefault();
	};

	document.querySelector("#add button").onclick = function() {
		socket.emit("edit", {
			action: "add",
			item : {
				name : document.querySelector("#add #name").value,
				link : document.querySelector("#add #url").value
			}
		});
		document.querySelector("#add #name").value = "";
		document.querySelector("#add #url").value = "";
		event.preventDefault();
	};

	socket.on("login", function(msg) {
		document.querySelector("#who").innerHTML = msg;
		document.querySelector("#overlay").className = "hide";
		document.cookie = "username=" + msg;
		document.cookie = "password=" + lastpass;
		console.log(document.cookie);
		socket.emit("getUserData");
	});
	socket.on("userData", function(msg) {
		list = document.querySelector("#list");
		list.innerHTML = "";
		for (var i = 0; i < msg.bookmarks.length; i++) {
			clone = document.importNode(template.content, true);
			clone.querySelector("li").id = i
			clone.querySelector("a").innerHTML = msg.bookmarks[i].name;
			clone.querySelector("a").href = msg.bookmarks[i].link;
			var item = i;

			clone.querySelector("button").onclick = function() {if (confirm("are you sure?")) {console.log(this.parentNode); socket.emit("edit", {action : "delete",item : this.parentNode.id})}}
			
			list.appendChild(clone);
		}
	});
	socket.on("whoops", function(msg) {
		alert(msg);
	})
});
