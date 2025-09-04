'use client'

import { useEffect, useState } from "react";
import { useUser } from "../../../../hooks/user.hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { validatePhone } from "../_local_utils/validate-phone.utils";

const formStyles = "font-sans h-full text-center mx-auto flex flex-col items-center justify-evenly";
const inputStyles = "bg-white p-1 my-2 border-[1px] rounded-[12px] border-gray-400";


export function PhoneNumberForm() {
    const { userData, setter } = useUser();
    const [phoneNum, setPhoneNum] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if(userData.phoneNumber) {
            router.push('/')
        }
    },[userData])


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!validatePhone(phoneNum)) {
            setError('your phone number must start with +98 or 0 or 0098 and must have 9 digits  after that')
            return;
        }
        try {
            setError('')
            setLoading(true)
            const response: Response = await fetch("https://randomuser.me/api/?results=1&nat=us");
            const result = await response.json();

            if (response.ok) {

                const target = result.results[0]
                userData.phoneNumber = phoneNum;
                userData.name = target.name.first + " " + target.name.last
                userData.email = target.email
                userData.picture = target.picture.large

                setter(userData)
                router.push("/")
            }
        }
        catch (e: any) {
            setError(e.message)
        }
        finally {
            setLoading(false)
        }
    }

    const handleChangePhoneNumber = (e: { target: { value: string } }) => {
        setPhoneNum(e.target.value)
    }

    return <form
        onSubmit={handleSubmit}
        className={formStyles}
    >
        <div>
            <h4 className="my-5">Please Enter Your Phone Number:</h4>

            <input
                className={inputStyles}
                value={phoneNum}
                onChange={handleChangePhoneNumber}
            />
        </div>

        <Button disabled={loading} label="Submit" />

        {error && <div className="bg-red-500 text-white p-[12px] my-[12px] rounded-[12px]">
            {error}
        </div>}
    </form>
}