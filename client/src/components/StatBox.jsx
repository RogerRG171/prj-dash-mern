/* eslint-disable react/prop-types */
import { Box, useTheme, Typography, Icon } from "@mui/material"
import FlexBetween from "./FlexBetween"

const StatBox = ({ title, value, icon, increase, description }) => {
  //theme
  const theme = useTheme()
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1rem"
      flex="1 1 100%"
      gap="8px"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        <Icon sx={{ color: theme.palette.secondary[300] }}>{icon}</Icon>
      </FlexBetween>
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[300] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary[300] }}
        >
          {increase}
        </Typography>
        <Typography sx={{ color: theme.palette.secondary[100] }}>
          {description}
        </Typography>
      </FlexBetween>
    </Box>
  )
}

export default StatBox
