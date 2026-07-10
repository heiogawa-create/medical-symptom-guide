import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Disclaimer } from '@/components/Disclaimer';
import { diseases, getDisease } from '@/lib/diseases';

export function generateStaticParams() {
  return diseases.map((disease) => ({ id: disease.id }));
}

export default async function DiseaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const disease = getDisease(id);
  if (!disease) notFound();

  const rows = [
    ['どんな病気？', disease.overview],
    ['なぜ症状が出るの？', disease.pathophysiology],
    ['よくみられる症状', disease.details?.symptoms ?? disease.common_symptoms.join('、')],
    ['関連しやすい症状', disease.details?.related ?? disease.related_symptoms.join('、')],
    ['似た症状が出る病気', disease.details?.differential ?? disease.differential_examples.join('、')],
    ['病院で確認されること', disease.details?.exam ?? disease.exam_examples.join('、')],
    ['相談先の目安', disease.details?.department ?? disease.department.join('、')],
  ] as const;

  return (
    <div className="space-y-5">
      <div className="card">
        <Link className="text-sm text-sky-700 hover:underline" href={`/diseases?category=${encodeURIComponent(disease.category)}`}>
          ← {disease.category}の一覧に戻る
        </Link>
        <p className="mt-2 text-sm text-green-700">{disease.category}</p>
        <h1 className="mt-2 text-2xl font-bold text-sky-800">{disease.name_ja}</h1>
      </div>
      {rows.map(([heading, body]) => (
        <section className="card" key={heading}>
          <h2 className="font-bold">{heading}</h2>
          <p className="mt-2 leading-7">{body}</p>
        </section>
      ))}
      <section className="card border-amber-200 bg-amber-50">
        <h2 className="font-bold">注意が必要なサイン</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
          {disease.red_flags.map((flag) => (
            <li key={flag}>{flag}</li>
          ))}
        </ul>
      </section>
      <p className="card text-sm">{disease.disclaimer}</p>
      <Disclaimer />
    </div>
  );
}
