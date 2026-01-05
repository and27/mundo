import { useState } from "react";

export function useAsyncSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const run = async <T,>(action: () => Promise<T>): Promise<T> => {
    setIsSubmitting(true);
    try {
      return await action();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, run };
}
