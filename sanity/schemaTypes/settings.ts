import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Your Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Your Role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "email", title: "Contact Email", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "instagram", title: "Instagram Handle", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio", title: "Bio", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio_extended", title: "Bio (continued)", type: "text" }),
    defineField({ name: "contact_intro", title: "Contact Page Intro", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "hero_media", title: "Homepage Hero Image", type: "image" }),
    defineField({ name: "hero_video", title: "Homepage Hero Video", type: "file", options: { accept: "video/*" } }),
  ],
});
