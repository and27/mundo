"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "../assistant/InputForm";

export default function AssistantSection() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = (query: string) => {
    const encoded = encodeURIComponent(query);
    setIsRedirecting(true);
    router.push(`/parentDashboard?section=guides&newStoryQuery=${encoded}`);
  };

  return (
    <>
      <InputForm isLoading={isRedirecting} onSubmit={handleSubmit} />
    </>
  );
}
