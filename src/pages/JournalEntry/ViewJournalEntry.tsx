import { useState } from "react";
import { defer, useLoaderData, useParams, useSearchParams } from "react-router-dom";
import { axiosPrivate } from "../../component/helpers/axiosAuth";
import { DataGrid } from "@mui/x-data-grid";
const { REACT_APP_API_URL } = process.env;

const ViewJournalEntry:React.FC = () => {
    const detail:any = useLoaderData();
   
    const [options, setOptions] = useState([])
    const columns = [
        { field: "id", headerName: "Line", width: 80 },
        {
          field: "account_number",
          headerName: "Account Number",
          width: 150,
        },
        {
          field: "account_name",
          headerName: "Account Name",
          width: 430,
        },
        {
            field: "debit",
            headerName: "Debit",
            valueFormatter: (params: any) => {
                if (params.value) {
                const jumlah = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(params.value);
                const final = jumlah.slice(0, -3);
                return final;
                } else return "";
            },
            width: 150,
        },
        {
            field: "credit",
            headerName: "Credit",
            valueFormatter: (params: any) => {
                if (params.value) {
                const jumlah = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(params.value);
                const final = jumlah.slice(0, -3);
                return final;
                } else return "";
            },
            width: 150,
        },
        {
            field: "total",
            headerName: "Total",
            valueFormatter: (params: any) => {
                if (params.value) {
                const jumlah = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(params.value);
                const final = jumlah.slice(0, -3);
                return final;
                } else return "";
            },
            width: 150,
        },
        {
          field: "keterangan_item",
          headerName: "Keterangan Item",
          width: 200,
        },
        {
            field: "vat_name",
            headerName: "Vat Name",
            width: 200,
        },
        {
            field: "vat_rate",
            headerName: "Vat Rate",
            width: 200,
        },
        {
            field: "vat_amount",
            headerName: "Vat Amount",
            valueFormatter: (params: any) => {
                if (params.value) {
                const jumlah = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(params.value);
                const final = jumlah.slice(0, -3);
                return final;
                } else return "";
            },
            width: 150,
        }
    ];
    return(
       <div>
         <p className="text-lg font-medium  md:text-2xl mb-2">Detail Journal Entry</p>
         <div className="flex flex-col gap-4 ">
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
                            defaultValue={detail.transaction_date}
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
                            defaultValue={detail.posting_date}
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
                            defaultValue={detail.subsidiary_name}
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
                        <select disabled className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10">
                            <option key={''}>{detail.location_name}</option>
                        </select>
                        
                    </div>
                    <div className="flex justify-center items-center mb-2">
                        <label 
                            htmlFor="location"
                            className="basis-3/12"
                        >
                            Area
                        </label>
                        <select disabled className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10">
                            <option key={''}>{detail.area_name}</option>
                        </select>
                        
                    </div>
                    <div className="flex justify-center items-center mb-2">
                        <label 
                            htmlFor="location"
                            className="basis-3/12"
                        >
                            Region
                        </label>
                        <select disabled className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10">
                            <option key={''}>{detail.region_name}</option>
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
                            defaultValue={detail.department_name}
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
                        <select disabled className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10">
                            <option key={''}>{detail.typeJournal.type}</option>
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
                            disabled
                            placeholder="Transaction Number"
                            className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                            defaultValue={detail.no_transaksi}
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
                            disabled
                            placeholder="Transaction Status"
                            className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                            defaultValue={detail.status_transaksi}
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
                            disabled
                            placeholder="Integration Status"
                            className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                            defaultValue={detail.status_integrasi}
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
                            disabled
                            placeholder="No Transaction Netsuite"
                            className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                            defaultValue={detail.no_transaksi_netsuite}
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
                            disabled
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
                            disabled
                            placeholder=" No Realisasi"
                            className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                            defaultValue={detail.realisasi_number}
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
                            disabled 
                            type="text"
                            placeholder="Keterangan"
                            className="basis-9/12 pl-2 bg-gray-100 rounded-md border-lime-50 h-10"
                            defaultValue={detail.keterangan}
                        >
                        </input>
                    </div>
                </div>
            </div>
            <div>
            <div className="h-full w-full border-dotted shadow-xl rounded-md lg:h-96">
                <DataGrid
                    columns={columns}
                    rows={detail.jurnal_entry_lines}
                    rowCount={detail.jurnal_entry_lines.length}
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
       </div>
    )
};

export default ViewJournalEntry;

const getDetail = async(journalId: number) => {
    try {
        const response = await axiosPrivate(`${REACT_APP_API_URL}/v1/api/jurnal-entry/get-journal-entry-detail?journalId=${journalId}`);
        if(response.status === 200){
            console.log('response', response.data.data)
            return response.data.data
        }
    } catch (error) {
        
    }
}

export const loader = async({ request, params }: { request: Request; params: any; }) => {
    const { journalId } = params
    return getDetail(journalId)
}