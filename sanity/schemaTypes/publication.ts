import { defineField, defineType } from "sanity";

export const publicationType = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "date", title: "Publication Date", type: "date" }),
    defineField({ name: "type", title: "Type", type: "string" }),
  ],
});