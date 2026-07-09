import Link from 'next/link';
import { categories } from '@/lib/constants';
import { searchDiseases } from '@/lib/diseases';

export default function DiseasesPage({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const query = searchParams.q || '';
  const category = searchParams.category || '';
  const list = searchDiseases(query, category);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">疾患一覧</h1>
      <form className="card grid gap-3">
        <input name="q" defaultValue={query} placeholder="疾患名・症状名で検索" className="rounded-2xl border p-3" />
        <select name="category" defaultValue={category} className="rounded-2xl border p-3">
          <option value="">すべてのカテゴリ</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <button className="btn bg-sky-600 text-white">検索</button>
      </form>

      <h2 className="font-bold">関連する疾患の例</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((disease) => (
          <Link className="card hover:border-sky-300" href={`/diseases/${disease.id}`} key={disease.id}>
            <p className="text-xs text-green-700">{disease.category}</p>
            <h3 className="mt-1 font-bold text-sky-800">{disease.name_ja}</h3>
            <p className="mt-2 text-sm leading-6">{disease.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
