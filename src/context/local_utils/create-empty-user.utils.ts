import { User } from "@/app/_interface/user.interface";

export function createEmptyUser(): User {
    return {
        name: "",
        email: "",
        phoneNumber: "",
        picture: "",
    }
}