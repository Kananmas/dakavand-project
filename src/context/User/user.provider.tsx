'use client'

import { useEffect, useState } from "react";
import { UserContext } from "./user.context";
import { User } from "@/app/_interface/user.interface";
import { useLocalStorage } from "@/hooks/local-storage.hook";
import { createEmptyUser } from "../local_utils/create-empty-user.utils";

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { getAsValue, set } = useLocalStorage();
    const [context, setContext] = useState<User>(createEmptyUser())

    useEffect(() => {
        const checkForValue = () => {
            let value: User | null = getAsValue('user')
            if (value) {
                setContext(getAsValue('user'))
                return
            }
            setContext(createEmptyUser())
        }

        checkForValue();

        window.addEventListener('storage', checkForValue)

        return () => {
            window.removeEventListener('storage', checkForValue)
        }

    }, [])

    const setter = (value: User) => {
        set('user', value)
        setContext(value)
    };

    return <UserContext.Provider value={{ userData: context, setter }}>
        {children}
    </UserContext.Provider>

}
