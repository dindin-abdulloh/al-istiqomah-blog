export class CreatePostDto {
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    category_id: number;
    author_id: number;
}