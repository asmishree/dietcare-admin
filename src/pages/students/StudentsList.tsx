import React, { useState } from "react";
import MainHead from "../../components/Layout/MainHead"
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

function StudentsList() {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [keyword, setKeyword] = useState("");
    const students = Students; // Updated variable name

    const handleSearch = (event: any) => {
        setKeyword(event.target.value);
        setCurrentPage(0);
    };

    console.log(currentPage)

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
                            <TableCell>Student Name</TableCell>
                            <TableCell>Father's Name</TableCell>
                            <TableCell>Mother's Name</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Section</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students && students.length > 0 ? (
                            students
                                .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                                .map((student, index) => (
                                    <Row key={index} student={student} />
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>No Students found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p>Total Students: {students.length}</p>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    count={students.length}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </div>
    )
}

export default StudentsList;

const Row = React.memo(({ student }: any) => {
    return (
        <TableRow>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.father}</TableCell>
            <TableCell>{student.mother}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.section}</TableCell>
            <TableCell>
                <Link to={`/students/edit`}>
                    <Tooltip title="Edit">
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Link to={`/students/view`}>
                    <Tooltip title="View">
                        <IconButton>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </TableCell>
        </TableRow>
    );
});



const Students = [
    {
      "name": "John Smith",
      "father": "Michael Smith",
      "mother": "Jennifer Smith",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Sarah Johnson",
      "father": "David Johnson",
      "mother": "Laura Johnson",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Robert Brown",
      "father": "James Brown",
      "mother": "Mary Brown",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Emily Davis",
      "father": "Daniel Davis",
      "mother": "Michelle Davis",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Sophia Wilson",
      "father": "Andrew Wilson",
      "mother": "Emily Wilson",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Ella Martinez",
      "father": "Carlos Martinez",
      "mother": "Olivia Martinez",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Matthew Turner",
      "father": "Richard Turner",
      "mother": "Susan Turner",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Olivia Lee",
      "father": "Brian Lee",
      "mother": "Linda Lee",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Aiden Harris",
      "father": "Joseph Harris",
      "mother": "Sarah Harris",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Mia Rodriguez",
      "father": "Jose Rodriguez",
      "mother": "Maria Rodriguez",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Liam Davis",
      "father": "Thomas Davis",
      "mother": "Jessica Davis",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Ava Moore",
      "father": "Robert Moore",
      "mother": "Karen Moore",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "James White",
      "father": "William White",
      "mother": "Patricia White",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Charlotte Allen",
      "father": "Edward Allen",
      "mother": "Elizabeth Allen",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Ethan Clark",
      "father": "George Clark",
      "mother": "Catherine Clark",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Amelia Scott",
      "father": "Samuel Scott",
      "mother": "Rachel Scott",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Noah King",
      "father": "Charles King",
      "mother": "Helen King",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Isabella Hall",
      "father": "Mark Hall",
      "mother": "Karen Hall",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "William Baker",
      "father": "Joseph Baker",
      "mother": "Sandra Baker",
      "class": "12th Grade",
      "section": "A"
    },
    {
      "name": "Sofia Adams",
      "father": "Daniel Adams",
      "mother": "Michelle Adams",
      "class": "12th Grade",
      "section": "A"
    }
  ];
  
  