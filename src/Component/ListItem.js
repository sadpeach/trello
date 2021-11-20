import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Draggable } from "react-beautiful-dnd";


function ContentCard ({provided,snapshot,item}){
    
    function  onClickDelete (key) {
        console.log('deleting:',key);

        let temp = JSON.parse(localStorage.getItem("selectedBoard"));
        let res = temp.cards.filter(item => item.key != key);
        temp.cards = res
        localStorage.setItem("selectedBoard",JSON.stringify(temp));

        let boards = JSON.parse(localStorage.getItem('boards'));
        boards.find((object, index) => {
            if (object.key === temp.key) {
                object.cards = temp.cards;
                return true; 
            }
        });
        localStorage.setItem("boards",JSON.stringify(boards));
    }

    return (
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
                                <Button size="small" onClick={()=>onClickDelete(item.key)}>Delete</Button>
                            </CardActions>
                        </Card>
    )
}

const ListItem = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id.toString()} index={index}>
            {(provided, snapshot) => {
                return (
                    <>
                        <ContentCard provided={provided} snapshot={snapshot} item={item}/>

                    </>
                );
            }}
        </Draggable>
    );
};

export default ListItem;