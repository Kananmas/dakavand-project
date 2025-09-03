'use client'

import { useUser } from "@/hooks/user.hooks";
import { PhoneNumberForm } from "./_local_components/PhoneNumberForm";

export default function page() {
    const {getter} = useUser();
    const data = getter();
    
    return <>
        <PhoneNumberForm />
    </>
}