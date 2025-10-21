export type TInvoiceCategory = {
  name: string;
  slug: string;
}

export type TInvoice = {
  code: string;
  price: string;
  publication_date: string;
  effective_date: string;
  signature_date: string;
  valid_from: string;
  valid_to: string;
  category: string;
  name: string;
  subject: string;
  partner: string;
  invoice_category: TInvoiceCategory;
}