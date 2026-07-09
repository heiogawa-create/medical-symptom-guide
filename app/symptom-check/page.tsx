'use client';

import { useRouter } from 'next/navigation';

const booleanFields = [
  ['fever', '発熱'],
  ['bleeding', '出血'],
  ['diarrhea', '下痢'],
  ['vomiting', '嘔吐'],
  ['weightLoss', '体重減少'],
  ['dizziness', 'ふらつき'],
  ['consciousness', '意識がぼんやりする、または意識障害'],
  ['breathingDifficulty', '呼吸困難'],
  ['chestPain', '胸痛'],
  ['paralysisOrSpeech', '片側の手足の動かしにくさ、ろれつが回らないなど'],
] as const;

export default function SymptomCheckPage() {
  const router = useRouter();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue | boolean> = Object.fromEntries(formData);

    booleanFields.forEach(([key]) => {
      data[key] = formData.get(key) === 'on';
    });

    sessionStorage.setItem('symptomInput', JSON.stringify(data));
    router.push('/result');
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <h1 className="text-2xl font-bold">症状を入力する</h1>
      <p className="card text-sm">
        この情報は診断ではありません。ブラウザ上で処理し、MVPではサーバーに保存しません。
      </p>

      <label className="block">
        主症状
        <textarea
          name="mainSymptom"
          required
          className="mt-2 w-full rounded-2xl border p-3"
          placeholder="例：下血、腹痛"
        />
      </label>

      <label className="block">
        症状の期間
        <select name="duration" className="mt-2 w-full rounded-2xl border p-3">
          {['今日から', '2〜3日', '1週間以上', '1カ月以上', 'それ以上'].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>

      <label className="block">
        痛みの強さ
        <select name="painLevel" className="mt-2 w-full rounded-2xl border p-3">
          {['なし', '軽い', '中等度', '強い'].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>

      <div className="grid gap-3">
        {booleanFields.map(([key, label]) => (
          <label key={key} className="flex items-center gap-3 rounded-2xl border bg-white p-4">
            <input type="checkbox" name={key} className="h-5 w-5" />
            {label}
          </label>
        ))}
      </div>

      <label className="block">
        その他自由入力
        <textarea
          name="other"
          className="mt-2 w-full rounded-2xl border p-3"
          placeholder="痛む場所、血液の色、悪化するタイミングなど"
        />
      </label>

      <button className="btn w-full bg-sky-600 text-white">受診目安を確認する</button>
    </form>
  );
}
