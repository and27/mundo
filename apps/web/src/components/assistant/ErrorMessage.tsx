export default function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-400 text-center">{message}</p>;
}
