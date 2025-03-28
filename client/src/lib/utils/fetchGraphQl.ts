import type { TypedDocumentString } from '@/lib/codegen/graphql/graphql'
 
async function fetchGraphQl<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch('http://localhost:4000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
 
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
 
  const jsonResponse = await response.json()
  const { data } = jsonResponse
  return data as TResult
}

export default fetchGraphQl