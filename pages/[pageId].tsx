import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'

import { ReactUtterances } from '../components/ReactUtterances'

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

const notion = new NotionAPI({
  authToken: process.env.AUTHTOKEN
})
//   parsePageId(block.id) === parsePageId(site.rootNotionPageId)

export const getStaticProps = async ({ params }) => {
  const pageId = params.pageId as string
  const recordMap = await notion.getPage(pageId)

  return {
    props: {
      recordMap
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const pages = await getAllPagesInSpace(
    process.env.ROOTNOTIONPAGEID,
    process.env.ROOTNOTIONSPACEID,
    notion.getPage.bind(notion),
    {
      traverseCollections: false
    }
  )

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`)

  return {
    paths,
    fallback: true
  }
}

export default function NotionPage({ recordMap }) {
  if (!recordMap) {
    return null
  }
  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value
  const isBlogPost =
    block.type === 'page' && block.parent_table === 'collection'
  let comments: React.ReactNode = null
  if (isBlogPost) {
    comments = (
      <ReactUtterances
        repo='kiduckson/utterances-repo'
        issueMap='issue-term'
        issueTerm='title'
        theme='github-light'
      />
    )
  }
  const Pdf = dynamic(() =>
    import('react-notion-x').then((notion) => notion.Pdf)
  )

  const Equation = dynamic(() =>
    import('react-notion-x').then((notion) => notion.Equation)
  )

  const title = getPageTitle(recordMap)
  return (
    <>
      <Head>
        <meta name='description' content='notion blog' />
        <title>{title}</title>
      </Head>

      <NotionRenderer
        components={{
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
          equation: Equation,
          pdf: Pdf
        }}
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        pageFooter={comments}
      />
    </>
  )
}
