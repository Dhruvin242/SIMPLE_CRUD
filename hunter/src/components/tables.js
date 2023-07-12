import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button, Dialog, Pagination, Typography} from "@mui/material";
import {DELETE_CLIENT, GET_ALL_CLIENTS} from "@/store/query/client";
import {gql, useMutation} from "@apollo/client";
import UpdateDialog from "./dialog";

export default function BasicTable({ data }) {
  const [visible, setvisible] = useState(false);
  const [getId, setId] = useState();
  const [deleteClient, { data: deleteData }] = useMutation(DELETE_CLIENT, {
    update(cache, { data: { deleteClient } }) {
      console.log('deleteClient', deleteClient)
      const { getAllClients } = cache.readQuery({
        query: GET_ALL_CLIENTS,
      });

      cache.writeQuery({
        query: GET_ALL_CLIENTS,
        data: {
          getAllClients: getAllClients.filter(client => client.id !== deleteClient.id)
        }
      })
    }
  });

  const handleUpdate = (id) => {
    setvisible(true);
    setId(id);
  };
  const handleDelete = (id) => {
    deleteClient({
      variables: {
        id,
      },
    });
  };


  return (
    <TableContainer component={Paper}>
      {visible && (
        <UpdateDialog
          visible={visible}
          setvisible={setvisible}
          clientId={getId}
        />
      )}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID </TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right" width={"60%"}>
              Email
            </TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <>
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => handleUpdate(row.id)}>
                  Update
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
