import { Mascot } from '@/components/Mascot';
import { commonDisclaimer, emergencyDisclaimer } from '@/lib/constants';

export function Disclaimer({ emergency = false }: { emergency?: boolean }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 text-sm leading-7 ${
        emergency ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-sky-100 bg-sky-50 text-sky-900'
      }`}
    >
      <Mascot pose="guide" className="mt-1 w-14 shrink-0" />
      <p>{emergency ? emergencyDisclaimer : commonDisclaimer}</p>
    </div>
  );
}
