import React, { useState } from 'react';


export const Context  = React.createContext();

export default function UserAuth({children}) {
  const getUser = () => {
    const userString = window.sessionStorage.getItem('avekshaaeasySWATUser');
    let user;
    if(userString !== null && userString !== undefined && userString !== ""){
      const userData = JSON.parse(userString);
      user = {
        isLogin: true,
        userData: userData
      }
    }
    else {
      user ={
        isLogin: false,
        userData: {}
      }
    }

    return user;
  };


  const [user, setUser] = useState(getUser());
    return (
        <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
    )

}