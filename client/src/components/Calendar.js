import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root');

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  // Fetch events from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: '', start, end });
    setModalOpen(true);
  };

  const handleEventClick = (event) => {
    setNewEvent(event);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newEvent._id) {
        // Update existing event
        const res = await axios.put(`http://localhost:5000/api/events/${newEvent._id}`, newEvent);
        setEvents(events.map(ev => (ev._id === newEvent._id ? res.data : ev)));
      } else {
        // Create new event
        const res = await axios.post('http://localhost:5000/api/events', newEvent);
        setEvents([...events, res.data]);
      }
      setModalOpen(false);
      setNewEvent({ title: '', start: '', end: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${newEvent._id}`);
      setEvents(events.filter(ev => ev._id !== newEvent._id));
      setModalOpen(false);
      setNewEvent({ title: '', start: '', end: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ height: '90vh', padding: '20px' }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />

      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <h2>{newEvent._id ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            required
          />
          <br />
          <label>Start Time:</label>
          <input
            name="start"
            type="datetime-local"
            value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
          />
          <br />
          <label>End Time:</label>
          <input
            name="end"
            type="datetime-local"
            value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
          />
          <br />
          <button type="submit">{newEvent._id ? 'Update' : 'Add'} Event</button>
        </form>

        {newEvent._id && (
          <button
            onClick={handleDelete}
            style={{ marginTop: '10px', color: 'white', background: 'red' }}
          >
            Delete Event
          </button>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;
