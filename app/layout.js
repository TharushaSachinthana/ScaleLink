import './globals.css';
import { ContentProvider } from './contexts/ContentContext';

export const metadata = {
  title: 'ScaleLink Technologies | Scaling Your Salon to the Next Level',
  description: 'All-in-one technology solutions for salons — premium websites, mobile apps, POS systems, CRM solutions, ScanReview QR system, and social media management. Based in Marawila, Sri Lanka.',
  keywords: 'salon technology, salon websites, salon POS, salon CRM, ScanReview, QR reviews, social media management, ScaleLink, Sri Lanka',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContentProvider>
          {children}
        </ContentProvider>
      </body>
    </html>
  );
}
