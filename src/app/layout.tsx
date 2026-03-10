import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nutrition Questionnaire',
  description: 'Get a personalized nutrition plan based on your health goals and lifestyle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
