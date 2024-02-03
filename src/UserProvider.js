import React, { useState, useEffect, createContext } from 'react'

export const UserContext = createContext();

export const UserProvider = props => {

    const [User, setUser] = useState(null)

    return(
        <UserContext.Provider value={{ User }}>
            {props.children}
        </UserContext.Provider>
    );
}