import { useContext, useEffect, useState, useRef, React } from 'react';
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
  const messageEl = useRef(null);
 

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState('');
  const [contents, setContents] = useState('');
  const [messages, sendMessage] = useMessages(chatRoom);

  const {id} = useParams();

  const scrollToBottom = () => {
    messageEl.current.scrollIntoView({ behavior: "smooth" })
  }


  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    const room = await api.get(`/chat_rooms/${id}`);
    setChatRoom(room.chatRoom);
    
    scrollToBottom;

    setLoading(false);
    scrollToBottom();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  
const send = (e) => {
  if(contents != '' && e.key == 'Enter'){
    sendMessage(contents, user);
    setContents('');
    scrollToBottom();
  }
} 


  return (
    <div>
      <TopNav/>
      <div className="p-4 body">
        <div className="chat-title">
          <h1>ChatRoom: {chatRoom.name}</h1>
          <hr />

        </div>
        
        <div className="chat-box" >
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
            <div />
        </div>
        <div ref={messageEl} />
        <div className="bottom-bar">
            <div className="send-field">
                <input className="send" type="text" placeholder="Send Message" value={contents} onKeyPress={(e) => send(e)} onChange={(e) => setContents(e.target.value)} />
            </div>
            
            <button className="send-button" type="submit" onClick={() => {
              sendMessage(contents, user)
              setContents('');
              scrollToBottom();
              }}>Send</button>
            
        </div>
        
      </div>
    </div>
  );
};
