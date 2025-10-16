export type TOrderCategory = {
  name: string;
  slug: string;
}

export type TOrder = {
  code: string;
  price: string;
  date_start: string;
  publication_date: string;
  signed_by: string;
  subject: string;
  partner: string;
  ico: string;
  order_category: TOrderCategory;
}