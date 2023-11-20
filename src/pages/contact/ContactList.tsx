import React, { useEffect, useState } from "react";
import MainHead from "../../components/Layout/MainHead";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import API from "../../API";

function ContactList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [blogData, setBlogData] = useState([]);
  const blogs: any = blogData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/contact/getall`
        );
        console.log(response)
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
     
    fetchData();
  }, []);

  

  const handleSearch = (event: any) => {
    setKeyword(event.target.value);
    setCurrentPage(0);
  };

  console.log(currentPage);

  const handleChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };
  return (
    <div>
      <MainHead keyword={keyword} handleSearch={handleSearch} />
      <TableContainer className="main-table">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs && blogs.length > 0 ? (
              blogs.map((item: any, index: any) => (
                <Row key={index} item={item} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <p>Total Classes: 30</p>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          rowsPerPage={rowsPerPage}
          page={1}
          count={50}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box> */}
    </div>
  );
}

export default ContactList;

const Row = React.memo(({ item }: any) => {
    const handleDelete = async (id:any) => {
        try {
          // Send a DELETE request to the server with the specific blog ID
          await axios.delete(`${API}/contact/delete/${id}`);
    
          // After successful deletion, fetch the updated data
          
          
        } catch (error) {
          console.error("Error deleting blog:", error);
        }
      };
  return (
    <TableRow>
      <TableCell size="small">{item?.name}</TableCell>
      <TableCell size="small">{item?.email}</TableCell>
      <TableCell size="small">{item?.message}</TableCell>
      <TableCell size="small">{item?.createdAt}</TableCell>
      <TableCell size="small">
       
          <Tooltip title="Edit">
            <IconButton onClick={handleDelete(item?._id)as any}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        
      </TableCell>
    </TableRow>
  );
});
