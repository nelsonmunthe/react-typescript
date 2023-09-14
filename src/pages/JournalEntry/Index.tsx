import { Button,  } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { getToken } from '../../component/helpers/token';
import useRows from '../../hooks/useRows';
import { Link, Outlet } from 'react-router-dom';
const auth:any = getToken('accessToken')

const Index:React.FC = () => {
    const {rows, getRows, totalRow, paginate, setPaginate} = useRows();
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "no_transaksi",
          headerName: "Nomor Transaksi",
          width: 250,
          renderCell: (params: any) => {
            console.log('params id', params.row.id)
            return <Link to={`${params.row.id}`}>{params.row.no_transaksi}</Link>
          },
        },
        {
          field: "status_transaksi",
          headerName: "Status Transaksi",
          width: 150,
        },
        {
          field: "status_integrasi",
          headerName: "Status Integrasi",
          width: 150,
        },
        {
          field: "debit",
          headerName: "Debit",
          width: 150,
          valueFormatter: (params: any) => {
            if (params.value) {
              const jumlah = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(params.value);
              return jumlah;
            } else return "";
          },
        },
        {
          field: "credit",
          headerName: "Credit",
          width: 150,
          valueFormatter: (params: any) => {
            if (params.value) {
              const jumlah = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(params.value);
              return jumlah;
            } else return "";
          },
        },
        {
          field: "transaction_date",
          headerName: "Tanggal Transaksi",
          valueFormatter: (params: any) => {
            if (params.value) {
              const formattedValue1 = String(params.value);
              const formattedValue = formattedValue1.substring(0, 10);
              const date = new Date(formattedValue);
              const formattedValueFinal =
                date.toLocaleString("en-US", { day: "2-digit" }) +
                "-" +
                date.toLocaleString("en-US", { month: "2-digit" }) +
                "-" +
                date.getFullYear();
              return formattedValueFinal;
            } else return "";
          },
          valueParser: (value: any) => {
            const date = new Date(value);
            const formattedValueFinal =
              date.toLocaleString("en-US", { day: "2-digit" }) +
              "-" +
              date.toLocaleString("en-US", { month: "2-digit" }) +
              "-" +
              date.getFullYear();
            return formattedValueFinal;
          },
          width: 150,
        },
        {
          field: "approve_date",
          headerName: "Tanggal Approve",
          valueFormatter: (params: any) => {
            if (params.value) {
              const formattedValue1 = String(params.value);
              const formattedValue = formattedValue1.substring(0, 10);
              const date = new Date(formattedValue);
              const formattedValueFinal =
                date.toLocaleString("en-US", { day: "2-digit" }) +
                "-" +
                date.toLocaleString("en-US", { month: "2-digit" }) +
                "-" +
                date.getFullYear();
              return formattedValueFinal;
            } else return "";
          },
          valueParser: (value:any) => {
            const date = new Date(value);
            const formattedValueFinal =
              date.toLocaleString("en-US", { day: "2-digit" }) +
              "-" +
              date.toLocaleString("en-US", { month: "2-digit" }) +
              "-" +
              date.getFullYear();
            return formattedValueFinal;
          },
          width: 150,
        },
        {
          field: "no_transaksi_netsuite",
          headerName: "Nomor Transaksi Netsuite",
          width: 200,
        },
        {
          field: "subsidiary_name",
          headerName: "Subsidiary",
          width: 200,
        },
        {
          field: "location_name",
          headerName: "Lokasi",
          width: 180,
        },
        {
          field: "area_name",
          headerName: "Area",
          width: 180,
        },
        {
          field: "region_name",
          headerName: "Region",
          width: 180,
        },
    ];

    useEffect(() => {
        getRows('/v1/api/jurnal-entry/get-journal-entry')
    }, [paginate])

    const handlePageChange = (event: any) => {
        console.log('event', event)
        setPaginate(prev => {
            return{
                ...prev,
                page: event.page,
                per_page: event.pageSize
            }
        })
    }

    return(
        <div>
            <div className='flex justify-between mb-4' >
                <h1 className="text-lg font-medium  md:text-2xl mb-2">Journal Entry</h1>
                <Link to={'new'}>
                    <Button variant='outlined' color='warning' startIcon={<AddIcon/>}>Tambah </Button>
                </Link>
            </div>
            <div className='w-full h-full xl:h-auto'>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    rowCount={totalRow}
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
                                paginationModel: { pageSize: paginate.per_page},
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    onPaginationModelChange={handlePageChange}
                />
            </div>
        </div>
    )
};

export default Index;