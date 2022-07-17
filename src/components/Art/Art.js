import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Art = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)


    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/login" ;
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight *2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext('2d')
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = 5
        contextRef.current = context;
    },[])

    const token = localStorage.getItem('token');
    if(!token){
        return navigate(from, {replace: true})
    }
    
    

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }
    const finishDrawing = () => {
        contextRef.current.closePath();

        setIsDrawing(false);
    }
    const draw = ({nativeEvent}) => {
        if(!isDrawing){
            return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }



    return (
        <div className='p-8 bg-primary'>
            <div className='bg-base-200'>
               <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
                />
            </div>
        </div>
    );
};

export default Art;