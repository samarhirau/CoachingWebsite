// app/course/[slug]/page.tsx
import { Dashboard } from '@/components/Dash';

interface PageProps {
  params: { slug: string };
}

export default function CoursePage({ params }: PageProps) {
  return <Dashboard slug={params.slug} />;
}
