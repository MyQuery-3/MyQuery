import { ReactNode , createContext , useState , Dispatch , SetStateAction, useEffect } from "react";

interface ThemeContextType {
    isDark : boolean
    setIsDark : Dispatch<SetStateAction<boolean>>
    isMenuOpen : boolean
    setIsMenuOpen : Dispatch<SetStateAction<boolean>>
}

const themeContext = createContext<ThemeContextType>({
    isDark : true,
    setIsDark : () => {},
    isMenuOpen : false,
    setIsMenuOpen : () => {}
})

function ThemeProvider({children} : {children : ReactNode}){

    const [ isDark , setIsDark ] = useState<boolean>(true)
    useEffect(() => {
        console.log(isDark);
        
    },[isDark])

    const [ isMenuOpen , setIsMenuOpen ] = useState<boolean>(false)

    return (
        <themeContext.Provider value={{ isDark , setIsDark , isMenuOpen , setIsMenuOpen }}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeProvider
export { themeContext }