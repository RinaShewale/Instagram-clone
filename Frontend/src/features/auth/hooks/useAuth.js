import { useContext } from "react";
import { Authcontext } from "../Auth.Context";

export function useAuth(){
    const Context= useContext(Authcontext)
    return Context
}