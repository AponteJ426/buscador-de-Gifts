import React from "react";

import 'animate.css';

const RenderImg = ({ props }) => {
    return (
        <div className="card animate__animated animate__bounceIn">
            <img src={props.url} alt={props.title} />
        </div>
    );
};

export default RenderImg;
