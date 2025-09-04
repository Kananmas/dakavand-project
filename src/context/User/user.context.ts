'use client'

import { User } from "@/interfaces/user.interface";
import { createContext } from "react";
import { createEmptyUser } from "../../lib/utils/create-empty-user.utils";

let userData: User = createEmptyUser();


const setter = (value:User) => {
    userData = {...value , ...userData}
} 


export const UserContext = createContext({userData , setter});