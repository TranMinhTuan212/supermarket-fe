import { Context } from "./context";
import { useContext } from "react";

export const useGlobalState = () => {
    return useContext(Context)
}