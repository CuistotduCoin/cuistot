import gql from 'graphql-tag';

export default gql`
  mutation CreateWorkshop($workshop: CreateWorkshopInput!) {
    createWorkshop(workshop: $workshop) {
      message,
      errors {
        message
      }
    }
  }
`;