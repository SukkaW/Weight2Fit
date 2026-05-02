import { App } from '@/components/app';
import { Step3Instructions } from '@/components/step3-instructions';

export default function Page() {
  return <App step3Instructions={<Step3Instructions />} />;
}
