'use client'

import { User } from "@/app/_interface/user.interface";
import { createContext } from "react";

let userData: User = {
    name: "",
    email: "",
    phoneNumber: "",
    picture: "",
}


const setter = (value:User) => {
    userData = {...value , ...userData}
} 


export const UserContext = createContext({userData , setter});