import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    // user prop is used only in the console.log, but will cause rerenders, if it changes, better to remove it from the props
    user?: number,
    idx: number,
}

// It's a good practice to use props destructuring here
// Example: UserSelect({ user, idx }: UserSelectProps)
function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();

    // type Todo from the MainApp component should be used instead of any here
    // It's a good practice to move selector function separately above the component or to the separate file
    // You can simplify the function inside the useSelector: (state: StateInterface) => state.list.todos
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    React.useEffect(
        () => {
            // It's a good practice to use async/await for fetch requests(promises)
            // Also it's a good practice to use AbortController abort() method in the return statement in UseEffect to abort running requests, if the component unmounts
            console.log('userSelect');
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t, index) => {
            // This function inside map() can be improved
            // Example:
            // if (index !== idx) {
            //     return t;
            // }
            //
            // const todoItemClone = { ...t }
            //
            // todoItemClone.user = e.target.value;
            //
            // return todoItemClone
            const res = { ...t }
            // Avoid using == comparison operator, because it performs type conversion. It's better to use === operator
            if (index == idx) {
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
            {/* Each child (<options> here) in a list should have a unique "key" prop (user.id) */}
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
