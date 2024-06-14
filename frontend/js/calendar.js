import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

/**
 * Set the height of the calendar based on the screen width.
 * @returns {number} The height of the calendar.
 */
const setHeight = (screen.width < 768) ? 540 : 800;

/**
 * Fetch events from the API.
 * @returns {Promise<Array>} The array of events.
 */
async function fetchEvents() {
    try {
        const response = await fetch('https://api-labooking.vercel.app/schedules');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

/**
 * Initialize the FullCalendar and set its options.
 */
document.addEventListener("DOMContentLoaded", async function () {
    const calendarEl = document.getElementById("calendar");
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    // Fetch events from API
    const events = await fetchEvents();

    /**
     * Create a new FullCalendar instance.
     * @type {Calendar}
     */
    const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin],

        buttonText: {
            today: "Today",
            month: "Month",
            day: "Day",
        },

        // Header and footer for mobile
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
        events: events, // Set events fetched from API

        nowIndicator: true,
        navLinks: true,
        allDaySlot: false,
        timeZone: "local",
        slotDuration: "00:40",
        slotMinTime: "08:00",
        slotMaxTime: "18:00",
        expandRows: true,
    });

    // Header and footer for desktop
    if (screen.width > 768) {
        calendar.setOption('headerToolbar', {
            left: "prev today",
            center: "title",
            right: "dayGridMonth,timeGridDay next",
        });
        calendar.setOption('footerToolbar', false);
    }

    loading.style.display = "none";
    calendar.setOption('height', setHeight);
    calendar.render();
});