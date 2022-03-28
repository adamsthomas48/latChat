import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { TopNav } from '../common/topNav';
import { Input } from '../common/input';
import { useParams } from 'react-router-dom';

export const ChatRoom = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState('');

  const {id} = useParams();

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    const room = await api.get(`/chat_rooms/${id}`);
    setChatRoom(room.chatRoom);
    console.log(room);


    setLoading(false);
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <TopNav/>
      <div className="p-4 body">
        <h1>ChatRoom: {chatRoom.name}</h1>
        <div className="bottom-bar">
            <div className="send-field">
                <input className="send" type="text" placeholder="Send Message" />
            </div>
            <div className="send-button">
                <button className="center" type="submit">Send</button>
            </div>
        </div>
        
      </div>
    </div>
  );
};
