import React, { useRef, useContext } from 'react';
import {Context} from './UserAuth';
import IdleTimer from 'react-idle-timer';


export default function SessionValidation() {

    const [ user, setUser ]  = useContext(Context);

    const idleTimerRef = useRef(null);

    const onIdle = () => {
        if(user.isLogin){
            window.sessionStorage.setItem('avekshaaeasySWATUser', "");
            setUser({
                isLogin: false,
                userData: {}
            });
        }
    } 

    return(
        <div>
            <IdleTimer
                ref={idleTimerRef}
                timeout={1000 * 60 * 10}
                onIdle={onIdle}
            ></IdleTimer>
        </div>
    )
}