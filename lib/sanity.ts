import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "e3hr0y1g",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
