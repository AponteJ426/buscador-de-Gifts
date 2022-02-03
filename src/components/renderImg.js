import React from "react";

const RenderImg = ({ props }) => {
    return (
        <div className="card">
            <img src={props.url} alt={props.title} />
        </div>
    );
};

export default RenderImg;
