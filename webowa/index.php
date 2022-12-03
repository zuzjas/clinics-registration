<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div id="main_div">
	<div id="header">
		<h2>Clinics_registration</h1>
	</div>
	<h1 id="appointments_count">Liczba zajętych terminów: 0</h1>
	<h1 id="doctors_count">Liczba lekarzy: 0</h1>
	<h1 id="specializations_cout">Liczba specjalizacji: 0</h1>
	<script src="counts.js" type="text/javascript"></script>
	<div id="doctor_div">
		<select name="doctors" id="doctorsDropDown">
		</select>
	</div>
	<div id="calendar_div">
		<button onclick="previousDate()" class="btn previous">&lt</button>
		<span id="date"></span>
		<button onclick="nextDate()" class="btn next">&gt</button>
	</div>

	<ul id="hours">
	  <li value=8>8:00</li>
	  <li value=9>9:00</li>
	  <li value=10>10:00</li>
	  <li value=11>11:00</li>
	  <li value=12>12:00</li>
	  <li value=13>13:00</li>
	  <li value=14>14:00</li>
	  <li value=15>15:00</li>
	  <li value=16>16:00</li>
	  <li value=17>17:00</li>
	</ul>
	<script src="calendar.js" type="text/javascript"></script>
</div>

</body>