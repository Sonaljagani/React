import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableFooter,
  TablePagination,
  Checkbox,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [users, setUser] = useState([]);
  const [id, setID] = useState();
  const [open, setOpen] = useState(false);
 // const [deletemsg, setDeletemsg] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickConfrimOpen = (id) => {
    setOpen(true);
    setID(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    loaduser();
  }, []);

  const loaduser = async () => {
    const result = await axios.get("http://localhost:3001/users");
    setUser(result.data);
  };
  const deleteUser = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:3001/users/${id}`);
    setOpen(false);

    loaduser();
    //alert("Record delete sucessfully");
  };
  const handleAllDelete = () => {
    //   const checkinputvalue = [];
    //   for (let i = 0; i < users.length; i++) {
    //     if (users[i].ischecked === true) {
    //       checkinputvalue.push(parseInt(users[i].id));
    //     }
    //   }
    //   console.log(checkinputvalue);
    //   axios.get(`http://localhost:3001/users/${checkinputvalue}`)

    // .then(data=>{
    //     console.log(data);
    //    loaduser();
    // });

    let arrayids = [];
    users.forEach((d) => {
      if (d.ischecked === true) {
        arrayids.push(parseInt(d.id));
      }
      console.log(arrayids);
    });

    axios.delete(`http://localhost:3001/users/${arrayids}`);
    // .then(data=>{
    //   console.log(data);
    //   loaduser();
    // })
    // .catch(err=>alert(err));
  };
  // const deleteRequestHandler = async () => {
  //   const response = await axios.delete(
  //     `http://localhost:3001/users/${name}`
  //   );

  //   if (response.data.message) {
  //     setDeletemsg(response.data.message);
  //   }
  // };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselecte") {
      const checkedvalue = users.map((usered) => {
        return { ...usered, ischecked: checked };
      });
      console.log(checkedvalue);
      setUser(checkedvalue);
    } else {
      const checkedvalue = users.map((usered) =>
        usered.name === name ? { ...usered, ischecked: checked } : usered
      );
      console.log(checkedvalue);
      setUser(checkedvalue);
    }
  };

  return (
    
    <div>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta> */}
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button onClick={() => handleAllDelete()}>
        <DeleteIcon />
        Delete All
      </Button>

      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ background: "#bdbdbd" }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    name="allselecte"
                    checked={
                      !users?.some((usered) => usered?.ischecked !== true)
                    }
                    // checked={checkboxSelection}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">User Name</TableCell>
                <TableCell align="right">E-mails</TableCell>
                <TableCell align="right">Phone No</TableCell>
                <TableCell align="right">Website</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* using paging */}
              {(rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users
              )
                // Using Search
                .filter(
                  (user) =>
                    user.name.toLowerCase().includes(search) ||
                    user.username.toLowerCase().includes(search) ||
                    user.email.toLowerCase().includes(search)
                )

                .map((user, index) => (
                  <TableRow key={user.name}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        name={user.name}
                        checked={user?.ischecked || false}
                        //checked={checkboxSelection}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">{user.website}</TableCell>
                    <TableCell style={{ display: "inline-block" }}>
                      <NavLink to={`/users/${user.id}`}>
                        <VisibilityIcon />
                      </NavLink>

                      <NavLink to={`/users/Edituser/${user.id}`}>
                        <EditIcon />
                      </NavLink>
                      <NavLink onClick={() => handleClickConfrimOpen(user.id)}>
                        <DeleteIcon />
                      </NavLink>
                      {/* <NavLink onClick={() => deleteUser(user.id)}> 
                    <DeleteIcon />
                  </NavLink>  */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page + 1}`;
                  }}
                  backIconButtonProps={{
                    color: "secondary",
                  }}
                  nextIconButtonProps={{ color: "secondary" }}
                  showFirstButton={true}
                  showLastButton={true}
                  labelRowsPerPage={<span>Rows:</span>}
                  sx={{
                    ".MuiTablePagination-toolbar": {
                      backgroundColor: "#bdbdbd",
                    },
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                      {
                        fontWeight: "bold",
                        color: "blue",
                      },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          //PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Delete Confrim Box
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this Record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => deleteUser(id)}>Confrim</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
export default Home;

