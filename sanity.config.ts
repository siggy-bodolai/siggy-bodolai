import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "siggybodolai",
  title: "Siggy Bodolaí",
  projectId: "e3hr0y1g",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
