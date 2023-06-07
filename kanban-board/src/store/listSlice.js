import { createSlice } from '@reduxjs/toolkit'
const listSlice = createSlice({
    name: 'listSlice',
    initialState: {
        list: []
    },
    reducers: {
        addTodo: (state, action) => {
            if (state.list) {
                state.list.push(action.payload)

                console.log('action called', action)
            }
        },
        deleteTask: (state, action) => {
            console.log('delete', action.payload)
            const taskId = action.payload;
            state.list = state.list.filter(todo => todo.id !== taskId);
        },
        updatedTask: (state, action) => {
            console.log('editcalled', action.payload)
            const { id, newText } = action.payload;
            const taskIndex = state.list.find(task => task.id === id);
            if (taskIndex !== -1) {
                taskIndex.title = newText;
            }

        },
        addCard: (state, action) => {
            console.log('ac', action)
            state.list.forEach((item) => {
                if (item.id === action.payload.parentId) {
                    if (Object.hasOwn(item, "children")) {
                        item.children.push(action.payload)
                    } else {
                        item.children = [];
                        item.children.push(action.payload)
                    }
                }
            })
        },
        editTodo: (state, action) => {
            console.log('item edit from slice',action.payload)
        //     const { id, updatedTodo } = action.payload;
        //     const todoIndex = state.list.find((todo) => todo.id === id);
        //     console.log('todoindex',todoIndex)
        //      if(todoIndex){
        //        todoIndex.children = updatedTodo
        // }
    },
        deleteTodoListItem: (state, action) => {
            const { todoListId, itemId } = action.payload;
            const todoList = state.list.find(list => list.id === todoListId);
            if (todoList) {
                todoList.children = todoList.children.filter(item => item.id !== itemId);
            }
        },
    },
   
});
export const { addTodo, addCard, deleteTask, deleteTodoListItem, updatedTask,editTodo } = listSlice.actions;
export default listSlice.reducer;