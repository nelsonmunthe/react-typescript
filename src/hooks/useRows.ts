import axios from "axios";
import { useState } from "react";
import { getToken } from "../component/helpers/token";
import { axiosPrivate } from "../component/helpers/axiosAuth";

const { REACT_APP_API_URL } = process.env

const useRows = () => {

    const [rows, setRows] = useState([]);
    const [totalRow, setTotalRow] = useState(0);
    const [paginate, setPaginate] = useState({page: 0, per_page: 10})
    const token:any = getToken('accessToken')

    const getRows = async (url:string) => {
       
        try {
            const params = `page=${paginate.page}&per_page=${paginate.per_page}`
            const response = await axiosPrivate.get(`${REACT_APP_API_URL}${url}?${params}`);
    
            if(response.data.success){
                setRows(response.data.data.rows)
                setTotalRow(response.data.data.count)
            }
            
        } catch (error) {
            console.log('raws error', error)   
        }
    }
    
    return {
        rows,
        getRows,
        totalRow,
        paginate,
        setPaginate
    }

};

export default useRows;

