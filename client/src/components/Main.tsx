import { useEffect, useState } from 'react';
import {
  useQuery,
  // useQueryClient,
} from '@tanstack/react-query';

import { graphql } from '@/lib/codegen/graphql';
import fetchGraphQl from '@/lib/utils/fetchGraphQl';

const BooksQuery = graphql(`
  query BookQuery {
    books {
      title
      author
    }
  }
`);

function App() {
  const [count, setCount] = useState(0);
  // const queryClient = useQueryClient();

  // Queries
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchGraphQl(BooksQuery),
  });

  console.log(data?.books ? data?.books[0]?.author : 1);

  useEffect(() => {
    const makeCall = async () => {
      try {
        const response = await fetchGraphQl(BooksQuery);
        console.log({ response });

        if (response && response.books && response.books.length > 0) {
          const firstWord = response.books[0]?.title;
          console.log(firstWord);
        } else {
          console.log('No books found in response');
        }
      } catch (e) {
        console.log(e);
      }
    };

    makeCall();
  }, []);

  return (
    <>
      <div>There are {count} people</div>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}

export default App;
