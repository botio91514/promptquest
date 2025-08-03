import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from './components/ClientLayout';

export const metadata: Metadata = {
  title: 'PromptQuest - Master the Art of AI Prompting',
  description: 'A gamified adventure to learn prompt engineering through quests and challenges',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-game">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
