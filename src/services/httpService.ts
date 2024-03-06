type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: string | FormData;
}

export async function httpRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP request failed with status ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function httpRequestWithAuth<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const response: T = await httpRequest(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      ...options.headers,
    },
  });

  return response;
}
