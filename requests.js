var xhr = createRequest();
var time24hour; 

function getRequests(dataSource, divID){
	if(xhr){
		var obj = document.getElementById(divID);
		xhr.open("POST", dataSource, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				obj.innerHTML = xhr.responseText;
			}
		}
		xhr.send();
	}
}

function assignCab(dataSource, divID, ref){
	if(xhr){
		var obj = document.getElementById(divID);
		var requestbody = "ref=" = encodeURIComponent(ref);
		xhr.open("POST", dataSource, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				ob.innerHTML = xhr.responseText;
				getRequests('requests.php', 'targetDiv');
			}
		}
		xhr.send(requestbody);
	}
}