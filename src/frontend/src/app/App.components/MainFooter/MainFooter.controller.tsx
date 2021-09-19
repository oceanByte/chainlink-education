import React from 'react'

import { ViewMainFooter } from './MainFooter.view'
import {useSelector} from "react-redux";
import {State} from "../../../reducers";

export const MainFooter = () => {
    const user = useSelector((state: State) => state.auth.user)

    return (<ViewMainFooter user={user} />)
}
