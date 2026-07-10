import Link from 'next/link';
import { categories } from '@/lib/constants';
import { diseases, searchDiseases } from '@/lib/diseases';

export default function DiseasesPage({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const query = searchParams.q || '';
  const category = searchParams.category || '';

  // 科目（カテゴリ）に属する疾患数を数え、疾患が登録されている科目だけ表示する
  const countByCategory = new Map<string, number>();
  for (const disease of diseases) {
    countByCategory.set(disease.category, (countByCategory.get(disease.category) || 0) + 1);
  }
  const availableCategories = categories.filter((item) => countByCategory.has(item));

  // 検索語がある、または科目が選ばれているときは病名の一覧を表示する
  const showDiseaseList = Boolean(query) || Boolean(category);
  const list = showDiseaseList ? searchDiseases(query, category) : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">疾患一覧</h1>
        {showDiseaseList && (
          <Link className="text-sm text-sky-700 hover:underline" href="/diseases">
            ← 科目一覧に戻る
          </Link>
        )}
      </div>

      <form className="card grid gap-3">
        <input name="q" defaultValue={query} placeholder="疾患名・症状名で検索" className="rounded-2xl border p-3" />
        <button className="btn bg-sky-600 text-white">検索</button>
      </form>

      {!showDiseaseList ? (
        <>
          <h2 className="font-bold">科目から探す</h2>
          <p className="text-sm text-slate-600">科目を選ぶと、その科目でよく相談される疾患名の一覧が表示されます。</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {availableCategories.map((item) => (
              <Link
                className="card flex items-center justify-between hover:border-sky-300"
                href={`/diseases?category=${encodeURIComponent(item)}`}
                key={item}
              >
                <span className="font-bold text-sky-800">{item}</span>
                <span className="text-sm text-slate-500">{countByCategory.get(item)}件</span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-bold">{category ? `${category}の疾患` : `「${query}」の検索結果`}</h2>
          {list.length === 0 ? (
            <p className="card text-sm text-slate-600">該当する疾患が見つかりませんでした。</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {list.map((disease) => (
                <Link className="card hover:border-sky-300" href={`/diseases/${disease.id}`} key={disease.id}>
                  <p className="text-xs text-green-700">{disease.category}</p>
                  <h3 className="mt-1 font-bold text-sky-800">{disease.name_ja}</h3>
                  <p className="mt-2 text-sm leading-6">{disease.overview}</p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
