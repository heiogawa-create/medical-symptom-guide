'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { Mascot } from '@/components/Mascot';
import { assess, makeDoctorMemo } from '@/lib/assessment';
import { sanitizeMedicalText } from '@/lib/safety';
import type { SymptomInput } from '@/lib/types';

export default function ResultPage() {
  const [input, setInput] = useState<SymptomInput | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('symptomInput');
    if (raw) setInput(JSON.parse(raw));
  }, []);

  if (!input) {
    return (
      <div className="card">
        入力内容が見つかりません。
        <Link className="text-sky-700" href="/symptom-check">
          症状入力へ
        </Link>
      </div>
    );
  }

  const assessment = assess(input);
  const memo = sanitizeMedicalText(makeDoctorMemo(input));

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <h1 className="text-2xl font-bold">受診の目安</h1>
        <Mascot pose="guide" className="w-20 shrink-0 sm:w-24" />
      </div>

      {assessment.redFlags.length > 0 && (
        <div className="card border-amber-200 bg-amber-50">
          <h2 className="font-bold">早めの医療相談が必要と考えられる症状が含まれています</h2>
          <p className="mt-2 leading-7">
            入力内容には、早めの医療相談が必要と考えられる症状が含まれています。特に、強い痛み、大量出血、意識障害、呼吸困難、胸痛、麻痺などがある場合は、救急外来の受診や119番通報を検討してください。
          </p>
        </div>
      )}

      <section className="card">
        <h2 className="font-bold">受診目安</h2>
        <p className="mt-2 text-xl text-sky-700">{assessment.urgency}</p>
      </section>

      <section className="card">
        <h2 className="font-bold">おすすめの相談先</h2>
        <p className="mt-2">{assessment.departments.join('、')}</p>
      </section>

      <section className="card">
        <h2 className="font-bold">この症状と関連することがある疾患の例</h2>
        <div className="mt-3 grid gap-2">
          {assessment.diseases.map((disease) => (
            <Link className="rounded-xl bg-sky-50 p-3 text-sky-800" href={`/diseases/${disease.id}`} key={disease.id}>
              {disease.name_ja}
            </Link>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="font-bold">医師に伝えるとよいこと</h2>
        <textarea readOnly value={memo} className="mt-3 h-64 w-full rounded-2xl border p-3" />
        <button onClick={() => navigator.clipboard.writeText(memo)} className="btn mt-3 bg-green-600 text-white">
          メモをコピー
        </button>
      </section>

      <Disclaimer emergency={assessment.redFlags.length > 0} />
      <p className="text-sm">この情報は診断ではありません。症状が続く場合や不安がある場合は、医師の診察を受けてください。</p>
    </div>
  );
}
