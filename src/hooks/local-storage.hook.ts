export function useLocalStorage() {
    const getAsString = (name:string) => localStorage.getItem(name)

    const getAsValue = (name:string) => {
        const item = localStorage.getItem(name)
        if(!item) return null;
        return JSON.parse(item);
    }


    const set = (name:string , value:any) => {
        localStorage.setItem(name , JSON.stringify(value));
    }


    return {
        getAsString , 
        getAsValue , 
        set
    }
}