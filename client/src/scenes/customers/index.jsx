import { Box, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import Header from "../../components/Header"
import { useGetCustomersQuery } from "../../state/api"

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "city",
    headerName: "City",
    flex: 0.5,
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.5,
  },
  {
    field: "occupation",
    headerName: "Occupation",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    flex: 0.5,
    renderCell: (params) =>
      params.value.replace(/^(\d{3})(\d{3})(\d{4})/i, "($1)$2-$3"),
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
]

const Customers = () => {
  const theme = useTheme()

  //query
  const { data, isLoading } = useGetCustomersQuery()

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
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
        }}
      >
        {data || !isLoading ? (
          <DataGrid
            rows={data || []}
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

export default Customers
