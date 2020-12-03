const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/room/roomController');

router.post("/", async (req, res) => {
    try {
        const room = await roomController.createRoom(req.body.name, req.body.userId);
        res.status(201).json({
            message: "Created successfully",
            room: room
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const rooms = await roomController.getRooms();
        res.status(200).json({
            message: "Rooms",
            rooms: rooms
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});


module.exports = router;