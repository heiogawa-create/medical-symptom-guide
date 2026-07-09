import { commonDisclaimer, emergencyDisclaimer } from '@/lib/constants';

export function Disclaimer({ emergency = false }: { emergency?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-4 text-sm leading-7 ${
        emergency ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-sky-100 bg-sky-50 text-sky-900'
      }`}
    >
      {emergency ? emergencyDisclaimer : commonDisclaimer}
    </div>
  );
}
