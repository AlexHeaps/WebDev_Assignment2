<?php
	include_once("settings.php");
	$dbconn = mysqli_connect($host, $user, $pass, $dbname);
	
	if(!$dbconn){
		print 'PHP could not connect to the database server';
		exit;
	}
	
	date_default_timezone_set('NZ');
	$dateTime = date("Y-m-d H:i:s");
	$timeAhead = new DateTime($dateTime);
	$timeAhead->modify('+2 hour');
	$timeAhead = $timeAhead->format('Y-m-d H:i:s');
	
	$sqlQuery = "SELECT * FROM bookings WHERE status = 'unassigned' AND dateandtime >= '$dateTime' && dateandtime <= '$timeAhead' ORDER BY dateandtime";
	$result = mysqli_query($dbconn, $sqlQuery) or die(mysqli_error($dbconn));
	
	$rowCount = mysqli_num_rows($result);
	
	if($rowCount > 0){
		echo "<table><tr>
				<td><strong>Reference number</strong></td>
				<td><strong>Contact Name</strong></td>
				<td><strong>Contact Number</strong></td>
				<td><strong>Pick-up</strong></td>
				<td><strong>Destination</strong></td>
				<td><strong>Date</strong></td>
				<td><strong>Time</strong></td>
			</tr>";
		
		while($row = mysqli_fetch_assoc($result)){
			echo "<tr>";
                echo "<td>#" . $row["code"]. "</td><td>" . $row["clientName"]. "</td>";
                echo "<td>" . $row["clientPh"] . "</td><td>" . $row["suburb"] . "</td>";
                echo "<td>" . $row["desAdd"] . "</td><td>" . $row["dates"] . "</td>";
				echo "<td>" . $row["times"] . "</td>";
			echo "</tr>";
		}
		echo "</table>";
	}
	
	mysqli_close($dbconn);
	
?>