'use client'

import { useState } from "react";
import { useUser } from "../../../../hooks/user.hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";

const formStyles = "font-sans w-[500px] h-[500px] text-center mx-auto flex flex-col items-center justify-evenly";
const inputStyles = "bg-white p-1 my-2 border-[1px] rounded-[12px] border-gray-400";


export function PhoneNumberForm() {
    const { userData, setter } = useUser();
    const [phoneNum, setPhoneNum] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
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
            console.log(e.message)
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

        <Button disabled={loading} label="Submit"/>
    </form>
}