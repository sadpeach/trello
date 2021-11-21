
//react import
import React, { useState } from 'react';

//material ui import
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function CardForm({ prefix, newBoard }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCreate = () => {
        const newCard = {
            key: Math.floor((Math.random() * 1000) + 1),
            card_name: name,
            card_description: description,
            card_column: prefix
        }
        let temp = JSON.parse(localStorage.getItem("selectedBoard"));
        temp.cards.push(newCard);
        localStorage.setItem("selectedBoard", JSON.stringify(temp));
        let boards = JSON.parse(localStorage.getItem('boards'));
        boards.find((object, index) => {
            if (object.key === temp.key) {
                object.cards = temp.cards;
                return true;
            }
            return false;
        });
        localStorage.setItem("boards", JSON.stringify(boards));
        setName("");
        setDescription("");
        newBoard(temp);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen} variant="contained">
                Create New Card
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Card</DialogTitle>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}