// import React, { useEffect, useState } from 'react';
// import { fetchRooms, deleteRoom, updateRoom, createRoom } from './api';
// import RoomDetails from './RoomDetails';

// const GameRooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [roomName, setRoomName] = useState('');
//   const [capacity, setCapacity] = useState(2);
//   const [message, setMessage] = useState('');
//   const [editingRoom, setEditingRoom] = useState(null); // for update room
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   useEffect(() => {
//     checkAuthStatus();
//     fetchRoomsList();
//   }, []);

//   const fetchRoomsList = async () => {
//     try {
//       const roomsData = await fetchRooms();
//       setRooms(roomsData);
//     } catch (error) {
//       console.error('Failed to fetch rooms:', error);
//     }
//   };

//   const checkAuthStatus = () => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   };

//   const handleCreateRoom = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await createRoom(roomName, capacity);
//       setMessage('Room created successfully!');
//       setRoomName('');
//       setCapacity(2);
//       fetchRoomsList(); // Refresh the rooms list
//     } catch (error) {
//       setMessage(error.response?.data?.detail || 'Failed to create room.');
//     }
//   };

//   const handleUpdateRoom = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await updateRoom(editingRoom.id, roomName, capacity);
//       setMessage('Room updated successfully!');
//       setEditingRoom(null);
//       setRoomName('');
//       setCapacity(2);
//       setSelectedRoom(null); 
//       fetchRoomsList(); // Refresh the rooms list
//     } catch (error) {
//       setMessage(error.response?.data?.detail || 'Failed to update room.');
//     }
//   };

//   const handleRoomUpdate = () => {
//     setSelectedRoom(null); // Reset the selected room
//     fetchRoomsList(); // Fetch the updated rooms
//   };


//   const handleDeleteRoom = async (roomId) => {
//     try {
//       await deleteRoom(roomId);
//       fetchRoomsList(); // Refresh the rooms list
//     } catch (error) {
//       console.error('Failed to delete room:', error);
//     }
//   };

//   const handleEditRoom = (room) => {
//     setEditingRoom(room);
//     setRoomName(room.name);
//     setCapacity(room.capacity);
//   };

//   const handleEnterRoom = (room) => {
//     setSelectedRoom(room);
//   };


//   return (
//     <div>
//       <h2>Game Rooms</h2>
//       {isAuthenticated && !selectedRoom && (
//         <div>
//           <h3>{editingRoom ? 'Edit Room' : 'Create Room'}</h3>
//             <form onSubmit={editingRoom ? handleUpdateRoom : handleCreateRoom}>
//                 <input
//                 type="text"
//                 value={roomName}
//                 onChange={(e) => setRoomName(e.target.value)}
//                 placeholder="Room Name"
//                 required
//                 />
//                 <select
//                 value={capacity}
//                 onChange={(e) => setCapacity(parseInt(e.target.value))}
//                 >
//                 <option value={2}>2 players</option>
//                 <option value={3}>3 players</option>
//                 <option value={4}>4 players</option>
//                 </select>
//                 <button type="submit">{editingRoom ? 'Update Room' : 'Create Room'}</button>
//             </form>
//           {message && <p>{message}</p>}
//         </div>
//       )}
//       {selectedRoom && (
//         <RoomDetails room={selectedRoom} onUpdate={handleRoomUpdate} />
//       )}
//       <ul>
//         {rooms.map(room => (
//           <li key={room.id}>
//             {room.name} - {room.capacity} players
//             {isAuthenticated && room.created_by === localStorage.getItem('userId') && (
//               <div>
//                 <button onClick={() => handleEditRoom(room)}>Edit</button>
//                 <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GameRooms;












import React, { useEffect, useState } from 'react';
import { fetchRooms, deleteRoom, createRoom } from './api';
import { Link } from 'react-router-dom';

const GameRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [capacity, setCapacity] = useState(2);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkAuthStatus();
    fetchRoomsList();
  }, []);

  const fetchRoomsList = async () => {
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await createRoom(roomName, capacity);
      setMessage('Room created successfully!');
      setRoomName('');
      setCapacity(2);
      fetchRoomsList();
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Failed to create room.');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoom(roomId);
      fetchRoomsList();
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  return (
    <div>
      <h2>Game Rooms</h2>
      {isAuthenticated && (
        <div>
          <h3>Create Room</h3>
          <form onSubmit={handleCreateRoom}>
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
            <button type="submit">Create Room</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} - {room.capacity} players
            {isAuthenticated && (
              <div>
                <Link to={`/room/${room.id}`}>Enter</Link>
                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameRooms;


