export default `query GetCurrentGourmet {
  getCurrentGourmet {
    gourmet {
      id
      identity_id
      image {
        key
      }
      username
      gender
      first_name
      last_name
      email
      description
      birthdate
      address
      city
      zip_code
    },
    message,
    errors {
      message
    }
  }
}`;
