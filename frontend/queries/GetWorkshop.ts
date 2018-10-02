import gql from 'graphql-tag';

export default gql`
  query GetWorkshop($workshop_id: ID!) {
    getWorkshop(workshop_id: $workshop_id) {
      workshop {
        name
        description
        duration
        date
        min_gourmet
        max_gourmet
        images {
          key
        }
        cook {
          image {
            key
          }
          gourmet {
            first_name
            last_name
          }
          evaluations {
            id
            author {
              identity_id
              first_name
              last_name
              image {
                key
              }
            }
            rating
            comment
            created_at
          }
        }
      }
      message
      errors {
        message
      }
    }
  }
`;