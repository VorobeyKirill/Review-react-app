import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    onSubmit: (todo: any) => void,

}
type InputNewTodoState = {
    value: string
}

export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    // It's a good practice to add props destructuring, so you'll not write this.props every time
    // Example: const { todoTitle, onChange, onSubmit } = this.props;

    // prevState and snapshot are not used inside this lifecycle method, you can remove them
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            // It would be good to have constructor() method, where you'll initialize this.state with initial value
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    handleKeyDown = (event: React.KeyboardEvent) => {
        // event.keyCode is deprecated, you should change it to: event.key === 'Enter'
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();
        // It's better to use const/let variables, var is outdated
        // Variables should have more clear(useful) names, for example: trimmedInputValue
        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
