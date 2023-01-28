import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifs, getVenicNotifs } from "../features/notifs/notifSlice";
import { reset } from "../features/auth/authSlice";
import NotificationCell from "./NotificationCell";

function NotificationContent({reserves}) {

    const dispatch = useDispatch()

    const { notifs, venicNotifs } = useSelector((state) => state.notif)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {

        const resid = reserves._id

        if(user.role === 'Student Officer' || user.role === 'Faculty'){
            dispatch(getNotifs(resid))
        }else if(user.role === 'Outdoor Stage In-Charge'){
            dispatch(getVenicNotifs(resid))
        }

        return () => {
            dispatch(reset())
        };

    }, [dispatch, reserves, user]);

    let role
    if(user.role === 'Student Officer' || user.role === 'Faculty'){
        role = 'user'
    }else if(user.role === 'Outdoor Stage In-Charge'){
        role = 'venic'
    }


    return (
    <>
        {role === 'user' ? (<>
            {notifs.length > 0 ? (<>
                {notifs.map((notif) => (
                <NotificationCell key={notif._id} notifs={notif} />
                ))}
            </>) : (<>
                <h3 className="notif-none">No Notifications Found</h3>
            </>
            )}
        </>) : (<>{role === 'venic' ? (<>
            {venicNotifs.length > 0 ? (<>
                {venicNotifs.map((notif) => (
                <NotificationCell key={notif._id} notifs={notif} />
                ))}
            </>) : (<>
                <h3 className="notif-none">No Notifications Found</h3>
            </>
            )}
        </>) : (<h3 className="notif-none">No Notifications Found</h3>)}</>)}
        
        
    </>
    );
}

export default NotificationContent;