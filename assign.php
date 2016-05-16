<?php
	$ref = $_POST['ref'];
	$status = "assigned";
	sleep(2);
	
	require_once("settings.php");
	$dbconn = mysqli_connect($host, $user, $pass, $dbname);
	
	if(!$dbconn){
		print 'PHP could not connect to the database server';
		exit;
	}
	
	$check_sql = "SELECT * FROM bookings WHERE code='$ref'";
	
	$check_Query = mysqli_query($dbconn, $check_sql) or die (mysqli_error($dbconn));
	
	if($row = mysqli_fetch_assoc($check_Query)){
		if($row["status"] == $status){
			echo "Reference <span style='color:red'>#". $ref . "</span> ";
			echo "has already been assigned!";
		} else{
			$post_sql = "UPDATE bookings SET status = '$status' WHERE code = '$ref'";
			$post_Query = mysqli_query($dbconn, $post_sql) or die(mysqli_error($dbconn));
			if($post_Query){
				echo "The booking request <span style='color:blue'>#" . $ref . "</span> ";
				echo "has been assigned a driver";
			}
		}
	} else {
		echo "Reference number not found!";
	}
	
	mysqli_close($dbconn);
?>