import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "jg3sgard",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
