export default function PrivacyPage() {
  return (
    <div className="card space-y-3">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
      <p>本アプリは診断を行いません。</p>
      <p>入力された症状情報は、MVPではサーバーに保存しません。ブラウザ上で処理し、ページを閉じると利用できなくなります。</p>
      <p>将来的に保存機能を追加する場合は、事前に同意を得ます。</p>
      <p>医療上の判断は医師に相談する必要があります。緊急時は医療機関や救急へ相談してください。</p>
    </div>
  );
}
