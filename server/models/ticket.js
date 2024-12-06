const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticketTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Open',
  },
});

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;