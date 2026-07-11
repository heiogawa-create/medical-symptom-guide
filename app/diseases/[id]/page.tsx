import Link from 'next/link';
import { notFound } from 'next/navigation';
import { diseases, getDisease } from '@/lib/diseases';

export function generateStaticParams() {
  return diseases.map((disease) => ({ id: disease.id }));
}

type PageParams = Promise<{ id: string }>;

const urgencyStyles = {
  '緊急相談を検討': 'border-red-300 bg-red-50 text-red-900',
  '早めの受診を検討': 'border-amber-300 bg-amber-50 text-amber-900',
  '経過を見つつ相談を検討': 'border-sky-200 bg-sky-50 text-sky-900',
} as const;

const urgencyGuidance = {
  '緊急相談を検討': '突然の症状や強い症状がある場合は、様子を見ずに119番通報または救急受診を検討してください。',
  '早めの受診を検討': '症状を繰り返す、悪化している、日常生活に支障がある場合は、早めに医療機関へ相談してください。',
  '経過を見つつ相談を検討': '軽い症状でも長引く、繰り返す、いつもと違う場合は医療機関へ相談してください。',
} as const;

function ListSection({ title, items, accent = 'sky' }: { title: string; items: string[]; accent?: 'sky' | 'amber' | 'rose' }) {
  const markerClasses = {
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  } as const;

  return (
    <section className="card">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3 leading-6">
            <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${markerClasses[accent]}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function DiseaseDetailPage({ params }: { params: PageParams }) {
  const { id } = await params;
  const disease = getDisease(id);
  if (!disease) notFound();

  return (
    <div className="space-y-5 py-3">
      <Link href={`/diseases?category=${encodeURIComponent(disease.category)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-500">
        <span aria-hidden="true">←</span>
        {disease.category}の疾患一覧へ戻る
      </Link>

      <header className="card bg-gradient-to-br from-sky-50 to-emerald-50">
        <span className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
          {disease.category}
        </span>
        <h1 className="mt-3 text-3xl font-bold text-sky-900">{disease.name_ja}</h1>
        <p className="mt-4 text-sm font-bold text-sky-700">疾患の特徴（どんな病気？）</p>
        <p className="mt-2 leading-8 text-slate-700">{disease.overview}</p>
      </header>

      <section className="card">
        <h2 className="text-lg font-bold text-slate-900">なぜ症状が出るの？</h2>
        <p className="mt-3 leading-8 text-slate-700">{disease.pathophysiology}</p>
      </section>

      <ListSection title="よくみられる症状" items={disease.common_symptoms} />
      <ListSection title="関連しやすい症状" items={disease.related_symptoms} />
      <ListSection title="似た症状が出る病気" items={disease.differential_examples} accent="amber" />
      <ListSection title="病院で確認されること" items={disease.exam_examples} />

      <section className={`rounded-3xl border p-5 shadow-sm ${urgencyStyles[disease.urgency]}`}>
        <p className="text-sm font-bold">受診の目安</p>
        <h2 className="mt-1 text-xl font-bold">{disease.urgency}</h2>
        <p className="mt-3 leading-7">{urgencyGuidance[disease.urgency]}</p>
        <div className="mt-4 rounded-2xl bg-white/80 p-4">
          <p className="text-sm font-bold">相談先</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {disease.department.map((department) => (
              <li key={department} className="rounded-full bg-white px-3 py-2 text-sm font-semibold shadow-sm">{department}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-rose-300 bg-rose-50 p-5 text-rose-950 shadow-sm">
        <p className="text-sm font-bold text-rose-700">見逃さないでください</p>
        <h2 className="mt-1 text-xl font-bold">注意が必要なサイン</h2>
        <ul className="mt-4 grid gap-3">
          {disease.red_flags.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl bg-white/80 p-3 leading-6">
              <span className="font-bold text-rose-600" aria-hidden="true">!</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
        {disease.disclaimer}
      </p>
    </div>
  );
}
