'use client'

import { useState } from "react";
import { useUser } from "../../../../hooks/user.hooks";
import { useRouter } from "next/navigation";

const formStyles = "font-sans w-[500px] h-[500px] text-center mx-auto flex flex-col items-center justify-evenly";
const inputStyles = "bg-white p-1 my-2 border-[1px] rounded-[12px] border-gray-400";
const buttonStyles = "bg-amber-800 text-amber-50 p-3 rounded-[12px] hover:bg-blue-400 disabled:bg-gray-400"


export function PhoneNumberForm() {
    const { getter, setter } = useUser();
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
                let value = getter();
                const target = result.results[0]
                value.phoneNumber = phoneNum;
                value.name = target.name.first + " " + target.name.last
                value.email = target.email
                value.picture = target.picture.large

                setter(value)
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

        <button className={buttonStyles} disabled={loading}>
            Submit
        </button>
    </form>
}