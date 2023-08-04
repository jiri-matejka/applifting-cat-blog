import { Button, Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { createColumnHelper } from '@tanstack/react-table';
import type { Article, FullArticle } from '@/types/article';
import { getArticles } from '@/articles-list/getArticles';
import { DataTable } from './DataTable';
import { useFetchData } from '@/api/useFetchData';
import { ApiFetchedContent } from '@/common/ApiFetchedContent';

type MyArticlesTableType = Pick<FullArticle, 'id' | 'title' | 'perex'>;

export function ArticleTable() {
  const { data, isLoading, isError } = useFetchData<Article[]>({
    endpoint: '/articles/my-articles',
  });

  return (
    <ApiFetchedContent
      isLoading={isLoading}
      isError={isError}
      errorText="Error fetching my articles"
    >
      {data && <DataTable<MyArticlesTableType> data={data} columns={columns} />}
    </ApiFetchedContent>
  );
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
  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: (props) => <RowActions articleId={props.row.original.id} />,
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
