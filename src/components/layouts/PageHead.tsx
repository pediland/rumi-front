"use client";

import { Container } from "./Container";
import { usePageHeadStore } from "@/store/usePageHeadStore";

export function PageHead() {
  const { title, description } = usePageHeadStore();

  return (
    <div className="flex flex-1 items-center justify-center">
      <Container className="py-0">
        <div className="space-y-5 text-center">
          <h1 className="text-5xl font-medium text-violet-800">{title}</h1>
          <p className="text-violet-800">{description}</p>
        </div>
      </Container>
    </div>
  );
}
