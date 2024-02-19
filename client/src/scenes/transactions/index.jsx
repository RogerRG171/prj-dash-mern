import { Box } from "@mui/material"
import Header from "../../components/Header"
import { DataGrid } from "@mui/x-data-grid"
import { useGetTransactionsQuery } from "../../state/api"
import { useState } from "react"
import { useTheme } from "@emotion/react"
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar"

const columns = [
  {
    field: "_id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "cost",
    flex: 0.5,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
]

const Transactions = () => {
  //theme
  const theme = useTheme()

  //states
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  })
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState("")

  const [searchInput, setSearchInput] = useState("")

  //query
  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  })

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="List of transactions" />
      <Box
        height="75vh"
        mt="1rem"
        sx={{
          "& .MuiDataGrid-row:nth-child(odd)": {
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.background.alt
                : theme.palette.grey[700],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.secondary[300]
                : theme.palette.background.alt,
            color: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.secondary[300]
                : theme.palette.background.alt,
          },

          "& .MuiTablePagination-root": {
            color: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-root": {
            border: "none !important",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none !important",
          },
          "& .MuiBox-root > button": {
            color: theme.palette.secondary[100],
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={(data && data.transactions) || []}
          getRowId={(row) => row._id}
          loading={isLoading || !data}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={paginationModel.page}
          pageSize={paginationModel.pageSize}
          paginationMode="server"
          sortingMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  )
}

export default Transactions
