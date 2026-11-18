import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Tree View navigates, expands, selects and stays accessible", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4177/components/tree-view/");
  const region = page.getByRole("region", { name: "Tree view example" });
  const tree = region.getByRole("tree", { name: "Project files" });
  await tree.focus();
  await tree.press("ArrowDown");
  await expect(tree).toHaveAttribute("aria-activedescendant", /reports/);
  await tree.press("ArrowDown");
  await tree.press("Enter");
  await expect(tree.getByRole("treeitem", { name: /Plans/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await region.getByRole("button", { name: "Collapse Documents" }).click();
  await expect(tree.getByRole("treeitem", { name: /Plans/ })).toHaveCount(0);
  await region.getByRole("button", { name: "Dark mode" }).click();
  const audit = await new AxeBuilder({ page }).analyze();
  expect(
    audit.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    ),
  ).toEqual([]);
});
