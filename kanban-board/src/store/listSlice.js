import { createSlice } from '@reduxjs/toolkit';

const listSlice = createSlice({
  name: 'listSlice',
  initialState: {
    list:[],
     cardObj : {
      id: '0.2711152702978479',
      title: 'mmm',
      description: '',
      activity: [] // Add the activity property as an empty array
    },
    activity: [],
  },
  reducers: {
    addTodo: (state, action) => {
      if (state.list) {
        state.list.push(action.payload);
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.list = state.list.filter(todo => todo.id !== taskId);
    },
    updatedTask: (state, action) => {
      const { id, newText } = action.payload;
      const taskIndex = state.list.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.list[taskIndex].title = newText;
      }
    },  
    addCard: (state, action) => {
        const { id, title, parentId } = action.payload;
        const parentItem = state.list.find(item => item.id === parentId);
        if (parentItem) {
          if (parentItem.hasOwnProperty("children")) {
            parentItem.children.push({ id, title, description: "" });
          } else {
            parentItem.children = [{ id, title, description: "" }];
          }
        }
      },
      editTodo: (state, action) => {
        const { cardObj, updatedTodo, activity } = action.payload;
        console.log('edittodo', action.payload);
      
        // Update the title in the cardObj
        state.cardObj = { ...state.cardObj, title: updatedTodo, activity: activity };
      
        // Update the title in the list items
        state.list = state.list.map((item) => {
          if (item.id === cardObj.id) {
            return { ...item, title: updatedTodo, activity: activity };
          }
          if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: item.children.map((child) => {
                if (child.id === cardObj.id) {
                  return { ...child, title: updatedTodo, activity: activity };
                }
                return child;
              })
            };
          }
          return item;
        });
      },
      updateListItem: (state, action) => {
        const { itemId, updatedTitle } = action.payload;
        const listItem = state.list.find(item => item.id === itemId);
        if (listItem) {
          listItem.title = updatedTitle;
        }
      },
  
    deleteTodoListItem: (state, action) => {
      const { todoListId, itemId } = action.payload;
      const todoList = state.list.find(list => list.id === todoListId);
      if (todoList) {
        todoList.children = todoList.children.filter(item => item.id !== itemId);
      }
    },
    setCardObject: (state, action) => {
     const {cardInfo,ListId} = action.payload;
     console.log('setcardObj',action.payload)
        state.cardObj = action.payload
    
    },
   
    moveCard: (state, action) => {
      const { source, destination, draggableId } = action.payload;
    
      // Check if the source and destination are the same
      if (source.droppableId === destination.droppableId) {
        // Find the list where the card belongs
        const list = state.list.find((list) => list.id.toString() === source.droppableId);
    
        // Check if the list exists
        if (!list) {
          return;
        }
    
        // Reorder the cards within the same list
        const reorderedCards = Array.from(list.children);
        const [movedCard] = reorderedCards.splice(source.index, 1);
        reorderedCards.splice(destination.index, 0, movedCard);
    
        // Update the state with the reordered cards
        list.children = reorderedCards;
      } else {
        // Find the source and destination lists
        let sourceList = state.list.find((list) => list.id.toString() === source.droppableId);
        let destinationList = state.list.find((list) => list.id.toString() === destination.droppableId);
    
        // Check if the source list is undefined (empty todo list)
        if (!sourceList) {
          // Create a new source list with an empty children array
          sourceList = {
            id: source.droppableId,
            title: "", // Set the title as needed
            children: [],
          };
    
          // Add the new source list to the state
          state.list.push(sourceList);
        }
    
        // Check if the destination list is undefined
        if (!destinationList) {
          // Create a new destination list with an empty children array
          destinationList = {
            id: destination.droppableId,
            title: "", // Set the title as needed
            children: [],
          };
    
          // Add the new destination list to the state
          state.list.push(destinationList);
        }
    
        // Ensure that the children array exists in both source and destination lists
        sourceList.children = sourceList.children || [];
        destinationList.children = destinationList.children || [];
    
        // Find the card being moved within the source list
        const card = sourceList.children.find((card) => card.id.toString() === draggableId);
    
        // Check if the card exists
        if (!card) {
          return;
        }
    
        // Remove the card from the source list
        sourceList.children.splice(source.index, 1);
    
        // Insert the card into the destination list at the specified index
        destinationList.children.splice(destination.index, 0, card);
      }
   },
   moveList: (state, action) => {
    const { source, destination} = action.payload;
    console.log('moveList', action.payload);
  
    const updatedLists = Array.from(state.list);
    const [removedList] = updatedLists.splice(source.index, 1);
    updatedLists.splice(destination.index, 0, removedList);
  
    state.list = updatedLists;
  },
   
  },
  
});

export const { moveCard,addActivity,moveList,setCardObject,addTodo, addCard, updateListItem, deleteTask, deleteTodoListItem, updatedTask, editTodo } = listSlice.actions;
export default listSlice.reducer;
