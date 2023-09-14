import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Form } from "react-router-dom";
import { axiosPrivate } from "../../component/helpers/axiosAuth";
const { REACT_APP_API_URL } = process.env;

const AddJounralEntry:React.FC = () => {
    const [option, setOption] = useState([])
    const onChangeLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('onchange', event)
    };

    const fetchLocation = async (type: string) => {
        try {
            const location = await axiosPrivate(`${REACT_APP_API_URL}/v1/api/realisasi-resource/${type}?keyword_subsidiary=${1}`);
            if(location.data.status) return  location.data.data
        } catch (error) {
            return [];
        }
    };

    const onFocustLocation = async (type: string) => {
        const location = await fetchLocation(type);
        console.log('location', location)
        setOption(location)
    }

    return(
        <div>
        <p className="text-lg font-medium  md:text-2xl mb-2">Input Journal Entry</p>
        <div className="flex flex-col gap-4">
            <Form method="POST">
                <div className="flex flex-col gap-8 text-sm p-2 border-dotted shadow-xl md:text-lg rounded-md xl:flex-row xl:text-lg">
                    <div className="basis-1/2">
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="tanggal_transaksi"
                                className="basis-3/12"
                            >
                                Transasction Date
                            </label>
                            <input 
                                disabled
                                type="text"
                                placeholder="Transaction Date"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            >
                            </input>
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="posting_date"
                                className="basis-3/12"
                            >
                                Posting Date
                            </label>
                            <input 
                                disabled
                                type="text"
                                placeholder="Posting Date"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            >
                            </input>
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="subsidary_name"
                                className="basis-3/12"
                            >
                                Subsidiary Name
                            </label>
                            <input
                                disabled
                                required
                                name="subsidary_name"
                                id="subsidary_name" 
                                type="text"
                                placeholder="Subsidiary Name"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            >
                            </input>
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="location"
                                className="basis-3/12"
                            >
                                Location
                            </label>
                            <select 
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                onChange={onChangeLocation}
                                onFocus={() => onFocustLocation('form-lokasi')}
                                autoComplete="on"
                            >
                                <option key=''>-- choose location --</option>
                                {
                                    option.map((item:any) => {
                                        return <option value={item.location_id} key={item.location_id+item.location_name}>{item.location_name}</option>
                                    })
                                }
                            </select>
                            
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="location"
                                className="basis-3/12"
                            >
                                Area
                            </label>
                            <select 
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                autoComplete="on"
                            >
                                <option key={''}>-- choose area --</option>
                            </select>
                            
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="location"
                                className="basis-3/12"
                            >
                                Region
                            </label>
                            <select 
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                autoComplete="on"
                            >
                                <option key={''}>-- choose region --</option>
                            </select>
                            
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="department"
                                className="basis-3/12"
                            >
                                Department Name
                            </label>
                            <input 
                                type="text"
                                placeholder="Department"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            >
                            </input>
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="location"
                                className="basis-3/12"
                            >
                                Journal Type
                            </label>
                            <select 
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                autoComplete="on"
                            >
                                <option key={''}>-- choose journal type --</option>
                            </select>
                            
                        </div>
                    </div>
                    <div className="basis-1/2">
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="transaction_number"
                                className="basis-3/12"
                            >
                                Transaction Number
                            </label>
                            <input 
                                type="text"
                                placeholder="Transaction Number"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            >
                            </input>
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="transaction_status"
                                className="basis-3/12"
                            >
                                Transaction Status
                            </label>
                            <input 
                                type="text"
                                placeholder="Transaction Status"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            >
                            </input>
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="integration_status"
                                className="basis-3/12"
                            >
                                Integration Status
                            </label>
                            <input 
                                type="text"
                                placeholder="Integration Status"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            />
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="no_transaction_netsuite"
                                className="basis-3/12"
                            >
                                No Netsuite
                            </label>
                            <input 
                                type="text"
                                placeholder="No Transaction Netsuite"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            />
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="no_bon_sementara"
                                className="basis-3/12"
                            >
                                No Bon Sementara
                            </label>
                            <input 
                                type="text"
                                placeholder=" No Bon Sementara"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            />
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="no_realisasi"
                                className="basis-3/12"
                            >
                                No Realisasi
                            </label>
                            <input 
                                type="text"
                                placeholder=" No Realisasi"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            />
                        </div>
                        <div className="flex justify-center items-center mb-2">
                            <label 
                                htmlFor="keterangan"
                                className="basis-3/12"
                            >
                                Keterangan
                            </label>
                            <input 
                                type="text"
                                placeholder="Keterangan"
                                className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                                defaultValue={''}
                            >
                            </input>
                        </div>
                        <div className="flex flex-row justify-end my-2">
                            <button 
                                type="submit"
                                className="w-40 bg-yellow-400 h-12 rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
          
            <div className="h-full w-full border-dotted shadow-xl rounded-md lg:h-96">
                <DataGrid
                    columns={[]}
                    rows={[]}
                    rowCount={0}
                    paginationMode="server"
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "id",
                                    sort: "desc",
                                },
                            ],
                        },
                            pagination: {
                                paginationModel: { pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    // onPaginationModelChange={handlePageChange}
                />
            </div>
        </div>
      </div>
    )
};

export default AddJounralEntry;