export default function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="w-8 h-8 border-4 border-slate-500 border-t-white rounded-full animate-spin"></div>
      <p className="text-slate-300 transition-opacity duration-500">
        {message}
      </p>
    </div>
  );
}
