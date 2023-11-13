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
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import API from "../../API";

function BlogList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [blogData, setBlogData] = useState([]);
  const blogs: any = blogData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/blog/getall`
        );

        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // Send a DELETE request to the server with the specific blog ID
      await axios.delete(`${API}/blog/delete/${id}`);

      // After successful deletion, fetch the updated data
      const response = await axios.get(`${API}/blog/getall`);
      setBlogData(response.data);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

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
              <TableCell>Img</TableCell>
              <TableCell>Title</TableCell>
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
                <TableCell colSpan={4}>No Classes found.</TableCell>
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

export default BlogList;

const Row = React.memo(({ item }: any) => {
  return (
    <TableRow>
      <TableCell size="small"><img src={item?.img} alt={item?._id} style={{height:"50px"}}/></TableCell>
      <TableCell size="small">{item?.title}</TableCell>
      <TableCell size="small">{item?.createdAt}</TableCell>
      <TableCell size="small">
        <Link to={`/blog/edit/${item?._id}`}>
          <Tooltip title="Edit">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </TableCell>
    </TableRow>
  );
});
