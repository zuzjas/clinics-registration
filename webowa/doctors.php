<?php
   $con=mysqli_connect("localhost","root","1234","database");
	
   $result = mysqli_query($con, "SELECT id_doctor, name, surname FROM doctors;");
   
   while($row = $result->fetch_assoc()) {
    echo "". $row["id_doctor"]. "_". $row["name"]. "_" . $row["surname"]. "\n";
   }
	
   mysqli_close($con);
?>