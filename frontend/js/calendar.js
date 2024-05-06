const setHeight = (screen.width < 768) ? 540 : 800;
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin],

        stickyHeaderDates: true,
        buttonText: {
            today: "Today",
            month: "Month",
            day: "Day",
        },

        // header footer for mobile
        headerToolbar: {
            left: "title",
            right: "dayGridMonth,timeGridDay",
        },
        footerToolbar: {
            center: "prev today next",
        },

        displayEventTime: false,
        eventColor: "#f8e659d5",
        eventTextColor: '#1e1a26',
        eventBorderColor: '#f8e659d5',
        events: 'http://localhost:5000/api/bookinglist',

        nowIndicator: true,
        navLinks: true,
        allDaySlot: false,
        timeZone: "local",
        slotDuration: "00:40",
        slotMinTime: "08:00",
        slotMaxTime: "18:00",
        expandRows: true,
    });

    // header footer for desktop
    if (screen.width > 768) {
        calendar.setOption('headerToolbar', {
            left: "prev today",
            center: "title",
            right: "dayGridMonth,timeGridDay next",
        });
        calendar.setOption('footerToolbar', false);
    }

    calendar.setOption('height', setHeight);
    calendar.render();
});