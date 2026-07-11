export const appConfig = { name: '受診目安ナビ', tagline: '症状を整理して、関連する疾患知識と受診の目安を確認できます' };
export const commonDisclaimer = '本アプリは診断・治療・処方を行うものではありません。表示される情報は一般的な医学知識と受診目安の参考情報です。症状が続く場合、強い症状がある場合、不安がある場合は、必ず医師などの医療専門職に相談してください。';
export const emergencyDisclaimer = '緊急性がある可能性があります。強い痛み、大量出血、意識障害、呼吸困難、麻痺、激しい胸痛などがある場合は、救急外来の受診や119番通報を検討してください。';

export const categoryDetails = [
  {
    name: '消化器',
    icon: '胃・腸',
    description: '胃、腸、肛門、胆のうなどの病気',
    classes: 'border-orange-200 bg-orange-50 text-orange-900',
  },
  {
    name: '整形外科・リハビリ',
    icon: '骨・関節',
    description: '腰、首、肩、膝、股関節、筋力低下など',
    classes: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  },
  {
    name: '循環器',
    icon: '心臓',
    description: '心臓、脈、血圧に関係する病気',
    classes: 'border-rose-200 bg-rose-50 text-rose-900',
  },
  {
    name: '脳神経',
    icon: '脳・神経',
    description: '脳血管、頭痛、けいれんなどの病気',
    classes: 'border-violet-200 bg-violet-50 text-violet-900',
  },
  {
    name: '呼吸器',
    icon: '肺・気道',
    description: '肺、気管支、感染症に関係する病気',
    classes: 'border-sky-200 bg-sky-50 text-sky-900',
  },
] as const;

export const categories = categoryDetails.map((category) => category.name);
