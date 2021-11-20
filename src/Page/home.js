
//react import
import React, { useEffect, useState } from 'react';

//material ui import
import Button from '@mui/material/Button';

//local import
import DisplayBoard from '../Component/displayBoard';
import BoardForm from '../Component/boardForm';

//firebase
export default function Home() {

    const [open, setOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    
    useEffect(() => {
        localStorage.setItem("boards", JSON.stringify(boards));
        localStorage.setItem("selectedBoard", JSON.stringify({}));
    }, [boards]);

    const attributes = {
        open: open,
        close: handleClose,
        submit: handleSubmit,
        purpose: "Create New Board",
        selectedId: null,
        selected_name: "",
        selected_description: "",
        selected_maxDone: 0,
        selected_maxToDo: 0,
        selected_maxProgress: 0
    }

    const handleOpen = () => setOpen(true);

    function handleClose() {
        setOpen(false);
    }

    function handleSubmit(name, description, maxDone, maxProgress, maxToDo) {
        const newboard = {
            key: Math.floor((Math.random() * 1000) + 1),
            name: name,
            description: description,
            max_done: parseInt(maxDone),
            max_inprogress: parseInt(maxProgress),
            max_todo: parseInt(maxToDo),
            cards:[]
        }
        setBoards(oldBoard => [...oldBoard, newboard]);
        setOpen(false); 
    }

    return (
        <>
            <Button onClick={handleOpen} variant="contained">
                Create New Board
            </Button>

            <BoardForm {...attributes} />

            <br />
            <DisplayBoard boards={boards} />

        </>
    )
}
