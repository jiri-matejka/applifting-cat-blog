import { Box, Heading, Text, Image, HStack, Divider } from '@chakra-ui/react';
import { type Article } from '../types/article';
import { getArticles } from '@/articles-list/getArticles';
import { useParams } from 'react-router-dom';
import { Comments } from './Comments';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

type ArticleBodyProps = Pick<
  Article,
  'title' | 'author' | 'createdAt' | 'content' | 'comments' | 'todo_ImageUrl'
>;

export function ArticleDetailPage() {
  const { articleId } = useParams();

  if (!articleId) {
    throw new Error('articleId missing');
  }

  //const { title, author, createdAt, content, comments, imageId } = ;

  return (
    <>
      <Heading as="h1" pb="4">
        {getArticles()[0].title}
      </Heading>

      <ArticleBody {...getArticles()[0]} />
    </>
  );
}

function ArticleBody({
  title,
  author,
  createdAt,
  content,
  comments,
  todo_ImageUrl,
}: ArticleBodyProps) {
  return (
    <HStack>
      <Box width="37.5rem">
        <Text color="gray.500" fontSize="sm" mb="4">
          {author} ⦁ {createdAt.toDateString()}
        </Text>
        <Image src={todo_ImageUrl} alt={title} mb={4} objectFit="cover" />
        <Box mt={4}>
          <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
            {content}
          </ReactMarkdown>
        </Box>
        <Divider mt={4} mb={4} />
        <Comments comments={comments} />
      </Box>
    </HStack>
  );
}
