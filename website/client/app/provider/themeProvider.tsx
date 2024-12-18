import { ReactNode , createContext , useState , Dispatch , SetStateAction, useEffect } from "react";
import { useParams } from "next/navigation";

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

    const param = useParams()
    const [ isDark , setIsDark ] = useState<boolean>(false)
    const [ isMenuOpen , setIsMenuOpen ] = useState<boolean>(false)

    useEffect(() => {
        setIsMenuOpen(false)    
    },[param])

    return (
        <themeContext.Provider value={{ isDark , setIsDark , isMenuOpen , setIsMenuOpen }}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeProvider
export { themeContext }