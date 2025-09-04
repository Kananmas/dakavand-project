'use client'

import { useLocalStorage } from "@/hooks/local-storage.hook";
import { useUser } from "@/hooks/user.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "./_components/Button";

export default function Home() {
  const router = useRouter();
  const { getAsValue, remove } = useLocalStorage();
  const { userData: user } = useUser();

  const handleClickLogout = () => {
    remove('user')
    router.push('/login')
  }

  useEffect(() => {
    const user = getAsValue('user');
    if (!user) router.push('/login')
  }, [user])

  return (
    <div className="flex flex-col justify-center items-center h-[700px]">
      {
        user.phoneNumber && <img
          className="dark:invert rounded-[50%]"
          width={250}
          height={250}
          alt={user.name}
          src={user.picture}
        />
      }
      <h1 className="font-bold text-[45px] my-[15px]">{user.name}</h1>
      <div>
        <Button label="Logout" onClick={handleClickLogout} />
      </div>
    </div>
  );
}
