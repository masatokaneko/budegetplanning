import { Progress } from '@/components/ui/progress';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          読み込み中...
        </h2>
        <Progress value={undefined} className="h-2" />
        <p className="mt-4 text-center text-gray-600">
          データを読み込んでいます。しばらくお待ちください。
        </p>
      </div>
    </div>
  );
} 