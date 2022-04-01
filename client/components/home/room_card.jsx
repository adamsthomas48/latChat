import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { ChatRoom } from '../chat_room/chat_room';
import { Button } from '../common/button';


export const RoomCard = ({ room, user, userLat, userLong }) => {
    const [loading, setLoading] = useState(true);
    const [chatRoom, setChatRoom] = useState(room);
    const [deleted, setDeleted] = useState(false);
    const [distance, setDistance] = useState(null);
    
    const api = useContext(ApiContext);

    const navigate = useNavigate();


    const getDistance = async () => {
        var longRad = room.longitude * Math.PI / 180;
        var userLongRad = userLong * Math.PI / 180;
        var latRad = room.latitude * Math.PI / 180;
        var userLatRad = userLat * Math.PI / 180;

        var dlon = longRad - userLongRad;
        var dlat = latRad - userLatRad;

        var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(latRad) * Math.cos(userLatRad)
                                                * Math.pow(Math.sin(dlon / 2), 2);

        var c = 2 * Math.asin(Math.sqrt(a));

        var r = 6371;

        var dist = Math.round(c * r);
        
        setDistance(dist);
    }

    useEffect(async  => {
        console.log(userLat);
        getDistance();
        setChatRoom(room);
        
        
        setLoading(false);
    }, []);

    if(loading){
        return(
            <div>Loading</div>
        )
    }
    if(deleted){
        return(<div className="hidden"></div>);
    }

    if(distance > 100){
        return (<div className="hidden"></div>);
    }

    const deleteRoom = async (project) => {
        const { success } = await api.del(`/chat_rooms/${room.id}`);
        setDeleted(true);

    }

    
    return (
        <div className="room-card flex" >
            <div className="flex-1 flex" onClick={() => navigate(`/chatroom/${room.id}`)}>
                <h3 className="flex-2">{room.name}</h3>
                <p className="flex-1 text-right">{distance} Miles Away</p>
            </div>
            {user.id == room.userId && (
                <Button onClick={deleteRoom}>Delete</Button>
            )}

            

        </div>
    );
};