export async function getFirstTraining() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const res = await fetch(`${API_BASE}/data/ler_treinos`);

  const data = await res.json();

  if (data.success && data.data.length > 0) {
    return data.data[0];
  }

  return null;
}
