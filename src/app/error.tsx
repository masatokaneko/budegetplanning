'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          エラーが発生しました
        </h2>
        <p className="mb-4 text-gray-600">
          申し訳ありませんが、予期せぬエラーが発生しました。
        </p>
        {error.digest && (
          <p className="mb-4 text-sm text-gray-500">
            エラーID: {error.digest}
          </p>
        )}
        <div className="flex justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="mr-4"
          >
            再試行
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  );
} 