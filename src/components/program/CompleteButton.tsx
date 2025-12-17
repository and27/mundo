export default function CompleteButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 
                 hover:from-indigo-600 hover:to-purple-700 
                 text-white py-4 rounded-2xl font-semibold text-lg
                 transition-all duration-300 shadow-lg hover:shadow-2xl"
    >
      {label}
    </button>
  );
}
