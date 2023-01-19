export type CreateUserParams = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  email: string;
  password: string;
};

export type CreateUserProfilParams = {
  firstName: string;
  lastName: string;
  dob: string;
  bio: string;
};

export type CreateBlogPostParams = {
  title: string;
  excerpt: string;
  content: string;
};

export type CreateAuthorParams = {
  name: string;
  bio: string;
};

export type CreatePostParams = {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category_id: number;
  author_id: number;
};

export type CreateCategoriesParams = {
  name: string;
  slug: string;
};
