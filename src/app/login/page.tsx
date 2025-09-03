import { UserProvider } from "../../context/User/user.provider";

export default function page() {
    
    return <>
     <UserProvider>
        Hello
     </UserProvider>
    </>
}