import { useParams } from "react-router-dom";
import React from 'react';

//document import
import DragList from "../Component/DragList";

export default function KanBan() {

    const { boardid } = useParams();

    const allboards = JSON.parse(localStorage.getItem('boards'));
    const selectedBoard = allboards.find(obj => obj.key === parseInt(boardid));
    localStorage.setItem('selectedBoard', JSON.stringify(selectedBoard));

    return (
        <>
            <DragList selectedBoard={selectedBoard} />
        </>
    )
}