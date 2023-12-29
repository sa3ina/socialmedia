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
  bio: Object;
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
// export const deleteUsers = createAsyncThunk("news/deleteUsers", async (id) => {
//   try {
//     await axios.delete(`https://usersapi-2rke.onrender.com/users/${id}`);
//     const response = await axios.get<Users[]>(
//       "https://usersapi-2rke.onrender.com/users"
//     );
//     console.log(response.data);
//     const updatedUsers = response.data.filter((item) => item.id !== id);
//     return updatedUsers;
//   } catch (error) {
//     throw new Error("Failed to delete");
//   }
// });
export const addPost = createAsyncThunk("users/addPost", async (newItem) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const response = await axios.get("https://usersapi-2rke.onrender.com/users");
  const users = response.data;

  const userToUpdate = users.find(
    (user) => user.username === loggedInUser.username
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
// /////
// export const addNotif = createAsyncThunk("news/addNotif", async (newItem) => {
//   try {
//     const response = await axios.get(
//       `https://usersapi-2rke.onrender.com/users/`
//     );
//     for (const user of response.data) {
//       await axios.patch(`https://usersapi-2rke.onrender.com/users/${user.id}`, {
//         notifications: [...user.notifications, newItem],
//       });
//     }
//     console.log("newItem:", newItem);
//     return response.data;
//   } catch (error) {
//     throw new Error("Failed");
//   }
// });
// /////
// export const deletePost = createAsyncThunk(
//   "user/deletePost",
//   async ({ userId, postId }) => {
//     try {
//       const response = await axios.get(
//         `https://usersapi-2rke.onrender.com/users/${userId}`
//       );
//       const userData = response.data;
//       const updatedPosts = userData.posts.filter(
//         (post) => post.postId !== postId
//       );

//       await axios.patch(`https://usersapi-2rke.onrender.com/users/${userId}`, {
//         posts: updatedPosts,
//       });

//       return { userId, postId };
//     } catch (error) {
//       throw error;
//     }
//   }
// );
export const followUser = createAsyncThunk(
  "users/followUser",
  async (userId, { getState }) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      // const loggedInUserId = users.find(
      //   (user) => user.username === loggedInUser.username
      // )?.id;

      const response = await axios.get(
        "https://usersapi-2rke.onrender.com/users"
      );
      const users = response.data;

      const userToUpdate = users.find(
        (user) => user.username === loggedInUser.username
      );
      if (userToUpdate) {
        const updatedFollowing = [...userToUpdate.following, userId];

        await axios.patch(
          `https://usersapi-2rke.onrender.com/users/${userToUpdate.id}`,
          {
            following: updatedFollowing,
          }
        );

        return { ...userToUpdate, following: updatedFollowing };
      } else {
        throw new Error("User to follow not found");
      }
    } catch (error) {
      throw new Error("Failed to follow user");
    }
  }
);
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(addNotif.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.users.push(action.payload);
    // });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUserIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (updatedUserIndex !== -1) {
        state.users[updatedUserIndex] = action.payload;
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
    // builder.addCase(deleteUsers.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(deleteUsers.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.users = action.payload;
    // });
    // builder.addCase(deleteUsers.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload || "error";
    // });
    // builder.addCase(addUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.users.push(action.payload);
    // });

    // builder
    //   .addCase(deletePost.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deletePost.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = null;

    //     state.users = state.users.map((user) => {
    //       if (user.id === action.payload.userId) {
    //         return {
    //           ...user,
    //           posts: user.posts.filter(
    //             (post) => post.postId !== action.payload.postId
    //           ),
    //         };
    //       }
    //       return user;
    //     });
    //   })
    //   .addCase(deletePost.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });
  },
});

export default userSlice.reducer;
