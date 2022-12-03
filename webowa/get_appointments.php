<?php
   $con=mysqli_connect("localhost","root","1234","database");

   $id_doctor = $_GET['id_doctor'];
   $date = $_GET['date'];
	
   $result = mysqli_query($con, "SELECT id_appointment, hour, name, surname FROM appointments WHERE id_doctor = $id_doctor AND date = '$date';");
   
   while($row = $result->fetch_assoc()) {
    echo "". $row["id_appointment"]. "_". $row['hour']. "_" . $row["name"]. "_" . $row["surname"]. "\n";
   }
	
   mysqli_close($con);
?>