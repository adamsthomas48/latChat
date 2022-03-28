import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { TopNav } from '../common/topNav';
import { Input } from '../common/input';

export const ChatRoom = () => {
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

    setLoading(false);
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <TopNav/>
      <div className="p-4 body">
        <h1>ChatRoom</h1>
        
      </div>
    </div>
  );
};
