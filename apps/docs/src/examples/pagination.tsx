import { useState } from "react";
import { AppearanceProvider } from "@ecentry/foundations/react";
import { Pagination } from "../../../../packages/react/src/components/pagination/pagination.js";
import "../../../../packages/react/src/components/pagination/pagination.css";
export function PaginationExample() {
  const [page, setPage] = useState(4);
  const [dark, setDark] = useState(false);
  return (
    <AppearanceProvider appearance={dark ? "dark" : "light"}>
      <div
        className="code-demo themed-code-demo"
        role="region"
        aria-label="Pagination example"
      >
        <p>Showing page {page} of 12</p>
        <Pagination count={12} page={page} onPageChange={setPage} />
        <button type="button" onClick={() => setDark(!dark)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </AppearanceProvider>
  );
}
