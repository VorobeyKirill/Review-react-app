import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {
                    // Reducer should be a pure function, you should always return a new state object, not modify the current one
                    // How to fix:
                    // return {
                    //     ...state,
                    //     todos: [...state.todos. action.payload]
                    // }

                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
