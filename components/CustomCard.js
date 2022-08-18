import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Auth/firebaseAuth";
import moment from "moment";

//? Firebase functions we will use:
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const CustomCard = ({
  photoURL,
  name,
  likes,
  cardImage,
  createdAt,
  creatorId,
  caption,
  postId,
}) => {
  const [open, setOpen] = useState(false);

  const [buttonRef, setButtonRef] = useState(null);

  const [loading, setLoading] = useState(false);

  const [user] = useAuthState(auth);

  const updateLikes = async () => {
    //! Firestore update operation here...
  };

  const deletePost = async () => {
    //! Firestore delete operation here...
  };

  return (
    <Card
      className="w-[90vw] md:w-[32rem] mx-auto my-12 rounded-3xl overflow-x-hidden"
      elevation={20}>
      <CardHeader
        avatar={<Avatar src={photoURL} referrerPolicy="no-referrer" />}
        action={
          <div>
            {creatorId === user.uid && (
              <IconButton
                onClick={(event) => {
                  setOpen(!open);
                  setButtonRef(event.currentTarget);
                }}>
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              anchorEl={buttonRef}
              open={open}
              onClose={() => {
                setOpen(false); // closes the menu when you click outside the menu
              }}>
              <MenuItem onClick={deletePost}>Delete</MenuItem>
            </Menu>
          </div>
        }
        title={name}
        subheader={moment(createdAt).fromNow()}></CardHeader>
      <CardMedia
        component="img"
        image={cardImage}
        alt="Post Image"
        onLoad={() => {
          setLoading(true);
        }}
      />
      {!loading && (
        <div className="w-[95vw] md:w-[32rem]">
          <Skeleton variant="rect" width={"100%"} height={300} />
        </div>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary" className="text-lg">
          {caption}
        </Typography>
      </CardContent>
      <CardActions className="flex flex-row justify-between">
        <div>
          <IconButton onClick={updateLikes}>
            <FavoriteIcon
              color={likes.includes(user?.uid) ? "error" : "default"}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              alert("Shared successfully!");
            }}>
            <ShareIcon />
          </IconButton>
        </div>
        <div className="text-3xl mr-3">{likes.length}</div>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
