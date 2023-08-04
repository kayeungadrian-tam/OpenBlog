interface Post {
  body: string;
  date: Date;
  description: string;
  isCompleted: boolean;
  title: string;
  slug: string;
  tags: string[];
}

interface ErrorObject {
  error: { message: string };
  status: number;
}
