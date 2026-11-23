import { useState } from "react";
import { LocaleProvider } from "../../../../packages/react/src/components/locale-provider/index.js";
import { FormatNumber } from "../../../../packages/react/src/components/format-number/index.js";

export function LocaleProviderExample() {
  const [localized, setLocalized] = useState(false);
  return (
    <div className="code-demo">
      <LocaleProvider
        locale={localized ? "ar-EG" : "en"}
        direction={localized ? "rtl" : "ltr"}
        role="region"
        aria-label="Localized sample"
      >
        <FormatNumber value={1234.5} />
      </LocaleProvider>
      <button type="button" onClick={() => setLocalized(!localized)}>
        {localized ? "Use English" : "Use Arabic"}
      </button>
    </div>
  );
}
