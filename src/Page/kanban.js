import {useParams} from "react-router-dom";

export default function KanBan(){
    const { boardid } = useParams();
    console.log('board id:',boardid);

    return (
        
    <>
    </>
    )
}