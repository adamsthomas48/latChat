import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const RoomCard = ({ room, userLat, userLong }) => {
    const [distance, setDistance] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const getDistance = async () => {
        let longRad = room.longitude * Math.PI / 180;
        let userLongRad = userLong * Math.PI / 180;
        let latRad = room.latitude * Math.PI / 180;
        let userLatRad = userLat * Math.PI / 180;

        let dlon = longRad - userLongRad;
        let dlat = latRad - userLatRad;
        let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(latRad) * Math.cos(userLatRad)
                                                * Math.pow(Math.sin(dlon / 2), 2);

        let c = 2 * Math.asin(Math.sqrt(a));

        let r = 6371;

        let dist = Math.round(c * r);
        setDistance(dist);
    }

    useEffect(async  => {
        getDistance();

        setLoading(false);

    }, []);

    if(loading){
        return(
            <div>Loading</div>
        )
    }

    if(distance > 10){
        return (<div className="hidden"></div>);
    }

    
    return (
        <div className="room-card" onClick={() => navigate(`/chatroom/${room.id}`)}>
            <h2>{room.name}</h2>
            <p>{distance} Miles Away</p>
            

        </div>
    );
};