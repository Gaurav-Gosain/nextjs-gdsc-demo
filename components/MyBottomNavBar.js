import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useRouter } from "next/router";

export default function MyBottomNavBar({ pathname }) {
  const router = useRouter();
  const [value, setValue] = React.useState(pathname);

  React.useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "xl" }}
      value={value}
      onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="/"
        icon={<HomeRoundedIcon />}
        onClick={() => {
          router.push("/");
        }}
      />
      <BottomNavigationAction
        label="New Post"
        value="/new-post"
        icon={<AddCircleRoundedIcon />}
        onClick={() => {
          router.push("/new-post");
        }}
      />
      <BottomNavigationAction
        label="Profile"
        value="/profile"
        icon={<PersonRoundedIcon />}
        onClick={() => {
          router.push("/profile");
        }}
      />
    </BottomNavigation>
  );
}
