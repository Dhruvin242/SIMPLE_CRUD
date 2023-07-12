import BasicTable from "@/components/tables";
import { CREATE_CLIENT, GET_ALL_CLIENTS } from "@/store/query/client";
import { useMutation, useQuery } from "@apollo/client";
import { TextField, Button } from "@mui/material";
import {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";

const About = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const [createClient, { data: createData, loading: createLoading }] =
    useMutation(CREATE_CLIENT, {
      update(cache, { data: { createClient } }) {
        const { getAllClients } = cache.readQuery({
          query: GET_ALL_CLIENTS
        });

        cache.writeQuery({
          query: GET_ALL_CLIENTS,
          data: {
            getAllClients: [
              ...getAllClients,
              createClient
            ]
          }
        });
      }
    });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const Handlesubmitform = (data) => {
    const { name, email } = data;
    createClient({
      variables: {
        name,
        email,
      },
    });
    reset();
  };

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_CLIENTS,{
    onCompleted: (data) => {
      console.log('on completed..', data.getAllClients)
      setDisplayData(data.getAllClients)
    }
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;


  return (
    <Fragment>
      <form onSubmit={handleSubmit(Handlesubmitform)}>
        <TextField
          sx={{ my: 2, mx: 2 }}
          label="Enter Name"
          variant="standard"
          name="name"
          {...register("name", {
            required: "Required Field",
          })}
          error={!!errors?.name}
          helperText={errors?.name ? errors.name.message : null}
        />
        <TextField
          sx={{ my: 2, mx: 2 }}
          label="Enter Email"
          variant="standard"
          name="email"
          {...register("email", {
            required: "Required Field",
          })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
        />
        <Button type="submit" sx={{ my: 4, mx: 5 }} variant="contained">
          Add
        </Button>
      </form>
      <div>
        <BasicTable data={displayData} />
      </div>
    </Fragment>
  );
};

export default About;
