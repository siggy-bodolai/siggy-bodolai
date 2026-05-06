import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "siggybodolai",
  title: "Siggy Bodolaí",
  projectId: "e3hr0y1g",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            orderableDocumentListDeskItem({ type: "project", S, context }),
            S.listItem().title("Settings").id("settings").child(
              S.document().schemaType("settings").documentId("settings")
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
