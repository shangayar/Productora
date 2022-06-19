import { createUserWithEmailAndPassword } from "firebase/auth"
import { createContext, useState } from "react"
import { auth } from "./firebase"

export const UserContext = createContext();

const RegisterUser = () => {
    const [user, setUser] = useState(false);
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    return (
        <UserContext.Provider value={{ user, setUser, createUser }}>
        </UserContext.Provider>
    );
}
export default RegisterUser;
