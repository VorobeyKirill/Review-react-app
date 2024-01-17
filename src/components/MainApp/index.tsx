import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';

// This type can be used not only in this component, so you should export it from this file,
// or create a separate types.ts file and move it there
type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}
type MainAppState = {
    todoTitle: string
};

// Class name Index is unclear, it should be MainApp
class Index extends React.Component<MainAppProps, MainAppState> {
    // It's a good practice to add props destructuring, so you'll not write this.props every time
    // Example: const { todos, addTodo, changeTodo } = this.props;

    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    // Type Todo should be used here instead of any
    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        const { todoTitle } = this.state;
        // Creating a global variable inside window object is a bad approach, you should never do it!
        // Since you're using Redux as a state manager in this app, add this variable to the Redux store
        window.allTodosIsDone = true;

        // Naming of the variable inside the map loop (t) is unclear, it's better to name it just 'todo'
        // It's better to use .every() method here, because there is an error, if we select/unselect only the last item -> 'all todos is done' checkbox will be checked/unchecked
        // Example:
        // window.allTodosIsDone = this.props.todos.every(todo => todo.isDone);
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            <div>
                {/* You provided a `checked` prop to a form field without an `onChange` handler.
                This will render a read-only field. If the field should be mutable use `defaultChecked`. */}
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {/* It's better to have a clear naming inside map() loop.
                    For example .map((todo, index) => ())
                */}
                {/* Each child (<div> here) in a list should have a unique "key" prop */}
                {this.props.todos.map((t, idx) => (
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        {/* It's not a good practice to use inline styles (unless it's not a  styling library) */}
                        {/* It's better to move all the logic of the onChange function into a separate class method (handleTodoChange), because it looks messy right now */}
                        <Form.Check
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type="checkbox" checked={t.isDone} onChange={() => {
                            const changedTodos = this.props.todos.map((t, index) => {
                                // This function inside map() can be improved
                                // Example:
                                // if (index !== idx) {
                                //     return t;
                                // }
                                //
                                // const todoItemClone = { ...t }
                                //
                                // todoItemClone.isDone = !todoItemClone.isDone;
                                //
                                // return todoItemClone

                                const res = { ...t }
                                // Avoid using == comparison operator, because it performs type conversion. It's better to use === operator
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)

                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

// Actions types can be moved to a separate file, so you'll reuse them here and in the reducer
export default connect(
    (state) => ({}),
    (dispatch) => ({
        // Type Todo should be used here instead of any
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        // Type Todo[] should be used here instead of any
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        // removeTodo is not used anywhere
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
