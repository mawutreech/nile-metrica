import { defineField, defineType } from "sanity";

export const indicatorType = defineType({
  name: "indicator",
  title: "Indicator",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text" }),
    defineField({ name: "definition", title: "Definition", type: "text" }),
    defineField({ name: "unit", title: "Unit", type: "string" }),
    defineField({ name: "frequency", title: "Frequency", type: "string" }),
    defineField({ name: "source", title: "Source", type: "string" }),
    defineField({ name: "theme", title: "Theme", type: "reference", to: [{ type: "theme" }] }),
  ],
});