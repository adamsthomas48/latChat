import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { ChatRoom } from '../chat_room/chat_room';


export const RoomCard = ({ room, user, userLat, userLong }) => {
    const [loading, setLoading] = useState(true);
    const [uLat, setULat] = useState(userLat);
    const [uLong, setULong] = useState(userLong);

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
        
        
        setLoading(false);
    }, []);

    if(loading){
        return(
            <div>Loading</div>
        )
    }

    if(distance > 10){
        //return (<div className="hidden"></div>);
    }

    const deleteRoom = async (project) => {
        const { success } = await api.del(`/chat_rooms/${room.id}`);

    }

    
    return (
        <div className="room-card" onClick={() => navigate(`/chatroom/${room.id}`)}>
            <h3>{room.name}</h3>
            <p>{distance} Miles Away</p>
            {user.id == room.userId && (
                <button className="delete" onClick={deleteRoom}>Delete</button>
            )}
            

        </div>
    );
};