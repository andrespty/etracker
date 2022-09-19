import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { fetch_url } from "../../App";
import { createCategory } from "../actions/category.actions";
import { getUserData } from "../selectors/user.selectors";

export const createNewCategory = (category: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatchEvent, getState) => {

    const user = getUserData(getState())

    axios.post(`${fetch_url}/category/`, {name: category, creator: user.id })
    .then((response): JSONResponse<ICategory> => response.data)
    .then(json => {
        console.log(json.data)
        dispatchEvent(createCategory(json.data))
        setLoading(false)
    })  
    .catch(e => console.log(e))
}

