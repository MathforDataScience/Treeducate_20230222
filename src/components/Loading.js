import React from "react";
import { DotWave } from "@uiball/loaders";



const Loading = () => {
    return (
        <div className="h-96 w-full flex items-center justify-center">
            <DotWave size={47} speed={1} color="black"/>
        </div>
    );
}

export default Loading;