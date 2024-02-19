import { Box, useTheme, Button, Typography, useMediaQuery } from "@mui/material"
import FlexBetween from "./../../components/FlexBetween"
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material"
import { useGetDashboardStatsQuery } from "../../state/api"
import { DataGrid } from "@mui/x-data-grid"
import Header from "./../../components/Header"
import BreakdownChart from "./../../components/BreakdownChart"
import OverViewChart from "./../../components/OverviewChart"
import StatBox from "../../components/StatBox"

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
    headerName: "Price",
    flex: 0.5,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
]

const Dashboard = () => {
  //theme
  const theme = useTheme()
  //mediaQuery
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")
  //query
  const { data, isLoading } = useGetDashboardStatsQuery()

  if (isLoading || !data) return <>Loading...</>
  return (
    <Box sx={{ m: !isNonMediumScreens ? "3rem 1rem" : "1.5rem 2.5rem" }}>
      <FlexBetween
        sx={{
          flexDirection: !isNonMediumScreens ? "column" : "row",
          gap: !isNonMediumScreens ? "1rem" : 0,
        }}
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Button
          sx={{
            backgroundColor: theme.palette.secondary[300],
            color: theme.palette.grey[700],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            border: `2px solid ${theme.palette.secondary[300]}`,
          }}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </FlexBetween>
      {/* Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px"
        mt="1rem"
        height="75vh"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* Row 1 */}
        <Box
          borderRadius="8px"
          sx={{
            gridColumn: "span 2",
            display: "grid",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <StatBox
            icon={<Email />}
            title="Total Customers"
            increase="+14%"
            description="Since last month"
            value={data.totalCustomers}
          />
        </Box>
        <Box
          borderRadius="8px"
          sx={{
            gridColumn: "span 2",
            display: "grid",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <StatBox
            icon={<PointOfSale />}
            title="Sales Today"
            increase="+21%"
            description="Since last month"
            value={data.todayStats.totalSales}
          />
        </Box>
        <Box
          borderRadius="8px"
          p="1rem"
          sx={{
            gridColumn: "span 8",
            gridRow: "span 2",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Total Sales
          </Typography>
          <OverViewChart isDashboard={true} view="sales" />
        </Box>
        <Box
          borderRadius="8px"
          sx={{
            gridColumn: "span 2",
            display: "grid",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <StatBox
            icon={<PersonAdd />}
            title="Monthly Sales"
            increase="+5%"
            description="Since last month"
            value={data.thisMonthStats.totalSales}
          />
        </Box>
        <Box
          borderRadius="8px"
          sx={{
            gridColumn: "span 2",
            display: "grid",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <StatBox
            icon={<Traffic />}
            title="Yearly Sales"
            increase="+43%"
            description="Since last month"
            value={data.yearlySalesTotal}
          />
        </Box>
        {/* Row 2 */}
        <Box
          mb="1.5rem"
          borderRadius="8px"
          sx={{
            gridColumn: "span 8",
            gridRow: "span 3",
            backgroundColor: theme.palette.background.alt,
            "& .MuiDataGrid-root": {
              border: "none !important",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none !important",
            },
          }}
        >
          <DataGrid
            columns={columns}
            rows={(data && data.recentTransactions) || []}
            getRowId={(row) => row._id}
            loading={isLoading || !data}
            rowCount={
              (data.recentTransactions && data.recentTransactions.length) || 0
            }
            initialState={{
              ...data.recentTransactions,
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            rowsPerPageOptions={[25, 50]}
            page={0}
            pageSize={25}
            paginationMode="client"
            sortingMode="client"
          />
        </Box>
        <Box
          mb="1.5rem"
          p="1rem"
          borderRadius="8px"
          sx={{
            gridColumn: "span 4",
            gridRow: "span 3",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Typography>Sales by Category</Typography>
          <Box mt="-3rem" display="flex" justifyContent="center">
            <BreakdownChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
