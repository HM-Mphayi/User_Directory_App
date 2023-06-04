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
      //Update the state when the user deletes characters when searching
      if (state.users.length === 0) {
        state.users = state.copyUsers;
      }

      if (action.payload) {
        //Filter by name or last name
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
   //Toggle theme mode
    ChangeTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// Actions
export const { AddUsers, FilterUsers, ChangeTheme } = userSlice.actions;

// Reducer
export default userSlice.reducer;
