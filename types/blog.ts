export type TBlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export type TBlog = {
  id: number;
  name: string;
  slug: string;
  category: TBlogCategory;
  image: string;
  content: string;
}