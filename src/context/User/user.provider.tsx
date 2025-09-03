import { useEffect, useState } from "react";
import { UserContext } from "./user.context";
import { User } from "@/app/_interface/user.interface";
import { useLocalStorage } from "@/hooks/local-storage.hook";

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { getAsValue } = useLocalStorage();
    const [context, setContext] = useState<User>( {
        name: "",
        email: "",
        phoneNumber: "",
        picture: "",
    })

    useEffect(() => {
        setContext(getAsValue('user'))
    } , [])

    const getter = () => context;
    const setter = (value: User) => {
        setContext(value)
    };

    return <UserContext.Provider value={{ getter, setter }}>
        {children}
    </UserContext.Provider>

}
