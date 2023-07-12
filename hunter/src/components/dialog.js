import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {gql, useMutation, useQuery} from "@apollo/client";
import {
  GET_ALL_CLIENTS,
  GET_SINGLE_CLIENT,
  UPDATE_CLIENT,
} from "@/store/query/client";

export default function UpdateDialog({ visible, setvisible, clientId }) {
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
  });
  const { data } = useQuery(GET_SINGLE_CLIENT, {
    fetchPolicy: 'no-cache',
    variables: { id: clientId },
  });

  const [updateclient, { data: updatedclientdata }] = useMutation(
    UPDATE_CLIENT
  );

  useEffect(() => {
    if (data && data.getSingle) {
      setUpdateData({
        name: data.getSingle.name,
        email: data.getSingle.email,
      });
    }
  }, [data]);
  const handleonchange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateclient({
      variables: {
        id: clientId,
        name: updateData.name,
        email: updateData.email,
      },
    });
    setvisible(false);
  };

  return (
    <div>
      <Dialog open={visible} onClose={() => setvisible(false)}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            name="name"
            value={updateData.name}
            onChange={handleonchange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            name="email"
            value={updateData.email}
            onChange={handleonchange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setvisible(false)}>Cancel</Button>
          <Button onClick={(e) => handleUpdate(e)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
