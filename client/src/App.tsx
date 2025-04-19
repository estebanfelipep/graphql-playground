import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/App.css';
import '@eporg/react-components/baseCSS.css';

import Main from '@/components/Main';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;
