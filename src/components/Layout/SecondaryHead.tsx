import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { tokens } from "../../theme";

interface SecondaryHeadProps {
  icon: React.ReactNode;
  heading: string;
}

const SecondaryHead: React.FC<SecondaryHeadProps> = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const studentsSegment = pathSegments[1];
  const createSegment = pathSegments[2];
  const capitalizedStudentsSegment =
    studentsSegment.charAt(0).toUpperCase() + studentsSegment.slice(1);
  const capitalizedCreateSegment =
    createSegment.charAt(0).toUpperCase() + createSegment.slice(1);
  const shortLink = `/${studentsSegment}`;
  // const shortLink2 = `/${createSegment}`;

  return (
    <Box p={2}>
      <Box display={"flex"}>
        <Box px={1} display={"flex"} alignItems={"center"} gap={"5px"}>
          {props.icon}
          <NavLink
            to={shortLink}
            style={{
              color: `${colors.link[500]}`,
              textDecoration: "none",
              transition: "text-decoration 0.3s",
            }}
            
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.textDecoration = "none";
            }}
          >
            {capitalizedStudentsSegment}
          </NavLink>
        </Box>

        <Box>/ {capitalizedCreateSegment}</Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={"10px"} py={2}>
        <NavLink 
          style={{color: `${colors.link[500]}`}}  
          to={shortLink}
        >
          <ArrowBackIcon/>
        </NavLink>
        <Typography variant="h5" style={{fontWeight:"700"}}>
          {props.heading}
        </Typography>
      </Box>
    </Box>
  );
};

export default SecondaryHead;
