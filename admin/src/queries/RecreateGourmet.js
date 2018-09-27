export default `mutation recreateGourmet($gourmet: GourmetInput!) {
  recreateGourmet(gourmet: $gourmet) {
    message
    errors {
      message
    }
  }
}`;
