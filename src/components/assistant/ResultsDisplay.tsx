import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import GuideDisplay from "./GuideDisplay";
import { ActionableGuide } from "@/types/ai";

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  guide: ActionableGuide | null;
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
      <>
        <GuideDisplay guide={guide} />
      </>
    );
  }
  return <EmptyState />;
}
