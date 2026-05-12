import { getTrainings } from './trainingService';

export async function getFirstTraining() {
  const data = await getTrainings();

  if (data.success && data.data.length > 0) {
    return data.data[0];
  }

  return null;
}