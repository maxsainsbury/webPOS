import {useState} from "react";


export const useOrderTypes = () => {
    const [orderTypes, setOrderTypes] = useState([]);
    return { orderTypes, setOrderTypes };
}