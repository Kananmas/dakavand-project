import { useUser } from "../../../../hooks/user.hooks";

export function PhoneNumberPhone() {
    const {setter} = useUser();
    

    return <form>
        <h4>Please Enter Your Phone Number:</h4>    

        <input />

        <button>
            Submit
        </button>
    </form>
}