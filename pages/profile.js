import Feed from "../components/Feed";

export default function Profile({ user, posts }) {
  return (
    <div>
      <div className="text-center text-2xl">
        <h1>{user?.displayName}</h1>
      </div>
      <Feed
        posts={posts?.filter((p) => {
          return p.user.uid === user.uid;
        })}
      />
    </div>
  );
}
