package com.example.clinics_registration;

import static com.example.clinics_registration.CalendarUtils.selectedDate;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.clinics_registration.databinding.ActivityMainBindingImpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    private Button buttonUmowWizyte;
    private TextView dateTodayTV;
    private TextView dayOfWeekTV;
    private ListView hourLV;

    public int doctorsNum = 15;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ActivityMainBindingImpl binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        binding.setDoctorsNum(doctorsNum);

        initWidgets();
        CalendarUtils.selectedDate = LocalDate.now();

        buttonUmowWizyte.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openNewAppointment();
            }
        });
    }

    private void openNewAppointment() {
        Intent intent = new Intent(this, MakeAppointmentActivity.class);
        startActivity(intent);
    }

    private void initWidgets() {
        buttonUmowWizyte = (Button) findViewById(R.id.buttonUmowWizyte);
        dateTodayTV = findViewById(R.id.dateTodayTV);
        dayOfWeekTV = findViewById(R.id.dayOfWeekTV);
        hourLV = findViewById(R.id.hourLV);
    }

    @Override
    protected void onResume() {
        super.onResume();
        setDayView();
    }

    private void setDayView()
    {
        dateTodayTV.setText(CalendarUtils.monthDayFromDate(selectedDate));
        String dayOfWeek = selectedDate.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.getDefault());
        dayOfWeekTV.setText(dayOfWeek);
        setHourAdapter();
    }

    private void setHourAdapter()
    {
        HourAdapter hourAdapter = new HourAdapter(getApplicationContext(), hourEventList());
        hourLV.setAdapter(hourAdapter);
    }

    private ArrayList<HourEvent> hourEventList()
    {
        ArrayList<HourEvent> list = new ArrayList<>();

        for(int hour = 0; hour < 24; hour++)
        {
            LocalTime time = LocalTime.of(hour, 0);
            ArrayList<Event> events = Event.eventsForDateAndTime(selectedDate, time);
            HourEvent hourEvent = new HourEvent(time, events);
            list.add(hourEvent);
        }

        return list;
    }

    public void previousDayAction(View view)
    {
        CalendarUtils.selectedDate = CalendarUtils.selectedDate.minusDays(1);
        setDayView();
    }

    public void nextDayAction(View view)
    {
        CalendarUtils.selectedDate = CalendarUtils.selectedDate.plusDays(1);
        setDayView();
    }
}