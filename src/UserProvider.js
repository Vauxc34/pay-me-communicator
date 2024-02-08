import React, { useState, useEffect, createContext } from 'react'
export const UserContext = createContext();

export const UserProvider = props => {

    const [User, setUser] = useState(JSON.parse(localStorage.getItem("User")) ?? null)
    useEffect(() => { localStorage.setItem("User", JSON.stringify(User)) }, [User])

        const ConversationSetter = (setAllChatsSingle, idUser, IdConf) => {
        fetch(`${process.env.REACT_APP_API_URL}conversations/message/${idUser}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idConf: IdConf
            })
        }).then(res => res.json()).then(data => setAllChatsSingle(data.content[0]))}

    return(
        <UserContext.Provider value={{ User, setUser, ConversationSetter }}>
            {props.children}
        </UserContext.Provider>
    );
}