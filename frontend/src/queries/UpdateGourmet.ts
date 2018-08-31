export default `mutation updateGourmet($gourmet: UpdateGourmetInput!) {
  updateGourmet(gourmet: $gourmet) {
    gourmet {
      identity_id
    }
    message
    errors {
      message
    }
  }
}`;
