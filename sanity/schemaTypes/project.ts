import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "project" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly ID, e.g. spring-campaign-nike",
      options: { source: "title", slugify: (input) => input.toLowerCase().replace(/\s+/g, "-") },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", title: "Campaign", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "year", title: "Year", type: "number", validation: (Rule) => Rule.required() }),
    defineField({ name: "featured", title: "Show on homepage", type: "boolean" }),
    defineField({ name: "tag", title: "Tag", type: "string" }),
    defineField({ name: "description", title: "About this project", type: "text" }),
    defineField({ name: "hero", title: "Hero Image", type: "image" }),
    defineField({ name: "hero_video", title: "Hero Video", type: "file", options: { accept: "video/*" } }),
    defineField({ name: "images", title: "Gallery Images", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "videos", title: "Gallery Videos", type: "array", of: [{ type: "file", options: { accept: "video/*" } }] }),
  ],
});
