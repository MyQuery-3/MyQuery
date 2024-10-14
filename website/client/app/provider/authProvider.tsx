import { createContext , useState , Dispatch , SetStateAction, ReactNode } from "react";
 
type UseStateType<S> = [S, Dispatch<SetStateAction<S>>];

interface User {
    id : string
    name : string
    email : string
}

interface AuthContextType {
    user : User | null
    setUser : Dispatch<SetStateAction<User | null>>
}

const authContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}
});

function AuthProvider({children} : {children : ReactNode}){
    const [ user , setUser ] = useState<null | User>(null)
    return (
        <authContext.Provider value={{ user , setUser}}>
           {children}
        </authContext.Provider>
    )
}

export default AuthProvider
export { authContext }