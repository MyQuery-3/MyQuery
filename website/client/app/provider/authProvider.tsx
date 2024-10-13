import { createContext , useState , Dispatch , SetStateAction, ReactNode } from "react";
 
type UseStateType<S> = [S, Dispatch<SetStateAction<S>>];

interface User {
    id : string
    name : string
    email : string
}

const authContext = createContext<UseStateType<null | User>>([null] as any);

function AuthProvider({children} : {children : ReactNode}){
    const [ user , setUser ] = useState<null | User>(null)
    return (
        <authContext.Provider value={[user , setUser ]}>
           {children}
        </authContext.Provider>
    )
}

export default AuthProvider
export { authContext }