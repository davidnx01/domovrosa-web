const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface Filter {
  [key: string]: string | number | boolean | Filter;
}

export type TStrapiData = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

interface FetchOptions {
  populate?: string | string[];
  filters?: Filter;
  sort?: string;
  pagination?: { pageSize: number; page?: number };
}

interface StrapiResponse<T> {
  data: T[] | T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T[] | T> {
  const params = new URLSearchParams();

  if (options.populate) {
    const populate = Array.isArray(options.populate)
      ? options.populate.join(',')
      : options.populate;
    params.append('populate', populate);
  }

  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        params.append(`filters[${key}]`, JSON.stringify(value));
      } else {
        params.append(`filters[${key}]`, String(value));
      }
    });
  }

  if (options.sort) {
    params.append('sort', options.sort);
  }

  if (options.pagination) {
    params.append('pagination[pageSize]', String(options.pagination.pageSize));
    if (options.pagination.page) {
      params.append('pagination[page]', String(options.pagination.page));
    }
  }

  const url = `${STRAPI_API_URL}/api/${endpoint}?${params.toString()}`;
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }

  const result: StrapiResponse<T> = await response.json();
  // Serialize and deserialize to ensure plain objects
  return JSON.parse(JSON.stringify(result.data));
}