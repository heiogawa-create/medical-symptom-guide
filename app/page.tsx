import Link from 'next/link';
import { Mascot } from '@/components/Mascot';
import { appConfig } from '@/lib/constants';

export default function Home() {
  return (
    <div className="space-y-6 py-6">
      <section className="card bg-gradient-to-br from-sky-50 to-green-50">
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-700">疾患学習・受診目安サポート</p>
            <h1 className="mt-3 text-3xl font-bold text-sky-800">{appConfig.name}</h1>
            <p className="mt-3 text-xl font-semibold">{appConfig.tagline}</p>
            <p className="mt-4 leading-8">
              このアプリは診断を行うものではありません。症状をもとに、関連する疾患の例、受診科の目安、医師に伝えるポイントを整理するための学習ツールです。
            </p>
          </div>
          <Mascot pose="cheer" className="w-36 shrink-0 sm:w-44" title={`${appConfig.name}のイメージキャラクター`} />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link className="btn bg-sky-600 text-white" href="/symptom-check">
            症状を入力する
          </Link>
          <Link className="btn bg-white text-sky-700 ring-1 ring-sky-200" href="/diseases">
            疾患一覧を見る
          </Link>
        </div>
      </section>
      <div className="card border-amber-100 bg-amber-50">
        強い症状や緊急性がある場合は、アプリの利用を待たず医療機関へ相談してください。
      </div>
    </div>
  );
}
