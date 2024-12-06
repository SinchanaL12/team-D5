const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Ticket = require('./models/Ticket');

const app = express();

// Middleware
app.use(express.json());  // To parse JSON body
app.use(cors());          // To handle cross-origin requests

// Connect to MongoDB (without deprecated options)
mongoose.connect('mongodb+srv://abc:abc1@cluster0.690nh.mongodb.net/ticketDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes

// Create a new ticket
app.post('/insert', (req, res) => {
  const { ticketTitle, description, status } = req.body;

  const newTicket = new Ticket({
    ticketTitle,
    description,
    status,
  });

  newTicket
    .save()
    .then(() => res.send('Ticket added successfully'))
    .catch((err) => res.status(400).send('Error saving ticket:', err));
});

// Read all tickets
app.get('/read', (req, res) => {
  Ticket.find()
    .then((tickets) => res.json(tickets))
    .catch((err) => res.status(400).send('Error fetching tickets:', err));
});

// Update a ticket
app.put('/update', (req, res) => {
  const { id, newTicketTitle } = req.body;

  Ticket.findByIdAndUpdate(id, { ticketTitle: newTicketTitle })
    .then(() => res.send('Ticket updated successfully'))
    .catch((err) => res.status(400).send('Error updating ticket:', err));
});

// Delete a ticket
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  Ticket.findByIdAndDelete(id)
    .then(() => res.send('Ticket deleted successfully'))
    .catch((err) => res.status(400).send('Error deleting ticket:', err));
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
