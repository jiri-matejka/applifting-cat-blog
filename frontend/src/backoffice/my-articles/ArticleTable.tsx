import { Button, Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { createColumnHelper } from '@tanstack/react-table';
import type { Article, FullArticle } from '@/types/article';
import { getArticles } from '@/articles-list/getArticles';
import { DataTable } from './DataTable';

type MyArticlesTableType = Pick<
  FullArticle,
  'articleId' | 'title' | 'perex'
> & {
  commentsCount: number;
};

export function ArticleTable() {
  const data: MyArticlesTableType[] = getArticles().map((article) => ({
    commentsCount: article.comments.length,
    ...article,
  }));

  return <DataTable<MyArticlesTableType> data={data} columns={columns} />;
}

const columnHelper = createColumnHelper<MyArticlesTableType>();

const columns = [
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    header: () => <span>Title</span>,
  }),
  columnHelper.accessor('perex', {
    cell: (info) => info.getValue(),
    header: () => <span>Perex</span>,
  }),
  columnHelper.accessor('commentsCount', {
    cell: (info) => info.getValue(),
    header: () => <span>Comments</span>,
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: (props) => <RowActions articleId={props.row.original.articleId} />,
    enableSorting: false,
  }),
];

function RowActions({ articleId }: { articleId: string }) {
  return (
    <Flex>
      <Button variant="ghost" aria-label="edit">
        <EditIcon
          onClick={() => {
            console.log('edit', articleId);
          }}
        />
      </Button>
      <Button variant="ghost" aria-label="edit">
        <DeleteIcon
          onClick={() => {
            console.log('delete', articleId);
          }}
        />
      </Button>
    </Flex>
  );
}
