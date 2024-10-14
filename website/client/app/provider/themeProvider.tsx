import { ReactNode , createContext , useState , Dispatch , SetStateAction, useEffect } from "react";

interface ThemeContextType {
    isDark : boolean
    setIsDark : Dispatch<SetStateAction<boolean>>
}

const themeContext = createContext<ThemeContextType>({
    isDark : true,
    setIsDark : () => {}
})

function ThemeProvider({children} : {children : ReactNode}){

    const [ isDark , setIsDark ] = useState<boolean>(true)
    useEffect(() => {
        console.log(isDark);
        
    },[isDark])


    return (
        <themeContext.Provider value={{ isDark , setIsDark }}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeProvider
export { themeContext }