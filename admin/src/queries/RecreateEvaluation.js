export default `mutation recreateEvaluation($evaluation: EvaluationInput!) {
  recreateEvaluation(evaluation: $evaluation) {
    message
    errors {
      message
    }
  }
}`;
