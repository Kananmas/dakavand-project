export async function fetchUserService (phoneNumber:string) {
    const response: Response = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const result = await response.json();

    if (response.ok) {

        const target = result.results[0]

        return {
            ok:response.ok,

            phoneNumber,
            name: target.name.first + " " + target.name.last,
            email: target.email,
            picture: target.picture.large
        }
    }


    return {
        ok:response.ok,

        phoneNumber,
        name: '',
        email: '',
        picture: ''
    }
}