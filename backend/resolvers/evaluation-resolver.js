import { getSingleRow } from './utils';

async function getEvaluation(args) {
  const result = await getSingleRow('evaluations', args.booking_id);
  return result;
}

export { getEvaluation };
