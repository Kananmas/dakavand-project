import { useContext } from "react";
import { UserContext } from "../context/User/user.context";

export function useUser() {
    const context = useContext(UserContext);

    return context;
}