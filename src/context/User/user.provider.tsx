'use client'

import { useEffect, useState } from "react";
import { UserContext } from "./user.context";
import { User } from "@/app/_interface/user.interface";
import { useLocalStorage } from "@/hooks/local-storage.hook";

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { getAsValue , set } = useLocalStorage();
    const [context, setContext] = useState<User>({
        name: "",
        email: "",
        phoneNumber: "",
        picture: "",
    })

    useEffect(() => {
        let value = getAsValue('user')
        if (value) {
            setContext(getAsValue('user'))
        }
    }, [])

    const setter = (value: User) => {
        set('user' , value)
        setContext(value)
    };

    return <UserContext.Provider value={{ userData:context , setter }}>
        {children}
    </UserContext.Provider>

}
