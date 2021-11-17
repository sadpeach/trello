import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Draggable } from "react-beautiful-dnd";


const ListItem = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <>
                        <Card sx={{ minWidth: 275 }} ref={provided.innerRef}
                            snapshot={snapshot}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {item.card_name}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {item.card_name}
                                </Typography>
                                <Typography variant="body2">
                                    {item.card_description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Delete</Button>
                            </CardActions>
                        </Card>

                    </>
                );
            }}
        </Draggable>
    );
};

export default ListItem;