import { Mascot } from '@/components/Mascot';

export default function AboutPage() {
  return (
    <div className="card">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Mascot pose="cheer" className="w-28 shrink-0 sm:w-32" title="受診目安ナビのイメージキャラクター" />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">このアプリについて</h1>
          <p>受診目安ナビは、症状から関連する疾患知識、受診科の目安、医師に伝えるポイントを整理する教育用Webアプリです。</p>
          <p>本アプリは診断、治療、処方を行いません。強い症状や不安がある場合は医療機関で相談してください。</p>
        </div>
      </div>
    </div>
  );
}
