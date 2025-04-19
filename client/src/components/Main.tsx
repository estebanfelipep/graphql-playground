import { useEffect, useState } from 'react';
import { Test, test } from '@eporg/react-components/ep';
import { useQuery } from '@tanstack/react-query';

import { graphql } from '@/lib/codegen/graphql';
import fetchGraphQl from '@/lib/utils/fetchGraphQl';

const BooksQuery = graphql(`
  query BookQuery {
    transactions {
      id
    }
  }
`);

function App() {
  const [count, setCount] = useState(0);

  console.log(test());

  // Queries
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchGraphQl(BooksQuery),
  });

  console.log(data?.transactions ? data?.transactions[0]?.id : 1);

  useEffect(() => {
    const makeCall = async () => {
      try {
        const response = await fetchGraphQl(BooksQuery);
        console.log({ response });

        if (
          response &&
          response.transactions &&
          response.transactions.length > 0
        ) {
          const firstId = response.transactions[0]?.id;
          console.log(firstId);
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
      <div className="text-cyan-400">There are {count} people</div>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <Test />
    </>
  );
}

export default App;
