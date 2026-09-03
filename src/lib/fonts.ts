import { Inter, Sora } from 'next/font/google';

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontHeading = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});
