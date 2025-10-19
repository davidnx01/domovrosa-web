// lib/api.tsx

/**
 * Unified Strapi API helper
 * - fetchData: server-side usage (SSR / server components)
 * - fetchClientData: client-side usage (React Query, useEffect, client components)
 *
 * Both functions return Strapi `data` (T[] | T) and support:
 * - populate (string | string[])
 * - filters (deep nested objects, operators like $eq, $in, etc.)
 * - pagination (pageSize, page, start, limit)
 * - sort (string | string[])
 *
 * NOTE: For client-side calls we prefer NEXT_PUBLIC_STRAPI_API_URL. Make sure
 * NEXT_PUBLIC_STRAPI_API_URL is set in .env.local and Strapi CORS allows your frontend.
 */

/* ----------------------------- Types / Interfaces ---------------------------- */

type Primitive = string | number | boolean | null;

export type TStrapiData = {
  id: number;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type TMeta = {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
};

export type Filter = Primitive | Array<Primitive> | { [key: string]: Filter }; // nested filters or operator objects

export interface PaginationOptions {
  pageSize?: number;
  page?: number;
  start?: number;
  limit?: number;
}

export interface FetchOptions {
  populate?: string | string[];
  filters?: { [key: string]: Filter };
  sort?: string | string[];
  pagination?: PaginationOptions;
}

export interface StrapiResponse<T> {
  data: T[] | T;
  meta: TMeta;
}

/* ------------------------------- Config / URLs ------------------------------- */

// Primary server URL (can be STRAPI_INTERNAL_URL in containerized setups)
const STRAPI_API_URL =
  process.env.STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  "http://localhost:1337";

/* -------------------------------- Utility: buildQuery ------------------------------- */

/**
 * Build URL query string from FetchOptions
 * - populate: appended as multiple `populate=field` params (Strapi accepts both comma and repeated)
 * - filters: recursively expanded as `filters[a][b][$eq]=value`
 * - pagination: expanded to pagination[...] keys
 * - sort: single csv string
 */
function buildQuery(options: FetchOptions = {}): string {
  const params = new URLSearchParams();

  // -- populate --
  if (options.populate) {
    if (typeof options.populate === "string") {
      params.append("populate", options.populate);
    } else if (Array.isArray(options.populate)) {
      // append multiple populate entries (results in ?populate=img&populate=cat)
      options.populate.forEach((p) => params.append("populate", p));
    }
  }

  // -- pagination --
  if (options.pagination) {
    const { pageSize, page, start, limit } = options.pagination;
    if (pageSize !== undefined)
      params.append("pagination[pageSize]", String(pageSize));
    if (page !== undefined) params.append("pagination[page]", String(page));
    if (start !== undefined) params.append("pagination[start]", String(start));
    if (limit !== undefined) params.append("pagination[limit]", String(limit));
  }

  // -- sort --
  if (options.sort) {
    if (typeof options.sort === "string") params.append("sort", options.sort);
    else if (Array.isArray(options.sort))
      params.append("sort", options.sort.join(","));
  }

  // -- filters (recursive) --
  function buildFilters(obj: { [key: string]: Filter }, prefix = "filters") {
    Object.entries(obj).forEach(([key, value]) => {
      const path = `${prefix}[${key}]`;

      if (value === null) {
        params.append(path, "null");
        return;
      }

      if (Array.isArray(value)) {
        // Join arrays with comma (Strapi supports CSV for some operators like $in)
        // e.g. filters[field][$in]=a,b
        params.append(path, value.map((v) => String(v)).join(","));
        return;
      }

      if (typeof value === "object") {
        // nested object (could be operator like {$eq: 'x'} or deeper nesting)
        buildFilters(value as { [k: string]: Filter }, path);
        return;
      }

      // primitive
      params.append(path, String(value));
    });
  }

  if (options.filters) {
    buildFilters(options.filters);
  }

  return params.toString();
}

/* ----------------------------- Server-side fetch ------------------------------ */

/**
 * fetchData: for server components / server-side usage
 * - uses STRAPI_API_URL (which prefers STRAPI_API_URL env if set, else NEXT_PUBLIC_STRAPI_API_URL)
 */
export async function fetchData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T[] | T> {
  const query = buildQuery(options);
  const url = `${STRAPI_API_URL.replace(/\/$/, "")}/api/${endpoint}${
    query ? `?${query}` : ""
  }`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`
    );
  }

  const json: StrapiResponse<T> = await res.json();
  return json.data;
}

/* ---------------------------- Client-side fetch ------------------------------- */

/**
 * fetchClientData: for client components (React Query, useEffect)
 * - explicitly prefers NEXT_PUBLIC_STRAPI_API_URL for browser-safe URL
 * - returns json.data (T[] | T)
 */
export async function fetchClientData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T[] | T> {
  const query = buildQuery(options);

  const base =
    (process.env.NEXT_PUBLIC_STRAPI_API_URL &&
      process.env.NEXT_PUBLIC_STRAPI_API_URL.replace(/\/$/, "")) ||
    STRAPI_API_URL.replace(/\/$/, "");

  const url = `${base}/api/${endpoint}${query ? `?${query}` : ""}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`
      );
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("[fetchClientData] error fetching", url, err);
    throw err;
  }
}

/* ----------------------------- Convenience exports ---------------------------- */

// Example helper that you had before
export async function fetchGeneral() {
  return fetchData("general", { populate: ["logo", "seo"] });
}
