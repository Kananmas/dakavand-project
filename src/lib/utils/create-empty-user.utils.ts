import { User } from "@/interfaces/user.interface";

export function createEmptyUser(): User {
    return {
        name: "",
        email: "",
        phoneNumber: "",
        picture: "",
    }
}