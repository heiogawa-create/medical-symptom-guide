import Link from 'next/link';
import { categories, categoryDetails } from '@/lib/constants';
import { searchDiseases } from '@/lib/diseases';

type SearchParams = Promise<{ q?: string; category?: string }>;

export default async function DiseasesPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  const category = resolvedSearchParams.category || '';
  const list = searchDiseases(query, category);
  const groupedDiseases = categoryDetails
    .map((detail) => ({
      ...detail,
      diseases: list.filter((disease) => disease.category === detail.name),
    }))
    .filter((group) => group.diseases.length > 0);

  return (
    <div className="space-y-8 py-3">
      <section>
        <p className="text-sm font-semibold text-sky-700">疾患学習</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">科目別の疾患一覧</h1>
        <p className="mt-3 leading-7 text-slate-600">
          調べたい科目を選ぶと、その分野に登録されている疾患を確認できます。
        </p>
      </section>

      <section aria-labelledby="category-heading">
        <h2 id="category-heading" className="text-xl font-bold">診療科・分野別に探す</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryDetails.map((detail) => {
            const count = searchDiseases('', detail.name).length;
            const isActive = category === detail.name;
            return (
              <Link
                key={detail.name}
                href={`/diseases?category=${encodeURIComponent(detail.name)}`}
                className={`rounded-3xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${detail.classes} ${
                  isActive ? 'ring-2 ring-sky-500 ring-offset-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold tracking-wide opacity-75">{detail.icon}</p>
                    <h3 className="mt-1 text-lg font-bold">{detail.name}</h3>
                  </div>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold">{count}疾患</span>
                </div>
                <p className="mt-3 text-sm leading-6 opacity-80">{detail.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <form className="card grid gap-3 sm:grid-cols-[1fr_14rem_auto] sm:items-end">
        <label className="grid gap-2 text-sm font-semibold">
          疾患名・症状名
        <input name="q" defaultValue={query} placeholder="疾患名・症状名で検索" className="rounded-2xl border p-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          科目
        <select name="category" defaultValue={category} className="rounded-2xl border p-3">
          <option value="">すべての科目</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        </label>
        <button className="btn bg-sky-600 text-white">検索</button>
      </form>

      {groupedDiseases.length > 0 ? (
        <div className="space-y-10">
          {groupedDiseases.map((group) => (
            <section key={group.name} id={group.name} className="scroll-mt-24">
              <div className={`rounded-3xl border p-5 ${group.classes}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold tracking-wide opacity-75">{group.icon}</p>
                    <h2 className="mt-1 text-2xl font-bold">{group.name}</h2>
                    <p className="mt-1 text-sm opacity-80">{group.description}</p>
                  </div>
                  <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold">
                    {group.diseases.length}疾患
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {group.diseases.map((disease) => (
                  <Link
                    className="card group hover:border-sky-300 hover:shadow-md"
                    href={`/diseases/${disease.id}`}
                    key={disease.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-sky-800 group-hover:text-sky-600">{disease.name_ja}</h3>
                      <span aria-hidden="true" className="text-sky-500">→</span>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{disease.overview}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="card text-center">
          <h2 className="font-bold">該当する疾患が見つかりませんでした</h2>
          <p className="mt-2 text-sm text-slate-600">検索語や科目を変更して、もう一度お試しください。</p>
          <Link href="/diseases" className="btn mt-4 bg-sky-600 text-white">すべての疾患を見る</Link>
        </div>
      )}
    </div>
  );
}
