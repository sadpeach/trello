//import react
import React, { useEffect, useState } from "react";

// import dnd
import { DragDropContext } from "react-beautiful-dnd";

//import file
import DraggableElement from "./DraggableElements";

//import material ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Snackbar } from "@mui/material";
import Button from '@mui/material/Button';

const lists = ["todo", "inProgress", "done"];

const removeFromList = (list, index) => {
  const result = { ...list };
  const [removed] = result.cards.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = { ...list };
  result.cards.splice(index, 0, element);
  return result;
};

const generateLists = (cards, done, progress, todo) => {
  console.log('the cards are:',cards)
  let sortedArr = { done: { max: done, cards: [] }, todo: { max: todo, cards: [] }, inProgress: { max: progress, cards: [] } };
  for (let k in cards) {
    cards[k].id = cards[k].key
    switch (cards[k].card_column) {
      case "done":
        sortedArr.done.cards.push(cards[k])
        break;
      case "inProgress":
        sortedArr.inProgress.cards.push(cards[k])
        break;
      case "todo":
        sortedArr.todo.cards.push(cards[k])
        break;
      default:
        console.log('error');
        break;
    }
  }
  return sortedArr
}

export default function DragList({ boardid }) {

  let allboards = JSON.parse(localStorage.getItem('boards'));
  const selectedBoard = allboards.find(obj => obj.key === parseInt(boardid));
  const [elements, setElements] = useState(generateLists());
  const [cards, setCards] = useState([]);
  const [maxDone, setMaxDone] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [maxTodo, setToDo] = useState(0);


  useEffect(() => {
    
    setCards(selectedBoard.cards);
    setMaxDone(selectedBoard.max_done);
    setMaxProgress(selectedBoard.max_inprogress);
    setToDo(selectedBoard.max_todo);

    localStorage.setItem('selectedBoard',JSON.stringify(selectedBoard));
  }, [maxDone,maxProgress,maxTodo]);

  useEffect(() => {
    setElements(generateLists(cards, maxDone, maxProgress, maxTodo));
  }, [cards, maxDone, maxProgress, maxTodo]);

  const onDragEnd = (result) => {
    // manipulate the list ordering
    const { destination, source } = result;

    if (!destination || (source.droppableId !== destination.droppableId && elements[destination.droppableId].max <= elements[destination.droppableId].cards.length)) {
      console.log('max reached');
      return (
        <>
          <Snackbar message="You hav reached the max" />
        </>
      )

    }
    const listCopy = { ...elements }; //all columns

    const sourceList = listCopy[source.droppableId];//change the ordering of list

    //remove the selected card from the list adn return a new sourcelist
    const [removedElement, newSourceList] = removeFromList(sourceList, source.index);

    listCopy[source.droppableId] = newSourceList; //selected the source column to drop to
    const destinationList = listCopy[destination.droppableId];//the destination of the column

    //put the removed card back into the detination
    listCopy[destination.droppableId] = addToList(
      destinationList,
      destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((listKey, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              {/* make this area droppable */}
              <DraggableElement
                // list and item
                elements={elements[listKey].cards}
                key={listKey}
                prefix={listKey}
              />

            </Grid>
          ))}
        </DragDropContext>
      </Grid>
    </Box>


  );
}





