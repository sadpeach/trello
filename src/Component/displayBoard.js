// react material UI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// react
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

//file
import BoardForm from './boardForm';

//firebase
import { db } from '../Firebase/firebase';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function DisplayBoard({ boards }) {

    const [displayBoard, setDisplayBoard] = useState(boards);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [maxDone, setMaxDone] = useState(0);
    const [maxProgress, setMaxProgress] = useState(0);
    const [maxToDo, setMaxtodo] = useState(0);

    useEffect(() => {
        setDisplayBoard(boards);
    }, [boards]);

    const attributes = {
        open: open,
        close: handleClose,
        submit: handleSubmit,
        purpose: "Edit Board",
        selectedId: selectedId,
        selected_name: name,
        selected_description: description,
        selected_maxDone: maxDone,
        selected_maxToDo: maxToDo,
        selected_maxProgress: maxProgress
    }

    const handleOpen = (id, name, description, todo, progress, done) => {
        setOpen(true);
        setSelectedId(id);
        setName(name);
        setDescription(description);
        setMaxtodo(todo);
        setMaxProgress(progress);
        setMaxDone(done);
    }

    function handleSubmit(name, description, maxDone, maxProgress, maxToDo) {

        let temp = displayBoard;
        temp.find((obj, index) => {
            if (obj.key === selectedId) {
                temp[index] = {
                    key: selectedId,
                    name: name,
                    description: description,
                    max_done: parseInt(maxDone),
                    max_inprogress: parseInt(maxProgress),
                    max_todo: parseInt(maxToDo),
                    cards :[]
                };
                return true;
            }
        })
        setDisplayBoard(temp);
        localStorage.setItem('boards', JSON.stringify(displayBoard));
        setOpen(false);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <BoardForm {...attributes} />
            <Box sx={{ flexGrow: 1 }}>
                {console.log('current displayboard:',displayBoard)}
                <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                    {displayBoard?.map((board, index) => (
                        <>
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                {console.log('board key:', board.key)}
                                <Card key={board.key} sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {board.name}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {board.name}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            ToDo : {board.max_todo} {bull} In Progress : {board.max_inprogress} {bull} Done : {board.max_done}
                                        </Typography>
                                        <Typography variant="body2">
                                            {board.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={`/board/` + board.key} style={{ textDecoration: 'none' }}>
                                            <Button size="small">Enter</Button>
                                        </Link>
                                        <Button size="small" onClick={() => handleOpen(board.key, board.name, board.description, board.max_todo, board.max_inprogress, board.max_done)}>Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Box>



        </>
    )

}