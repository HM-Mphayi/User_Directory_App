import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  copyUsers: [],
  darkMode: false,
};

export const userSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    AddUsers: (state, action) => {
      state.users = action.payload;
      state.copyUsers = action.payload;
    },

    FilterUsers: (state, action) => {
      //Update the state if the user deletes characters
      if (state.users.length === 0) {
        state.users = state.copyUsers;
      }

      if (action.payload) {
        const filtered = [...state.users].filter((user) => {
          if (
            user.name.first
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            user.name.last.toLowerCase().includes(action.payload.toLowerCase())
          ) {
            return user;
          }
        });

        state.users = filtered;
      } else {
        state.users = state.copyUsers;
      }
    },

    ChangeTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// Actions
export const { AddUsers, FilterUsers, ChangeTheme } = userSlice.actions;

// Reducer
export default userSlice.reducer;
