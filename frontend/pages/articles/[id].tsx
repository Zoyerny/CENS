import { useRouter } from "next/router";

export default function ArticleView() {
    const router = useRouter();
  return (
    <div>{router.query.id}</div>
  )
}
