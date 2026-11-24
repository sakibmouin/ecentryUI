import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { Theme } from "./theme.js";

it("renders explicit nested light and dark scopes during SSR", () => {
  const html = renderToStaticMarkup(
    <Theme appearance="dark">
      <Theme appearance="light">Content</Theme>
    </Theme>,
  );
  expect(html).toContain('data-ec-theme="dark"');
  expect(html).toContain('data-ec-theme="light"');
  expect(html).toContain(">Content</div>");
});
