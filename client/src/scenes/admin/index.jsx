import { Box, useTheme } from "@mui/material"
import { useGetAdminsQuery } from "../../state/api"
import { DataGrid } from "@mui/x-data-grid"
import Header from "../../components/Header"
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

const Admin = () => {
  //theme
  const theme = useTheme()
  //query
  const { data, isLoading } = useGetAdminsQuery()

  return (
    <Box m="1rem 2.5rem">
      <Header title="ADMIN" subtitle="Managing admins and list of admins" />
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

export default Admin
