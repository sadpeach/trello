//import react
import React, { useEffect, useState } from "react";

// import dnd
import { DragDropContext } from "react-beautiful-dnd";

//import file
import DraggableElement from "./DraggableElements";
import CustomizedSnackbars from "./snackBar";

//import material ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const lists = ["todo", "inProgress", "done"];

const removeFromList = (list, index) => {
  const result = { ...list };
  const [removed] = result.cards.splice(index, 1);
  return [removed, result];
};

const generateLists = (cards, done, progress, todo) => {
  let sortedArr = { done: { max: done, cards: [] }, todo: { max: todo, cards: [] }, inProgress: { max: progress, cards: [] } };
  for (let k in cards) {
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

export default function DragList({ selectedBoard }) {
  const [elements, setElements] = useState(generateLists());
  const [cards, setCards] = useState(selectedBoard.cards);
  const [maxDone] = useState(selectedBoard.max_done);
  const [maxProgress] = useState(selectedBoard.max_inprogress);
  const [maxTodo] = useState(selectedBoard.max_todo);
  const [isMax, setIsMax] = useState(0);

  function ListenNewBoard(newboard) {
    setCards(newboard.cards);
  }

  const addToList = (list, index, element, destination) => {

    cards.find((object, index) => {
      if (object.key === element.key) {
        object.card_column = destination;
        return true;
      }
      return false;
    });

    const result = { ...list };
    result.cards.splice(index, 0, element);
    return result;
  };

  useEffect(() => {
    setElements(generateLists(cards, maxDone, maxProgress, maxTodo));

  }, [cards, maxDone, maxProgress, maxTodo]);

  useEffect(() => {
    selectedBoard.cards = cards;
    localStorage.setItem('selectedBoard', JSON.stringify(selectedBoard));
    const allboards = JSON.parse(localStorage.getItem('boards'));
    allboards.find((object, index) => {
      if (object.key === selectedBoard.key) {
        console.log('match key');
        object.cards = selectedBoard.cards;
        return true;
      }
      return false;
    });
    localStorage.setItem('boards', JSON.stringify(allboards));
  });

  const onDragEnd = (result) => {
    // manipulate the list ordering
    const { destination, source } = result;

    if (!destination || (source.droppableId !== destination.droppableId && elements[destination.droppableId].max <= elements[destination.droppableId].cards.length)) {
      setIsMax(1);
      return true;
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
      removedElement,
      destination.droppableId
    );

    setElements(listCopy);
    setIsMax(0);
  };

  function handleDelete(newboard) {
    setCards(newboard.cards);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {lists.map((listKey, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                {/* make this area droppable */}
                <DraggableElement
                  // list and item
                  handleDelete={handleDelete}
                  newBoard={ListenNewBoard}
                  elements={elements[listKey].cards}
                  key={listKey}
                  prefix={listKey}
                />

              </Grid>
            ))}
          </DragDropContext>
        </Grid>
      </Box>
      {isMax ? <CustomizedSnackbars msg={"Exceed max cards set for the column"} /> : null}

    </>


  );
}





