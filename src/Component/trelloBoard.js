import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


export default function TrelloBoard({ boards }) {

    const [displayBoard, setDisplayBoard] = useState([]);

    useEffect(() => {
        setDisplayBoard(boards);
    }, [boards]);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                    {console.log('boards:', displayBoard)}
                    {displayBoard.map((board, index) => {
                        return <Grid item xs={2} sm={4} md={4} key={index}>
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
                                    <Button size="small">Enter</Button>
                                    <Button size="small">Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>;
                    })}
                </Grid>
            </Box>



        </>
    )

}