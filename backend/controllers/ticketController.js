const { Parser } = require("json2csv");

const Ticket = require("../models/Ticket");


// CREATE TICKET

const createTicket = async (req, res) => {

    try {

        const {

            customer_name,
            customer_email,
            subject,
            description

        } = req.body;

        if (

            !customer_name ||

            !customer_email ||

            !subject ||

            !description

        ) {

            return res.status(400).json({

                message:
                "All fields required"

            });

        }

        const count =
        await Ticket.countDocuments();

        const ticketNumber =

        String(
            count + 1
        ).padStart(
            3,
            "0"
        );

        const ticket_id =

        `TKT-${ticketNumber}`;

        const ticket =

        await Ticket.create({

            ticket_id,

            customer_name,

            customer_email,

            subject,

            description

        });

        res.status(201).json({

            success:true,

            ticket

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:
            "Server Error"

        });

    }

};


// GET ALL TICKETS + SEARCH + FILTER + PAGINATION

const getTickets = async (req,res)=>{

try{

const {

search,
status,
page=1,
limit=3

}=req.query;

let filter={};

if(search){

filter.$or=[

{
ticket_id:{
$regex:search,
$options:"i"
}
},

{
customer_name:{
$regex:search,
$options:"i"
}
},

{
customer_email:{
$regex:search,
$options:"i"
}
},

{
subject:{
$regex:search,
$options:"i"
}
},

{
description:{
$regex:search,
$options:"i"
}
}

];

}

if(status){

filter.status=status;

}

const skip=

(Number(page)-1)

*

Number(limit);

const tickets=

await Ticket.find(filter)

.sort({

createdAt:-1

})

.skip(skip)

.limit(

Number(limit)

);

const totalTickets=

await Ticket.countDocuments(
filter
);

const openCount=

await Ticket.countDocuments({

status:"Open"

});

const progressCount=

await Ticket.countDocuments({

status:"In Progress"

});

const closedCount=

await Ticket.countDocuments({

status:"Closed"

});

res.status(200).json({

success:true,

tickets,

currentPage:

Number(page),

totalPages:

Math.ceil(

totalTickets/

Number(limit)

),

totalTickets,

stats:{

total:

openCount+

progressCount+

closedCount,

open:

openCount,

progress:

progressCount,

closed:

closedCount

}

});

}

catch(error){

console.log(error);

res.status(500).json({

message:"Server Error"

});

}

};


// SINGLE TICKET

const getSingleTicket = async (req,res)=>{

    try{

        const { ticketId } = req.params;

        const ticket =

        await Ticket.findOne({

            ticket_id:ticketId

        });

        if(!ticket){

            return res.status(404).json({

                message:
                "Ticket not found"

            });

        }

        res.status(200).json({

            success:true,

            ticket

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:
            "Server Error"

        });

    }

};


// UPDATE TICKET

const updateTicket = async (req,res)=>{

    try{

        const { ticketId } = req.params;

        const {

            status,

            note

        } = req.body;

        const ticket =

        await Ticket.findOne({

            ticket_id:ticketId

        });

        if(!ticket){

            return res.status(404).json({

                message:
                "Ticket not found"

            });

        }

        if(status){

            ticket.status=status;

        }

        if(note){

            ticket.notes.push({

                text:note

            });

        }

        await ticket.save();

        res.status(200).json({

            success:true,

            ticket

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:
            "Server Error"

        });

    }

};


// DELETE TICKET

const deleteTicket = async (req,res)=>{

    try{

        const { id } = req.params;

        const deletedTicket =

        await Ticket.findOneAndDelete({

            ticket_id:id

        });

        if(!deletedTicket){

            return res.status(404).json({

                message:
                "Ticket not found"

            });

        }

        res.status(200).json({

            message:
            "Ticket deleted"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:
            "Delete failed"

        });

    }

};


// EXPORT CSV

const exportTickets = async (req,res)=>{

    try{

        const tickets =

        await Ticket.find();

        const fields=[

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

        return res.send(csv);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:
            "Export failed"

        });

    }

};


module.exports={

createTicket,

getTickets,

getSingleTicket,

updateTicket,

deleteTicket,

exportTickets

};
