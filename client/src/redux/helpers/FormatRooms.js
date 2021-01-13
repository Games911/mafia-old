export const formatRooms = (rooms, currentRoomId) => {
    const roomsFormated = [];

    for (let i = 0; i <= rooms.length - 1; i++) {
        const current = rooms[i];
        if (current._id === currentRoomId) {
            roomsFormated.push(current);
            rooms.splice(i, 1);
        }
    }
    roomsFormated.push(...rooms);
    return roomsFormated;
};