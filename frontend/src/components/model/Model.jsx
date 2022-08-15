import React from "react";
import "./Model.css";
import ModelContent from "./ModelContent";

function Model({ setOpenModal }) {
    return (
        <div>
            <ModelContent setOpenModal={setOpenModal} />
        </div>
    );
}

export default Model;