// import React, { useState } from 'react';
// import { deleteRoom, updateRoom } from './api';

// const RoomDetails = ({ room, onUpdate }) => {
//   const [roomName, setRoomName] = useState(room.name);
//   const [capacity, setCapacity] = useState(room.capacity);
//   const [message, setMessage] = useState('');

//   const handleUpdateRoom = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await updateRoom(room.id, roomName, capacity);
//       setMessage('Room updated successfully!');
//       onUpdate(); // Notify the parent component to fetch the updated rooms
//     } catch (error) {
//       setMessage(error.response?.data?.detail || 'Failed to update room.');
//     }
//   };

//   const handleDeleteRoom = async () => {
//     try {
//       await deleteRoom(room.id);
//       setMessage('Room deleted successfully!');
//       onUpdate(); // Notify the parent component to fetch the updated rooms
//     } catch (error) {
//       console.error('Failed to delete room:', error);
//       setMessage(error.response?.data?.detail || 'Failed to delete room.');
//     }
//   };

//   return (
//     <div>
//       <h3>Room Details</h3>
//       <form onSubmit={handleUpdateRoom}>
//         <input
//           type="text"
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           placeholder="Room Name"
//           required
//         />
//         <select
//           value={capacity}
//           onChange={(e) => setCapacity(parseInt(e.target.value))}
//         >
//           <option value={2}>2 players</option>
//           <option value={3}>3 players</option>
//           <option value={4}>4 players</option>
//         </select>
//         <button type="submit">Update Room</button>
//       </form>
//       <button onClick={handleDeleteRoom}>Delete Room</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default RoomDetails;





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRoom, deleteRoom, updateRoom } from './api';

const RoomDetails = ({ onUpdate }) => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [capacity, setCapacity] = useState(2);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const roomData = await fetchRoom(id);
        setRoom(roomData);
        setRoomName(roomData.name);
        setCapacity(roomData.capacity);
      } catch (error) {
        console.error('Failed to fetch room details:', error);
      }
    };

    getRoomDetails();
  }, [id]);

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRoom(id, roomName, capacity);
      setMessage('Room updated successfully!');
      onUpdate(); // Notify the parent component to fetch the updated rooms
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Failed to update room.');
    }
  };

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom(id);
      setMessage('Room deleted successfully!');
      onUpdate(); // Notify the parent component to fetch the updated rooms
    } catch (error) {
      console.error('Failed to delete room:', error);
      setMessage(error.response?.data?.detail || 'Failed to delete room.');
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Room Details</h3>
      <form onSubmit={handleUpdateRoom}>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room Name"
          required
        />
        <select
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
        >
          <option value={2}>2 players</option>
          <option value={3}>3 players</option>
          <option value={4}>4 players</option>
        </select>
        <button type="submit">Update Room</button>
      </form>
      <button onClick={handleDeleteRoom}>Delete Room</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RoomDetails;
