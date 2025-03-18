import React, { useState } from 'react';
import './EventCalendar.css';

function EventCalendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Neighborhood Watch Meeting",
      date: "2024-02-20",
      time: "18:00",
      location: "Community Center",
      description: "Monthly meeting to discuss community safety"
    },
    {
      id: 2,
      title: "Safety Workshop",
      date: "2024-02-25",
      time: "10:00",
      location: "Local Police Station",
      description: "Learn basic self-defense and safety tips"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      id: events.length + 1,
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: ''
    });
  };

  return (
    <div className="event-calendar">
      <div className="create-event">
        <h3>Add Community Event</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            required
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            required
          />
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
            required
          />
          <textarea
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            required
          />
          <button type="submit">Add Event</button>
        </form>
      </div>

      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <div className="event-details">
              <p>📅 {event.date} at {event.time}</p>
              <p>📍 {event.location}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCalendar;