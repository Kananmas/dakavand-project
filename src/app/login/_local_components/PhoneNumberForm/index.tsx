'use client'

import { useEffect, useState } from "react";
import { useUser } from "../../../../hooks/user.hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import { validatePhone } from "../_local_utils/validate-phone.utils";
import { fetchUserService } from "../_local_services/fetch-user.service";

const formStyles = "font-sans h-full text-center mx-auto flex flex-col items-center justify-evenly";
const inputStyles = "bg-white p-1 my-2 border-[1px] rounded-[12px] border-gray-400";
const errorBoxStyles = "max-w-[98%] absolute left-[4px] top-[4px] bg-red-500 text-white p-[12px] my-[12px] rounded-[12px] flex flex-col"

export function PhoneNumberForm() {
    const { userData, setter } = useUser();
    const [phoneNum, setPhoneNum] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (userData.phoneNumber) {
            router.push('/')
        }
    }, [userData])


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!validatePhone(phoneNum)) {
            setError('Phone Number Must Start With +98 or 0 or 0098 And Have 7 Digits After That')
            return;
        }
        try {
            setError('')
            setLoading(true)
            const result = await fetchUserService(phoneNum);

            if (result.ok) {

                userData.phoneNumber = result.phoneNumber;
                userData.name = result.name;
                userData.email = result.email;
                userData.picture = result.picture

                setter(userData)
                router.push("/")

                return
            }
            setError("Something Went Wrong While Logging In")
        }
        catch (e: any) {
            setError(e.message)
        }
        finally {
            setLoading(false)
        }
    }

    const handleChangePhoneNumber = (e: { target: { value: string } }) => {
        const pattern = /^\+?\d{0,14}$/
        if (!pattern.test(e.target.value)) return;
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

        {error && <div className={errorBoxStyles}>
            <div className="flex justify-between w-full items-center">
                <h1 className="font-bold text-[15px] text-left">Error:</h1>
                <button
                    onClick={() => setError('')}
                    type="button"
                    className="w-8 h-8 flex items-center justify-center rounded-full 
                     text-black
                     cursor-pointer transition-colors"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
            <div>
                {error}
            </div>
        </div>}
    </form>
}