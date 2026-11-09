import { validateRepository } from "./repository.js";

const ids = await validateRepository(process.cwd());
console.log(`Validated ${ids.length} registry items`);
