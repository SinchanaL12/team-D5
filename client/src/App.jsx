import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [ticketTitle, setTicketTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [ticketList, setTicketList] = useState([]);

  // Fetch the ticket list on page load
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setTicketList(response.data);
    });
  }, [ticketList]);

  // Add new ticket
  const addTicket = () => {
    Axios.post("http://localhost:3001/insert", {
      ticketTitle,
      description,
      status,
    });
  };

  // Update ticket
  const updateTicket = (id) => {
    Axios.put("http://localhost:3001/update", {
      id,
      newTicketTitle,
    });
  };

  // Delete ticket
  const deleteTicket = (id) => {
    Axios.delete("http://localhost:3001/delete/${id}");
  };

  return (
    <div className="App">
      <h1>Customer Support Ticket System</h1>

      {/* Form to add a new ticket */}
      <label>Ticket Title:</label>
      <input
        type="text"
        onChange={(event) => setTicketTitle(event.target.value)}
      />
      <label>Description:</label>
      <input
        type="text"
        onChange={(event) => setDescription(event.target.value)}
      />
      <label>Status:</label>
      <input
        type="text"
        onChange={(event) => setStatus(event.target.value)}
      />
      <button onClick={addTicket}>Add Ticket</button>

      {/* Displaying the list of tickets */}
      <h2>Ticket List</h2>
      {ticketList.map((ticket) => {
        return (
          <div className="ticket" key={ticket._id}>
            <h3>{ticket.ticketTitle}</h3>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <input
              type="text"
              placeholder="New ticket title..."
              onChange={(event) => setNewTicketTitle(event.target.value)}
            />
            <button onClick={() => updateTicket(ticket._id)}>Update</button>
            <button onClick={() => deleteTicket(ticket._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;