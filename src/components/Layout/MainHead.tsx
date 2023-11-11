import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from "@mui/icons-material/Search";

const MainHead = ({
  keyword,handleSearch,
}: {
  keyword:string,
  handleSearch:any,
}) => {
  const location = useLocation();
  const heading = location.pathname.split("/")
  const capitalizedHeading = heading[heading.length - 1].charAt(0).toUpperCase() + heading[heading.length - 1].slice(1);

  
  return (
    <Box py={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
      <Typography variant="h5" style={{fontWeight:"700"}}>{capitalizedHeading} List</Typography>
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
      <TextField
          size="medium"
          variant="standard"
          placeholder="Search..."
          value={keyword}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      <NavLink to={`${location.pathname}/create`}>
        
          <Button
            color="primary"
            variant="contained"
            startIcon={<ControlPointIcon />}
            sx={{
              fontWeight: 500,
              fontSize: "15px",
            }}
          >
            Create
          </Button>
          </NavLink>
      </Box>
    </Box>
  )
}

export default MainHead