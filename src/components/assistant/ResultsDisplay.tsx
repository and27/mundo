import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import GuideDisplay from "./GuideDisplay";
import { GuideWithCharacter } from "@/types/ai";

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  guide: GuideWithCharacter | null;
  loadingMessage: string;
}

export default function ResultsDisplay({
  isLoading,
  error,
  guide,
  loadingMessage,
}: ResultsDisplayProps) {
  if (isLoading) {
    return <LoadingState message={loadingMessage} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (guide) {
    return (
      <div className="space-y-4">
        <GuideDisplay guide={guide} />
      </div>
    );
  }

  return <EmptyState />;
}
