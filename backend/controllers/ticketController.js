const { Parser } =
    require(
        "json2csv"
    );

const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
    try {
        const {
            customer_name,
            customer_email,
            subject,
            description,
        } = req.body;

        // Validation
        if (
            !customer_name ||
            !customer_email ||
            !subject ||
            !description
        ) {
            return res.status(400).json({
                message: "All fields required",
            });
        }

        // Count existing tickets
        const count = await Ticket.countDocuments();

        const ticketNumber = String(count + 1).padStart(3, "0");

        const ticket_id = `TKT-${ticketNumber}`;

        // Create ticket
        const ticket = await Ticket.create({
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description,
        });

        res.status(201).json({
            success: true,
            ticket,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};
const getTickets = async (req, res) => {
    try {

        const {
            search,
            status,
        } = req.query;

        let filter = {};

        // Search logic
        if (search) {

            filter.$or = [

                {
                    ticket_id: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    customer_name: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    customer_email: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    subject: {
                        $regex: search,
                        $options: "i",
                    },
                },

            ];

        }

        // Status filter
        if (status) {
            filter.status = status;
        }

        const tickets = await Ticket.find(
            filter
        ).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            total: tickets.length,
            tickets,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};
const getSingleTicket = async (req, res) => {

    try {

        const { ticketId } = req.params;

        const ticket = await Ticket.findOne({
            ticket_id: ticketId,
        });

        if (!ticket) {

            return res.status(404).json({
                message: "Ticket not found",
            });

        }

        res.status(200).json({
            success: true,
            ticket,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};
const updateTicket = async (req, res) => {

    try {

        const { ticketId } = req.params;

        const {
            status,
            note,
        } = req.body;

        const ticket = await Ticket.findOne({
            ticket_id: ticketId,
        });

        if (!ticket) {

            return res.status(404).json({
                message: "Ticket not found",
            });

        }

        // update status

        if (status) {
            ticket.status = status;
        }

        // add note

        if (note) {

            ticket.notes.push({
                text: note,
            });

        }

        await ticket.save();

        res.status(200).json({
            success: true,
            ticket,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};
const deleteTicket = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedTicket =
            await Ticket.findOneAndDelete({

                ticket_id: id

            });

        if (!deletedTicket) {

            return res.status(404).json({

                message: "Ticket not found"

            });

        }

        res.status(200).json({

            message: "Ticket deleted"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Delete failed"

        });

    }

};
const exportTickets =
    async (req, res) => {

        try {

            const tickets =
                await Ticket.find();

            const fields = [

                "ticket_id",

                "customer_name",

                "customer_email",

                "subject",

                "description",

                "status"

            ];

            const parser =
                new Parser({

                    fields

                });

            const csv =

                parser.parse(
                    tickets
                );

            res.header(
                "Content-Type",
                "text/csv"
            );

            res.attachment(
                "tickets.csv"
            );

            return res.send(
                csv
            );

        }

        catch (err) {

            console.log(err);

            res.status(500).json({

                message:
                    "Export failed"

            });

        }

    };
module.exports = {

    createTicket,

    getTickets,

    getSingleTicket,

    updateTicket,

    deleteTicket,

    exportTickets

};