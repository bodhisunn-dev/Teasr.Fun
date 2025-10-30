import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(method: string, url: string, data?: unknown | undefined): Promise<Response> {
  // Get wallet address from localStorage or window object
  const walletAddress = localStorage.getItem('walletAddress') || (window as any).walletAddress;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (walletAddress) {
    headers['x-wallet-address'] = walletAddress;
  }

  const options: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});