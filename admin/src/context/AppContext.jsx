import { createContext } from "react";

export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const calculateAge=(dob)=>{
        const today=new Date()
        // console.log(today)
        const birDate=new Date(dob)
        // console.log(birDate)
        let age=today.getFullYear()-birDate.getFullYear()
        return age;
    }
    const value={
        calculateAge
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider