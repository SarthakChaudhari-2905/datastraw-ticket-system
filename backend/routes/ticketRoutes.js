const express = require("express");

const router = express.Router();

const {
exportTickets,
  createTicket,
  getTickets,
  getSingleTicket,
  updateTicket,
  deleteTicket
} = require(
  "../controllers/ticketController"
);

router.post(
  "/",
  createTicket
);

router.delete(
"/:id",
deleteTicket
);

router.get(
  "/",
  getTickets
);
router.get(
"/export/csv",
exportTickets
);
router.get(
  "/:ticketId",
  getSingleTicket
);

router.put(
  "/:ticketId",
  updateTicket
);

module.exports = router;