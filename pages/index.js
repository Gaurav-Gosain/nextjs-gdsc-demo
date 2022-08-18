import Feed from "../components/Feed";

export default function Home({ posts }) {
  return (
    <div>
      <div className="text-center text-3xl">
        <h1>Home</h1>
      </div>
      <Feed posts={posts} />
    </div>
  );
}
