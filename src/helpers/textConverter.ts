// import { slug } from "github-slugger";
// import { marked } from "marked";
import { micromark } from "micromark";
import Pluralize from "pluralize";

// slugify
// export const slugify = (content: string) => {
//   return slug(content);
// };

// https://byby.dev/js-slugify-string
export const slugify = (text: string): string => {
  return text
    .toString()

    .trim() // remove leading and trailing whitespace
    .toLowerCase() // convert to lowercase
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") //remove accent characters
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
};

export const deslugify = (text: string): string => {
  return text.toString().replace(/-/g, " ");
};

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  //   return div ? marked.parse(content) : marked.parseInline(content);
  return div ? micromark(content) : micromark(content);
};

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/[-\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  const parseMarkdown: any = micromark(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    }
  );
  return htmlWithoutEntities;
};

// pluralize

export { Pluralize as pluralize };

// export const pluralize = (
//   str: any,
//   count = 2,
//   suffix = "s",
//   includeCount = false
// ) => {
//   if (str.slice(-1) !== "s") {
//     let res = `${str}${count > 1 ? suffix : ""}`;
//     if (includeCount == true) return `${count} ${res}`;
//     return res;
//   } else {
//     if (includeCount == true) return `${count} ${str}`;
//     return str;
//   }
// };

export const singlify = (collection: string) => {
  const SINGLES: any = {
    news: "article",
  };
  return SINGLES[collection] || `${collection} entry`;
};
