import { getRouteBySource, SOURCES } from "@cdt/sources";
import slugify from "../slugify";

export function toSlug(label, position) {
  return `${position}-${slugify(label)}`;
}

export function toBreadcrumbs({ label, position }) {
  return {
    label: label,
    slug: `/${getRouteBySource(SOURCES.THEMES)}/${toSlug(label, position)}`,
  };
}

export function createThemer(themes) {
  return function getTheme(slug) {
    const theme = themes.find((theme) =>
      theme.refs.some((ref) => ref.url.match(new RegExp(slug)))
    );
    let breadcrumbs = [];
    if (theme) {
      breadcrumbs = (theme.breadcrumbs || []).map(toBreadcrumbs).concat([
        {
          label: theme.title,
          slug: `/${getRouteBySource(SOURCES.THEMES)}/${toSlug(
            theme.title,
            theme.position
          )}`,
        },
      ]);
    }
    return breadcrumbs;
  };
}
