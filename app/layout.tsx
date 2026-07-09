import './globals.css';
import Link from 'next/link';
import { appConfig } from '@/lib/constants';
import { Disclaimer } from '@/components/Disclaimer';
export const metadata = { title: appConfig.name, description: appConfig.tagline };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ja"><body><header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-5xl items-center justify-between p-4"><Link href="/" className="font-bold text-sky-700">{appConfig.name}</Link><nav className="flex gap-3 text-sm"><Link href="/symptom-check">症状入力</Link><Link href="/diseases">疾患一覧</Link><Link href="/about">概要</Link></nav></div></header><main className="mx-auto max-w-5xl p-4">{children}</main><footer className="mx-auto max-w-5xl space-y-4 p-4 pb-10"><Disclaimer/><div className="flex gap-4 text-sm text-slate-600"><Link href="/privacy">プライバシー</Link><Link href="/terms">利用規約</Link></div></footer></body></html>}
