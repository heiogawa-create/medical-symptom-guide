import { diseases } from './diseases';
import type { SymptomInput, Urgency } from './types';

const emergencyPattern = /大量|黒色便|血便|下血/;
const severePattern = /高熱|激しい|けいれん/;
const rapidPattern = /急激/;

export function assess(input: SymptomInput) {
  const text = `${input.mainSymptom} ${input.other}`;
  const redFlags: string[] = [];

  if (input.bleeding && emergencyPattern.test(text)) redFlags.push('出血に関する注意サイン');
  if (input.painLevel === '強い') redFlags.push('強い痛み');
  if (input.chestPain) redFlags.push('胸痛');
  if (input.breathingDifficulty) redFlags.push('呼吸困難');
  if (input.consciousness) redFlags.push('意識がぼんやりする、または意識障害');
  if (input.dizziness) redFlags.push('ふらつき');
  if (input.paralysisOrSpeech) redFlags.push('片側の手足の動かしにくさ、ろれつが回らない');
  if (input.fever && severePattern.test(text)) redFlags.push('高熱やけいれんなど');
  if (input.weightLoss && (input.duration.includes('1カ月') || rapidPattern.test(text))) redFlags.push('体重減少');

  const terms = text
    .split(/[、,\s]+/)
    .filter(Boolean)
    .concat(
      input.bleeding ? ['下血', '血便'] : [],
      input.diarrhea ? ['下痢'] : [],
      input.vomiting ? ['嘔吐'] : [],
      input.weightLoss ? ['体重減少'] : [],
      input.fever ? ['発熱'] : [],
      input.chestPain ? ['胸痛'] : [],
      input.breathingDifficulty ? ['呼吸困難'] : [],
    );

  let matches = diseases
    .map((disease) => ({
      disease,
      score: terms.reduce(
        (score, term) =>
          score +
          (disease.related_symptoms.concat(disease.common_symptoms).some((symptom) => symptom.includes(term) || term.includes(symptom))
            ? 1
            : 0),
        0,
      ),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.disease);

  if (!matches.length) matches = diseases.slice(0, 6);

  const departments = Array.from(new Set(matches.flatMap((disease) => disease.department).concat(redFlags.length ? ['救急外来'] : []))).slice(
    0,
    5,
  );

  const urgency: Urgency = redFlags.length
    ? '緊急相談を検討'
    : input.bleeding || input.weightLoss || input.duration.includes('1カ月')
      ? '早めの受診を検討'
      : '経過を見つつ相談を検討';

  return { redFlags, diseases: matches.slice(0, 8), departments, urgency };
}

export function makeDoctorMemo(input: SymptomInput) {
  return [
    `主症状: ${input.mainSymptom || '未入力'}`,
    `症状の期間: ${input.duration}`,
    `痛みの強さ: ${input.painLevel}`,
    `発熱: ${input.fever ? 'あり' : 'なし'}`,
    `出血: ${input.bleeding ? 'あり' : 'なし'}`,
    `下痢: ${input.diarrhea ? 'あり' : 'なし'}`,
    `嘔吐: ${input.vomiting ? 'あり' : 'なし'}`,
    `体重減少: ${input.weightLoss ? 'あり' : 'なし'}`,
    `ふらつき: ${input.dizziness ? 'あり' : 'なし'}`,
    '血液の色、回数、食事との関係、服薬中の薬、過去の病気、家族歴も整理して伝えると相談しやすくなります。',
    input.other && `その他: ${input.other}`,
  ]
    .filter(Boolean)
    .join('\n');
}
