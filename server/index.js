const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();

const TicketModel = require('./server/models/Ticket');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://abc:abc1@cluster0.690nh.mongodb.net/ticketDB");

app.post('/insert', async (req, res) => {
  const { ticketTitle, description, status } = req.body;
  const ticket = new TicketModel({
    ticketTitle,
    description,
    status,
  });

  try {
    await ticket.save();
    res.send('Ticket inserted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error inserting ticket');
  }
});

app.get('/read', async (req, res) => {
  try {
    const result = await TicketModel.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching tickets');
  }
});

app.put('/update', async (req, res) => {
  const { id, newTicketTitle } = req.body;

  try {
    const updatedTicket = await TicketModel.findById(id);
    updatedTicket.ticketTitle = newTicketTitle;
    await updatedTicket.save();
    res.send('Ticket updated');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating ticket');
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await TicketModel.findByIdAndDelete(id);
    res.send('Ticket deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting ticket');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
