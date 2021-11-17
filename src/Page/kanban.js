import { useParams } from "react-router-dom";
import React, {useState } from 'react';

//document import
import DragList from "../Component/DragList";
import CardForm from "../Component/cardForm";

export default function KanBan() {

    const { boardid } = useParams();

    return (
        <>
        <CardForm boardid = {boardid}/>

        <DragList boardid = {boardid}/>
        </>
    )
}