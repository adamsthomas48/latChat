import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Ping } from './ping';
import { TopNav } from '../common/topNav';
import { Input } from '../common/input';
import { RoomCard } from './room_card';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    navigator.geolocation.getCurrentPosition((location) => {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

    }, (err) => {
      console.log(err);
    });

    const rooms = await api.get('/chat_rooms');
    setChatRooms(rooms.chatRooms);
    console.log(rooms);

    setLoading(false);
  }, [latitude]);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading || latitude == null || longitude == null) {
    return <div>Loading...</div>;
  }


  const createChatRoom = async () => {
    if(roomName == ''){
      setErrorMessage('Room Name Cannot Be Empty');
      return;
    }

    var userId = user.id;
    const { chatRoom } = await api.post('/chat_rooms', {
      roomName,
      latitude,
      longitude,
      userId,
    });
    setChatRooms([...chatRooms, chatRoom]);
  };

  return (
    <div>
      <TopNav/>
      <div className="p-4 body">
        <h1>Welcome {user.firstName}</h1>
        {roles.includes('admin') && (
          <Button type="button" onClick={() => navigate('/admin')}>
            Admin
          </Button>
        )}
        <Input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        <Button type="button" onClick={createChatRoom}>Create New Room</Button>
        <div>{errorMessage}</div>
        <h2>Chat Rooms Near You</h2>
        {chatRooms.map((room) => (
          
          <RoomCard key={room.id} onClick={() => navigate(`/chatroom/${room.id}`)} room={room} user={user} userLat={latitude} userLong={longitude}/>
        ))}
        
      </div>
    </div>
  );
};
