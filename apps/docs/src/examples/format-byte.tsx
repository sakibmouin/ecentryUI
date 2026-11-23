import { FormatByte } from "../../../../packages/react/src/components/format-byte/index.js";

export function FormatByteExample() {
  return (
    <div className="code-demo">
      <p>
        Download size: <FormatByte value={1_500_000} />
      </p>
      <p lang="fr">
        Taille du fichier : <FormatByte value={1_500_000} locale="fr" />
      </p>
    </div>
  );
}
