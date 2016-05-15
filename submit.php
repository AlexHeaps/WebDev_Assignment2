<?php

	$clientName = $_POST['clientName'];
	$clientPh = $_POST['clientPh'];
	$unitNum = $_POST['unitNum'];
	$stNum = $_POST['stNum'];
	$stName = $_POST['stName'];
	$suburb = $_POST['suburb'];
	$desAdd = $_POST['desAdd'];
	$date = $_POST['date'];
	$time = $_POST['time'];
	
	$time = date("H:i", strtotime($time));
	$date = str_replace('/', '-', $date);
	$date = date("Y/m/d", strtotime($date));
	
	$status = "unassigned";
	sleep(2);
	require_once("settings.php");
	$dbconn = mysqli_connect($host, $user, $pass, $dbname);
	if(!$dbconn){
		print 'PHP could not connect to the database server';
		exit;
	}
	
	$val = mysqli_query($dbconn, "select 1 from bookings");
	
	if(!$val){
		$table_sql = "CREATE TABLE IF NOT EXISTS bookings (code int(10) AUTO_INCREMENT PRIMARY KEY, clientName varchar(40) NOT NULL, dates date NOT NULL, times time NOT NULL, clientPh int(10) NOT NULL, unitNum int(10) NOT NULL, stName int(11) NOT NULL, stName varchar(250) NOT NULL, suburb varchar(250) NOT NULL, desAdd varchar(250) NOT NULL, status varchar(10) NOT NULL, dateandtime datetime NOT NULL)"; NOT NULL
		
		mysqli_query($dbconn, $table_sql) or die(mysqli_error($dbconn));
	}
	
	$bookingNum = 1;
	$dup_sql = "SELECT code FROM bookings ORDER BY code DESC LIMIT 1";
	$dup_sql = mysqli_query($dbconn, $dup_sql) or die(mysqli_error($dbconn));
	$rowCount = mysqli_num_rows($dup_Query);
	
	if($rowCount > 0){
		$row = mysqli_fetch_assoc($dup_Query);
		$bookingNum += $row["code"];
	}
	
	$datetime = $date." ".$time;
	$post_sql = "INSERT INTO bookings(clientName, dates, times, clientPh, unitNum, stNum, stName, suburb, desAdd, status, dateandtime) VALUES ('$clientName', '$date', '$time', '$phone', '$unitNum', '$stNum', '$stName', '$suburb', '$desAdd', '$status', '$dateandtime')";
	$post_Query = mysqli_query($dbconn, $post_sql) or die(mysqli_error($dbconn));
	
	if($post_Query){
		$date = date("d/m/Y", strtotime($date));
		echo "Request Sent! <br>Thank you! Your booking reference number is ";
		echo "<span style='color:blue'>#" . $bookingnum . "</span> ";
		echo "You will be picked up in front of your provided address at ";
		echo "<span style='color:yellow'> $time</span> on  <span style='color:yellow'>$date</span>";
	}
	
	mysqli_close($dbconn);
?>