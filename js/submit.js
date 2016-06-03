var xhr = createRequest();
var time24Hour;

function getData(dataSource, divID, clientName, clientPh, unitNum, stNum, stName, suburb, desAdd, date, time){
	if(validateForm()){
		if(xhr){
			var obj = document.getElementById(divID);
			var requestBody = "name=" + encodeURIComponent(clientName) +
							"&phone=" + encodeURIComponent(clientPh) +
							"&unitNum=" + encodeURIComponent(unitNum) + 
							"&stNum=" + encodeURIComponent(stNum) +
							"&stName=" + encodeURIComponent(stName) +
							"&suburb=" + encodeURIComponent(suburb) +
							"&desAdd=" + encodeURIComponent(desAdd) + 
							"&date=" + encodeURIComponent(date) + 
							"&time=" + encodeURIComponent(time24Hour);
							
							xhr.open("POST", dataSource, true);
							xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
							xhr.onreadystatechange = function(){
								if(xhr.readyState = 4 && xhr.status == 200){
									obj.innerHTML = xhr.
								}
							}
							xhr.send(requestBody);
		}
	}
}

function notEmpty(x, name){
	if(x == null || x == ""}{
		alert(name + " must not be empty");
		return false;
	}
	return true;
}

function correctChar(x, name){
	if(x.match(/[^A-Za-z -]/g)){
		alert(name + " can only contain letters and spaces");
		return false;
	}
	return true;
}

function correctNum(x, name){
	if(x.match(/[^0-9-/]/g)){
		alert(name + " can only contain numbers and dashes");
		return false;
	}
	return true;
}

function validateForm(){
	
	x = document.forms["bookingForm"]["clientName"].value;
	name = document.forms["bookingForm"]["clientName"].name;
	if(!notEmpty(x, name)) return false;
	if(!correctChar(x, name)) return false;
	
	x = document.forms["bookingForm"]["suburb"].value;
	name = document.forms["bookingForm"]["suburb"].name;
	if(!notEmpty(x, name)) return false;
	if(!correctChar(x, name)) return false;
	
	x = document.forms["bookingForm"]["stName"].value;
	name = document.forms["bookingForm"]["stName"].name;
	if(!notEmpty(x, name)) return false;
	if(!correctChar(x, name)) return false;
	
	x = document.forms["bookingForm"]["suburb"].value;
	name = document.forms["bookingForm"]["suburb"].name;
	if(!notEmpty(x, name)) return false;
	if(!correctChar(x, name)) return false;
	
	x = document.forms["bookingForm"]["desAdd"].value;
	name = document.forms["bookingForm"]["desAdd"].name;
	if(!notEmpty(x, name)) return false;
	if(!correctChar(x, name)) return false;
	
	x = document.forms["bookingForm"]["stNum"].value;
	name = document.forms["bookingForm"]["stNum"].name;
	if(!notEmpty(x, name)) return false;
	if(!correctChar(x, name)) return false;
	
	x = document.forms["bookingForm"]["clientPh"].value;
	name = document.forms["bookingForm"]["clientPh"].name;
	if(!notEmpty(x, name)) return false;
	if(!correctChar(x, name)) return false;
	
	x = document.forms["bookingForm"]["time"].value;
	if(!isValidTime(x)){
		return false;
	}
	
	x = document.forms["bookingForm"]["date"].value;
	if(!isValidDate(x)){
		return false;
	}
	
	return true;
}

function isValidTime(dateString){
	if(!/^\d{1,2}\:\d{1,2}$/.test(dateString)){
		alert("Invalid time format");
		return false;
	}
	
	var parts = dateString.split(":");
	var hour = parseInt(parts[0], 10);
	var minutes = parseInt(parts[1], 10);
	var time = new Date();
	
	if(hour <= 0 || hour > 12){
		alert("Please enter time in 12 hour format");
		return false;
	}
	
	if(minutes > 59 || minutes <0){
		alert("Please enter a valid time");
		return false;
	}
	
	if(document.forms["bookingForm"]["ampm"].value == "pm" && hour != 12){
		hour += 12;
	}
	
	if(document.forms["bookingForm"]["ampm"].value == "am" && hour == 12){
		hour = 00;
	}
	
	if(document.forms["bookingForm"]["date"].value == time.toLocaleDateString()){
		if(hour == time.getHours() && minutes <= time.getMinutes()){
			alert("Time cannot be earlier than current time");
			return false;
		}
		
		if(hour < time.getHours()){
			alert("Time cannot be earlier than current time");
			return false;
		}
	}
	
	time24Hour = hour + ":" + minutes + ":00";
	return true;
}

function isValidDate(dateString){
	
	if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
	{
		alert("Invalid date format");
		return false;
	}
	
	var parts = dateString.split("/");
	var day = parseInt(parts[0], 10);
	var month = parseInt(parts[1], 10);
	var year = parseInt(parts[2], 10);
	
	if(month == 0 || month > 12){
		alert("Month is invalid");
		return false;
	}
	
	if(year <= new Date().getFullYear()){
		if(month <= new Date().getMonth()){
			alert("Date must not be earlier than today");
			return false;
		}
		
		if(month == new Date().getMonth() + 1 && day < new Date().getDay()){
			alert("Date must not be earlier than today");
			return false;
		}
		
		if(year < new Date().getFullYear()){
			alert("Date must not be earlier than today");
			return false;
		}
	}
	
	var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29;
	
	if(!(day > 0 && day <= monthLength[month - 1])){
		alert("Invalid Date");
		return false;
	}
	
	return true;	
}