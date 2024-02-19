import { Box, useTheme } from "@mui/material"
import { useGetUserPerformanceQuery } from "../../state/api"
import { DataGrid } from "@mui/x-data-grid"
import Header from "../../components/Header"
import { useSelector } from "react-redux"

const columns = [
  {
    field: "_id",
    headerName: "ID",
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
    flex: 0.5,
    renderCell: (params) => {
      const match = params.value.match(/^(\d{4})-(\d{2})-(\d{2}).*?$/i)

      const [, year, month, day] = match
      return `${month}/${day}/${year}`
    },
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
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
]

const Performance = () => {
  //theme
  const theme = useTheme()
  //selector
  const userId = useSelector((state) => state.global.userId)
  //query
  const { data, isLoading } = useGetUserPerformanceQuery(userId)

  return (
    <Box m="1rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance"
      />
      <Box
        height="75vh"
        mt="1rem"
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderColor: "transparent",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            borderColor: "transparent",
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
        }}
      >
        {data || !isLoading ? (
          <DataGrid
            rows={data.sales || []}
            columns={columns}
            getRowId={(row) => row._id}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  )
}

export default Performance
