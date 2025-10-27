import { TImage } from "@/lib/utils";
import { TPage } from "./page";
import { TStrapiData } from "@/lib/api";

export type TGeneral = {
  logo: TImage;
  phone: string;
  email: string;
  address: string;
  city: string;
  post_code: string;
  company_name: string;
  company_address: string;
  company_post_code: string;
  company_city: string;
  company_state: string;
  ico: string;
  dic: string;
  seo: TPage['seo'];
}

export type THeading = {
  subtitle: string;
  title: string;
}

export type TMember = TStrapiData & {
  name: string;
  role: string;
  image: TImage;
  phone_1: string;
  phone_2: string;
  email_1: string;
  email_2: string;
}

export type TJobOffer = TStrapiData & {
  role: string;
  job_description: string;
  date_start: string;
  employment_type: string;
  requirements: string;
  we_offer: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
}