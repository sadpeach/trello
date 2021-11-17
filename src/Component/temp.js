//import react
import React, { useEffect, useState } from "react";

// import dnd
import { DragDropContext } from "react-beautiful-dnd";

//import file
import DraggableElement from "./DraggableElements";

//import firebase
import { db } from '../Firebase/firebase';

//import material ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const lists = ["todo", "inProgress", "done"];

const removeFromList = (list, index) => {
  const result = Array.from(list);//make a copy of list
  //destructing array, this will get the first element
  //@ position index remove one element
  //[removed] contains the removed
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const generateLists = (cards,done,progress,todo) => {
  let sortedArr = { done: [], todo: [], inProgress: [] };
  for (let k in cards) {
    cards[k].id = cards[k].key
    switch (cards[k].card_column) {
      case 1:
        sortedArr.done.push(cards[k])
        break;

      case 2:
        sortedArr.inProgress.push(cards[k])
        break;

      case 3:
        sortedArr.todo.push(cards[k])
        break;
    }
  }
  return sortedArr
}

export default function DragList({ boardid }) {

  const [elements, setElements] = useState(generateLists());
  const [cards, setCards] = useState([]);
  const [loadDB, setLoadDB] = useState(true);
  const [maxDone, setMaxDone] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [maxTodo, setToDo] = useState(0);

  useEffect(() => {
    const getAllCards = [];
    
    db
      .collection("Board")
      .doc(boardid)
      .collection('cards')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getAllCards.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setCards(getAllCards);
        setLoadDB(false);
      });

    db
      .collection("Board")
      .doc(boardid)
      .onSnapshot(docSnapshot => {
        setMaxDone(docSnapshot.get('max_done'));
        setMaxProgress(docSnapshot.get('max_inprogress'));
        setToDo(docSnapshot.get('max_todo'));
      })

  }, [loadDB]);

  useEffect(() => {
    console.log('max done:',maxDone)
    setElements(generateLists(cards,maxDone,maxProgress,maxTodo));
  }, [cards]);

  const onDragEnd = (result) => {
    console.log('drag end elements:', elements)
    // manipulate the list ordering
    const { destination, source } = result;
    console.log('destination:', destination.droppableId);

    if (!destination) {
      return;
    }
    const listCopy = { ...elements }; //all columns

    const sourceList = listCopy[source.droppableId];//change the ordering of list

    //remove the selected card from the list adn return a new sourcelist
    const [removedElement, newSourceList] = removeFromList(sourceList, source.index);

    listCopy[source.droppableId] = newSourceList; //selected the source column to drop to
    console.log('selecting the card form:', source.droppableId);
    console.log('droping the selected card to:', destination.droppableId);
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
      {console.log('elements:', elements)}
      {console.log('max done:', maxDone)}
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((listKey, index) => (

            <Grid item xs={2} sm={4} md={4} key={index}>
              {/* make this area droppable */}
              <DraggableElement
                // list and item
                elements={elements[listKey]}
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

