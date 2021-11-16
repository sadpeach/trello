
//react import
import React, { useEffect, useState } from 'react';

//material ui import
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


export default function BoardForm(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [maxDone, setMaxDone] = useState(0);
    const [maxProgress, setMaxProgress] = useState(0);
    const [maxToDo, setMaxtodo] = useState(0);

    useEffect(() => {

        setName(props.selected_name);
        setDescription(props.selected_description);
        setMaxDone(props.selected_maxDone);
        setMaxtodo(props.selected_maxToDo);
        setMaxProgress(props.selected_maxProgress);

    }, [props.selected_name, props.selected_description, props.selected_maxDone, props.selected_maxToDo, props.selected_maxProgress])

    function getInput() {
        props.submit(name, description, maxDone, maxProgress, maxToDo, props.selectedId);
        setName('');
        setDescription('');
        setMaxDone(0);
        setMaxProgress(0);
        setMaxtodo(0);
    }

    return (
        <>
            <Dialog open={props.open} onClose={props.close}>
                <DialogTitle>{props.purpose}</DialogTitle>
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
                    <Button onClick={props.close}>Cancel</Button>
                    <Button onClick={getInput}>Create</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}