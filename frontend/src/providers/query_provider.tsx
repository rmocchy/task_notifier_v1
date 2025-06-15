import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TanStack QueryはReact Queryの新しいやつ
// 利用にはproviderが必要
const queryClient = new QueryClient()

const TanStackQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default TanStackQueryProvider;