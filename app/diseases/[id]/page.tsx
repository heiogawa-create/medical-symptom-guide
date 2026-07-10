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
    ['よくみられる症状', disease.common_symptoms.join('、')],
    ['関連しやすい症状', disease.related_symptoms.join('、')],
    ['似た症状が出る病気', disease.differential_examples.join('、')],
    ['病院で確認されること', disease.exam_examples.join('、')],
    ['相談先の目安', disease.department.join('、')],
    ['注意が必要なサイン', disease.red_flags.join('、')],
  ];

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
      <p className="card text-sm">{disease.disclaimer}</p>
      <Disclaimer />
    </div>
  );
}
