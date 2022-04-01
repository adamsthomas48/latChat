import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { TopNav } from '../common/topNav';
import { Input } from '../common/input';
import { useParams } from 'react-router-dom';
import { useMessages } from '../../utils/use_messages';

export const ChatRoom = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);
  const messagesRef = useRef(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState('');
  const [contents, setContents] = useState('');
  const [messages, sendMessage] = useMessages(chatRoom);

  const {id} = useParams();

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    const room = await api.get(`/chat_rooms/${id}`);
    setChatRoom(room.chatRoom);
    scrollToBottom

    setLoading(false);
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  



  return (
    <div>
      <TopNav/>
      <div className="p-4 body">
        <div className="fixed">
          <h1>ChatRoom: {chatRoom.name}</h1>
          <hr />

        </div>
        <div className="chat-box">
            {messages.map((message) => (
                <div>
                    {message.userId == user.id && (
                      <div>
                            <div key={message.id} className="message-line-user">
                            
                                
                                <div className="user-message">
                                    
                                    <p>{message.contents}</p>
                                </div>
                            </div>
                            <div className="user">{message.userName}</div>
                        </div>
                    )}
                    {message.userId != user.id && (
                      <div>
                        <div key={message.id} className="message-line">
                        
                            <div className="message">
                                
                                <p>{message.contents}</p>
                            </div>
                        </div>
                            <div className="user-recieved">{message.userName}</div>
                      </div>
                    )}
                    
                </div>
            ))}
            <div ref={messagesRef} />
        </div>
        <div className="bottom-bar">
            <div className="send-field">
                <input className="send" type="text" placeholder="Send Message" value={contents} onChange={(e) => setContents(e.target.value)} />
            </div>
            
            <button className="send-button" type="submit" onClick={() => sendMessage(contents, user)}>Send</button>
            
        </div>
        
      </div>
    </div>
  );
};
