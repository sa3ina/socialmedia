import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Users {
  username: String;
  surname: String;
  email: String;
  password: String;
  isPublic: Boolean;
  posts: Array;
  follower: Array;
  following: Array;
  blockList: Array;
  stories: Array;
  notifications: Array;
  bio: { info: String; country: String };
  id: String;
}
interface UserState {
  users: Users[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};
type FollowPayload = {
  userToUpdate: Users;
  userToFollow: Users;
};
export const fetchUsers = createAsyncThunk("news/fetchUsers", async () => {
  try {
    const response = await axios.get<Users[]>(
      "https://usersapi-2rke.onrender.com/users"
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
});
export const addPost = createAsyncThunk("users/addPost", async (newItem) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "");
  const response = await axios.get("https://usersapi-2rke.onrender.com/users");
  const users = response.data;

  const userToUpdate = users.find(
    (user: any) => user.username === loggedInUser.username
  );

  console.log(userToUpdate);
  if (userToUpdate) {
    const updatedPosts = [...userToUpdate.posts, newItem];

    await axios.patch(
      `https://usersapi-2rke.onrender.com/users/${userToUpdate.id}`,
      {
        posts: updatedPosts,
      }
    );

    return { ...userToUpdate, posts: updatedPosts };
  } else {
    throw new Error("User to follow not found");
  }
});
export const followUser = createAsyncThunk<FollowPayload, string>(
  "users/followUser",
  async (userId) => {
    try {
      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser") || ""
      );

      const response = await axios.get(
        "https://usersapi-2rke.onrender.com/users"
      );
      const users = response.data;

      const userToUpdate = users.find(
        (user: any) => user.username === loggedInUser.username
      );
      const userToFollow = users.find((user: any) => user.id === userId);
      if (userToUpdate && userToFollow) {
        const updatedFollowing = [...userToUpdate.following, userId];
        const updatedFollowers = [...userToFollow.follower, userToUpdate.id];
        await Promise.all([
          axios.patch(
            `https://usersapi-2rke.onrender.com/users/${userToUpdate.id}`,
            {
              following: updatedFollowing,
            }
          ),
          axios.patch(
            `https://usersapi-2rke.onrender.com/users/${userToFollow.id}`,
            {
              follower: updatedFollowers,
            }
          ),
        ]);
        return { userToUpdate, userToFollow };
      } else {
        throw new Error("User to follow not found");
      }
    } catch (error) {
      throw new Error("Failed to follow user");
    }
  }
);
export const unfollowUser = createAsyncThunk<FollowPayload, string>(
  "users/unfollowUser",
  async (userId) => {
    try {
      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser") || ""
      );
      const response = await axios.get(
        "https://usersapi-2rke.onrender.com/users"
      );
      const users = response.data;

      const userToUpdate = users.find(
        (user: any) => user.username === loggedInUser.username
      );
      const userToFollow = users.find((user: any) => user.id === userId);

      if (userToUpdate && userToFollow) {
        const updatedFollowing = userToUpdate.following.filter(
          (id: string) => id !== userId
        );
        const updatedFollowers = userToFollow.follower.filter(
          (id: string) => id !== userToUpdate.id
        );

        await Promise.all([
          axios.patch(
            `https://usersapi-2rke.onrender.com/users/${userToUpdate.id}`,
            {
              following: updatedFollowing,
            }
          ),
          axios.patch(
            `https://usersapi-2rke.onrender.com/users/${userToFollow.id}`,
            {
              follower: updatedFollowers,
            }
          ),
        ]);

        return { userToUpdate, userToFollow };
      } else {
        throw new Error("User to unfollow not found");
      }
    } catch (error) {
      throw new Error("Failed to unfollow user");
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      const { userToUpdate, userToFollow } = action.payload;

      const updatedUserIndex = state.users.findIndex(
        (user) => user.id === userToUpdate.id
      );
      if (updatedUserIndex !== -1) {
        state.users[updatedUserIndex] = userToUpdate;
      }

      const updatedFollowedUserIndex = state.users.findIndex(
        (user) => user.id === userToFollow.id
      );
      if (updatedFollowedUserIndex !== -1) {
        state.users[updatedFollowedUserIndex] = userToFollow;
      }
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      state.loading = false;
      const { userToUpdate, userToFollow } = action.payload;

      const updatedUserIndex = state.users.findIndex(
        (user) => user.id === userToUpdate.id
      );
      if (updatedUserIndex !== -1) {
        state.users[updatedUserIndex] = userToUpdate;
      }

      const updatedFollowedUserIndex = state.users.findIndex(
        (user) => user.id === userToFollow.id
      );
      if (updatedFollowedUserIndex !== -1) {
        state.users[updatedFollowedUserIndex] = userToFollow;
      }
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "error";
    });
  },
});

export default userSlice.reducer;
