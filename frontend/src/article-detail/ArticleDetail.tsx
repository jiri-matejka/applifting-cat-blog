import { Box, Heading, Text, HStack, Divider } from '@chakra-ui/react';
import { type ArticleDetailResponse, type FullArticle } from '../types/article';
import { useParams } from 'react-router-dom';
import { Comments } from './Comments';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useFetchData } from '@/api/useFetchData';
import { ApiFetchedContent } from '@/common/ApiFetchedContent';

type ArticleBodyProps = Pick<
  FullArticle,
  'createdAt' | 'content' | 'comments' | 'id'
>;

export default function ArticleDetailPage() {
  const { articleId } = useParams();

  const {
    data: articleResponse,
    isLoading,
    isError,
  } = useFetchData<ArticleDetailResponse>({
    endpoint: `/articles/${articleId}`,
    isEnabled: !!articleId,
  });

  if (!articleId) {
    return <h2>Article parameter was not supplied</h2>;
  }

  const article = articleResponse
    ? {
        ...articleResponse,
        createdAt: new Date(articleResponse.createdAt),
        lastUpdatedAt: new Date(articleResponse.lastUpdatedAt),
        comments: articleResponse.comments.map((comment) => ({
          ...comment,
          postedAt: new Date(comment.postedAt),
        })),
      }
    : undefined;

  return (
    <ApiFetchedContent
      isLoading={isLoading}
      isError={isError}
      errorText="Error fetching article details"
    >
      {article && (
        <>
          <Heading as="h1" pb="4">
            {article?.title}
          </Heading>

          <ArticleBody {...article} />
        </>
      )}
    </ApiFetchedContent>
  );
}

function ArticleBody({ createdAt, content, comments, id }: ArticleBodyProps) {
  return (
    <HStack>
      <Box width="37.5rem">
        <Text color="gray.500" fontSize="sm" mb="4">
          {createdAt.toDateString()}
        </Text>
        <Box mt={4}>
          <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
            {content}
          </ReactMarkdown>
        </Box>
        <Divider mt={4} mb={4} />
        <Comments comments={comments} articleId={id} />
      </Box>
    </HStack>
  );
}
