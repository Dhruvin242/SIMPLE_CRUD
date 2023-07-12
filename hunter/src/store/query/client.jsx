import { gql } from "@apollo/client";

export const GET_ALL_CLIENTS = gql`
  query getAllClients {
    getAllClients {
        id
        email
        name
    }
  }
`;

export const GET_SINGLE_CLIENT = gql`
  query Getsingleclient($id: String!) {
    getSingle(id: $id) {
      email
      name
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($name: String!, $email: String!) {
    createClient(name: $name, email: $email) {
      id
      email
      name
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: String!) {
    deleteClient(id: $id) {
      id
      email
      name
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: String!, $name: String, $email: String) {
    updateClient(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
