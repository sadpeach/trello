
//react import
import React, { useEffect, useState } from 'react';

//material ui import
import Button from '@mui/material/Button';

//local import
import DisplayBoard from '../Component/displayBoard';
import BoardForm from '../Component/boardForm';

//firebase
import { db } from '../Firebase/firebase';

export default function Home() {
    const [open, setOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    const [loadDB, setLoadDB] = useState(true);

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

    useEffect(() => {
        const getAllBoards = [];
        const boards = db
            .collection("Board")
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    getAllBoards.push({
                        ...doc.data(),
                        key: doc.id,
                    });
                });
                setBoards(getAllBoards);
                setLoadDB(false);
            });
        return () => boards();
    }, [loadDB]);

    function handleClose() {
        setOpen(false);
    }

    function handleSubmit(name, description, maxDone, maxProgress, maxToDo) {
        db.collection("Board").add({
            name: name,
            description: description,
            max_done: parseInt(maxDone),
            max_inprogress: parseInt(maxProgress),
            max_todo: parseInt(maxToDo),
            cards: []
        });
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
