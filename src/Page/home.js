
//react import
import React, { useEffect, useState } from 'react';

//material ui import
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//local import
import TrelloBoard from '../Component/trelloBoard';

//firebase
import { db } from '../Firebase/firebase';

export default function Home() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [maxDone, setMaxDone] = useState(0);
    const [maxProgress, setMaxProgress] = useState(0);
    const [maxToDo, setMaxtodo] = useState(0);
    const [boards, setBoards] = useState([]);
    const [loadDB,setLoadDB] = useState(true);

    const handleOpen = () => setOpen(true);

    useEffect(() => {
        const getAllBoards = [];
        const boards = db
            .collection("Board")
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    getAllBoards.push({
                        ...doc.data(), //spread operator
                        key: doc.id, // `id` given to us by Firebase
                    });
                });
                setBoards(getAllBoards);
                setLoadDB(false);
            });
        return () => boards();
    }, [loadDB]);

    function handleClose() {
        setOpen(false);
        setName('');
        setDescription('');
    }

    function handleSubmit() {
        db.collection("Board").add({
            name: name,
            description: description,
            max_done: parseInt(maxDone),
            max_inprogress: parseInt(maxProgress),
            max_todo: parseInt(maxToDo),
            cards:[]
        });
        setOpen(false);
        setName('');
        setDescription('');
        setMaxDone(0);
        setMaxProgress(0);
        setMaxtodo(0);
        setLoadDB(false);
    }

    return (
        <>
            <Button onClick={handleOpen} variant="contained">
                Create New Board
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Board</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onInput={e => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={description}
                        onInput={e => setDescription(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="maxprogress"
                        label="Max Progress"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={maxProgress}
                        onInput={e => setMaxProgress(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Max Done"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={maxDone}
                        onInput={e => setMaxDone(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Max To-Do"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={maxToDo}
                        onInput={e => setMaxtodo(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>

            <br />
            <TrelloBoard boards={boards}/>

        </>
    )
}
