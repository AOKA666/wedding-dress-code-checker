import ToolClient from './ToolClient';

export const metadata = {
  title: 'Wedding Dress Code Checker Tool for Wedding Guests',
  description: 'Use this free wedding dress code checker to get practical outfit recommendations by dress code, venue, season, time of day, and style preference.',
  alternates: { canonical: '/wedding-dress-code-checker' }
};

export default function WeddingDressCodeCheckerPage() {
  return <ToolClient />;
}
