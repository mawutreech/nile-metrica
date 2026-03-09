import { defineField, defineType } from "sanity";

export const themeType = defineType({
  name: "theme",
  title: "Theme",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});