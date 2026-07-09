import diseasesData from '@/data/diseases.json';
import type { Disease } from './types';
export const diseases = diseasesData as Disease[];
export function getDisease(id: string) { return diseases.find((d) => d.id === id); }
export function searchDiseases(query = '', category = '') {
  const q = query.trim().toLowerCase();
  return diseases.filter((d) => (!category || d.category === category) && (!q || [d.name_ja, d.category, ...d.common_symptoms, ...d.related_symptoms].some((v) => v.toLowerCase().includes(q))));
}
