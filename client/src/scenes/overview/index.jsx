import { Box, FormControl, MenuItem, InputLabel, Select } from "@mui/material"
import Header from "../../components/Header"

import { useState } from "react"
import OverviewChart from "../../components/OverviewChart"

const Overview = () => {
  const [view, setView] = useState("units")

  return (
    <Box m="1rem 2rem">
      <Header
        title="Overview"
        subtitle="Overview of General revenue and profit"
      />
      <Box height="70vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            onChange={(e) => setView(e.target.value)}
            label="View"
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  )
}

export default Overview
