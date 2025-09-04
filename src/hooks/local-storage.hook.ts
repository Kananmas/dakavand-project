'use client'

export function useLocalStorage() {
    const getAsString = (name:string) => localStorage.getItem(name)
    const dispachSotrageEvent = () => dispatchEvent(new Event('storage'))

    const getAsValue = (name:string) => {
        const item = localStorage.getItem(name)
        if(!item) return null;
        return JSON.parse(item);
    }


    const set = (name:string , value:any) => {
        localStorage.setItem(name , JSON.stringify(value));
        dispachSotrageEvent()
    }


    const clear = () => {
        localStorage.clear()
        dispachSotrageEvent()
    }

    const remove = (name:string) => {
        localStorage.removeItem(name)
        dispachSotrageEvent()
    }

    return {
        getAsString , 
        getAsValue , 
        set , 
        remove ,
        clear ,
    }
}