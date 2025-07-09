import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";


const MyState = ({ children }) => {

    return (
        <MyContext.Provider
            value={{ }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyState;
