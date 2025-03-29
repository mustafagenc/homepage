'use client';

import NextError from 'next/error';

export default function GlobalError(props: {
  error: Error & { digest?: string };
}) {
  console.log(props);
  return (
    <html lang="tr">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
