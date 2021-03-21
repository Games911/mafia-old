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

router.post("/:roomId/add-user", async (req, res) => {
    try {
        const room = await roomController.addUser(req.params.roomId, req.body.userId);
        res.status(200).json({
            message: "User added successfully",
            room: room
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.get("/:roomId/out/:userId", async (req, res) => {
    try {
        const room = await roomController.outRoom(req.params.roomId, req.params.userId);
        res.status(200).json({
            message: "Successfull went out",
            room: room
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.get("/is-user-busy/:userId", async (req, res) => {
    try {
        const isBusy = await roomController.isUserBusy(req.params.userId);
        res.status(200).json({
            message: "Result if user busy",
            isBusy: isBusy
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;