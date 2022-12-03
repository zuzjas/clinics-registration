class Appointment {
  constructor(id, hour, name) {
    this.id = id;
	this.hour = hour;
    this.name = name;
  }

  toString()
  {
    return `${this.name}`;
  }
}

var date = new Date();
document.getElementById("date").innerHTML = dateString(date);

const doctorsDropDown = document.getElementById("doctorsDropDown");
doctorsDropDown.addEventListener('change', (event) => {
	updateAppointments(date);
});
updateAppointments(date);

var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        response = this.responseText;
		updateDoctors(response);
    };
    xmlhttp.open("GET", "doctors.php", true);
    xmlhttp.send();

class Doctor {
  constructor(id, name, surname) {
    this.id = id;
	  this.name = name;
    this.surname = surname;
  }

  toString()
  {
    return `${this.name} ${this.surname}`;
  }
}

function updateDoctors(response) {
	response = response.substring(0, response.length - 1);
	const lines = response.split("\n");
	var doctors = []

	for (let i = 0; i < lines.length; i++) {
	  const parts = lines[i].split("_");
	  var doctor = new Doctor(parts[0], parts[1], parts[2])
	  doctors.push(doctor);
	} 

	doctors.forEach(function(doctor)
	{
	  var option = document.createElement('option');
	  option.value = doctor.id;
	  option.innerHTML = doctor.toString();
	  doctorsDropDown.appendChild(option);
	});
}

function nextDate() {
	var nextDate = new Date();
	nextDate.setDate(date.getDate() + 1);
	date = nextDate
	document.getElementById("date").innerHTML = dateString(date);
	updateAppointments();
}

function previousDate() {
	var nextDate = new Date();
	nextDate.setDate(date.getDate() - 1);
	date = nextDate
	document.getElementById("date").innerHTML = dateString(date);
	updateAppointments(date);
}

function dateString(date) {
	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0');
	var yyyy = date.getFullYear();
	
	return yyyy + '-' + mm + '-' + dd;
}

function updateAppointments(date) {
	var myNodelist = document.getElementsByTagName("LI");
	var i;
	for (i = 0; i < myNodelist.length; i++) {
		var spanToKill = myNodelist[i].childNodes[1];
		if (spanToKill != null)
		{				
			myNodelist[i].removeChild(spanToKill);
		}
	}
	var xmlhttp = new XMLHttpRequest();
	var idDoctor = doctorsDropDown.value;
	xmlhttp.open("GET", `get_appointments.php?id_doctor=${idDoctor}& date=${dateString(date)}`, true);
    xmlhttp.send();
	xmlhttp.onload = function() {
        response = this.responseText;
		updateHours(response);
    };
	
}

function updateHours(response) {
	response = response.substring(0, response.length - 1);
	const lines = response.split("\n");
	var appointments = []
	
	for (let i = 0; i < lines.length; i++) {
	  const parts = lines[i].split("_");
	  var appointment = new Appointment(parts[0], parts[1], `${parts[2]} ${parts[3]}`)
	  appointments.push(appointment);
	}
	
	var myNodelist = document.getElementsByTagName("LI");
	var i;
	for (i = 0; i < myNodelist.length; i++) {
		var appointment = appointments.find(a => a.hour == myNodelist[i].value);
		if (appointment != null) {
			var span = document.createElement("SPAN");
			var txt = document.createTextNode(` [${appointment}]`);
			span.appendChild(txt);
			myNodelist[i].appendChild(span);
		}
	}
}