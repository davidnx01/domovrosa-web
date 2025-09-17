export function GetStrapiImage(url: string) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
}