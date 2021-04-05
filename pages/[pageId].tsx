import React from "react";
import Head from "next/head";

import { getPageTitle, getAllPagesInSpace } from "notion-utils";
import { NotionAPI } from "notion-client";
import { NotionRenderer, Code, Collection, CollectionRow } from "react-notion-x";
import { rootNotionPageId, rootNotionSpaceId } from "../site.config.js";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

const notion = new NotionAPI({
  authToken:
    "32059f364a994442754cf45677c86afc7c8d7ea763d0271814f0ed3c33e819121f7263827a65f468306cf98c2ede0b57d431a3e76bb01d5ba13aee61b8c1c19536a5c505a6cbd84a8976d6b5b104",
});

export const getStaticProps = async ({ params }) => {
  const pageId = params.pageId as string;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion),
    {
      traverseCollections: false,
    }
  );

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`);

  return {
    paths,
    fallback: true,
  };
}

export default function NotionPage({ recordMap }) {
  if (!recordMap) {
    return null;
  }
  const title = getPageTitle(recordMap);
  return (
    <>
      <Head>
        <meta name="description" content="notion blog" />
        <title>{title}</title>
      </Head>

      <NotionRenderer
        components={{ code: Code, collection: Collection, collectionRow: CollectionRow }}
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
      />
    </>
  );
}
