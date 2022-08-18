import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import CustomCard from "./CustomCard";

const Feed = ({ posts }) => {
  return (
    <AnimatePresence className="flex flex-col items-center justify-center w-full">
      {/* //! Nullish coalescing operator (??) */}
      {(posts ?? []).length > 0 ? (
        (posts ?? []).map((post, index) => {
          return (
            <motion.div
              initial={{ x: -200 }}
              animate={{
                x: 0,
                transition: { duration: 0.5, delay: 0.1 * index },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.5 },
              }}
              key={post.caption}>
              <CustomCard
                photoURL={post.user.photoURL}
                name={post.user.name}
                creatorId={post.user.uid}
                postId={post.postId}
                cardImage={post.image}
                caption={post.caption}
                createdAt={post.createdAt}
                likes={post.likes}
              />
            </motion.div>
          );
        })
      ) : (
        <div className="fixed top-0 w-full h-[100vh] flex flex-col justify-center items-center text-neutral-500 text-3xl">
          Nothing to see here...
          <Button>
            <Link href="/new-post">
              <a>Create a Post</a>
            </Link>
          </Button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Feed;
