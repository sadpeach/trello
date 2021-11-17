import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import Typography from '@mui/material/Typography';

const DraggableElement = ({ prefix, elements }) => (
  
  <div style={{ padding: "10px", background: "green" }}>
    <Typography variant="h5" component="div">{prefix}</Typography>
    {/* This element contains your list and the drop zone that \
    will be the source when elements are dropped. */}
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <>
            <ListItem key={item.id} item={item} index={index} />
            </>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default DraggableElement;
