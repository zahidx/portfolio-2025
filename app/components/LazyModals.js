"use client";

import dynamic from "next/dynamic";

// Lazy-load heavy interactive modals so their code ships only after first paint.
// ssr:false keeps them out of the server HTML (must live in a Client Component);
// the floating trigger buttons still mount client-side right after hydration.
const TerminalModal = dynamic(() => import("./TerminalModal"), {
  ssr: false,
  loading: () => null,
});

const AIChatModal = dynamic(() => import("./AIChatModal"), {
  ssr: false,
  loading: () => null,
});

export default function LazyModals() {
  return (
    <>
      <TerminalModal />
      <AIChatModal />
    </>
  );
}
