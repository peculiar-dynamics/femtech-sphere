import { getSinglePage } from "./contentParser";
import { slugify } from "./textConverter";
import { getCollection } from "astro:content";

// get taxonomy from frontmatter
// export const getTaxonomy2 = async (collection: any, name: string) => {
//   const singlePages = await getSinglePage(collection);
//   const taxonomyPages = singlePages.map((page: any) => page.data[name]);
//   let taxonomies: string[] = [];
//   for (let i = 0; i < taxonomyPages.length; i++) {
//     const categoryArray = taxonomyPages[i];
//     for (let j = 0; j < categoryArray.length; j++) {
//       taxonomies.push(slugify(categoryArray[j]));
//     }
//   }
//   const taxonomy = [...new Set(taxonomies)];
//   return taxonomy;
// };

export const getTaxonomy = async (collection: any, name: string) => {
  // const allItems = await getCollection("blog", ({ data }) => {
  const allItems = await getCollection(collection, ({ data }: any) => {
    // return data.draft !== true;
    // Filter out content entries with `draft: true` only when building for production
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const taxonomies = [
    ...new Set(allItems.map((item: any) => item.data[name]).flat()),
  ];
  // console.log(taxonomies);
  return taxonomies;
};

// get all taxonomies from frontmatter
// export const getAllTaxonomy = async (collection: any, name: string) => {
//   const singlePages = await getSinglePage(collection);
//   const taxonomyPages = singlePages.map((page: any) => page.data[name]);
//   let taxonomies: string[] = [];
//   for (let i = 0; i < taxonomyPages.length; i++) {
//     const categoryArray = taxonomyPages[i];
//     for (let j = 0; j < categoryArray.length; j++) {
//       taxonomies.push(slugify(categoryArray[j]));
//     }
//   }
//   return taxonomies;
// };
export const getAllTaxonomy = async (collection: any, name: string) => {
  // const allItems = await getCollection("blog", ({ data }) => {
  const allItems = await getCollection(collection, ({ data }: any) => {
    // return data.draft !== true;
    // Filter out content entries with `draft: true` only when building for production
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  const taxonomyArray: string[] = allItems
    .map((item: any) => item.data[name])
    .flat();

  const dedupedTaxonomy: { [Identifier: string]: number } =
    taxonomyArray.reduce((accumulator: any, currentItem) => {
      accumulator[currentItem] = (accumulator[currentItem] || 0) + 1;
      return accumulator;
    }, {});
  return dedupedTaxonomy;
};
