import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReservation } from '../features/reserves/reserveSlice';
import { getNotifs } from "../features/notifs/notifSlice";
import { getMe, reset } from "../features/auth/authSlice";
import NotificationCell from "./NotificationCell";

function NotificationContent({reserves}) {

    const dispatch = useDispatch()

    const { notifs } = useSelector((state) => state.notif)

    useEffect(() => {

        const resid = reserves._id
        dispatch(getNotifs(resid))

        return () => {
            dispatch(reset())
        };
    }, [dispatch]);

    return ( 
    <>
        {notifs.map((notif) => (
            <NotificationCell key={notif._id} notifs={notif}/>
        ))}
    </>
    );
}

export default NotificationContent;