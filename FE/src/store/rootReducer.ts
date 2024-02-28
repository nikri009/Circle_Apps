import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThreadByIdSlice, } from "./slice";
import ThreadSlice from "./slice/ThreadSlice";
import UserSlice from "./slice/UserSlice";


// export const { STATE_THREAD,  } = ThreadSlice.actions
export const { STATE_THREAD_BY_ID } = ThreadByIdSlice.actions


export const threadByIdReducer = ThreadByIdSlice.reducer

export const rootReducer = combineReducers({
    threadById: threadByIdReducer,
    thread: ThreadSlice,
    user: UserSlice
})

export const store = configureStore({
    reducer: rootReducer
 })
  
