// Creating a global variable inside window object is a bad approach, you should never do it!
// Since you're using Redux as a state manager in this app, add this variable to the Redux store
declare global {
    interface Window {
        allTodosIsDone: boolean;
    }
}

export {}
