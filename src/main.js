import React, {useState} from "react";
import "./index.css";
const _ = require('lodash');

export default function Main(){
    const [Xn, setXn] = useState(NaN)
    const [Xk, setXk] = useState(NaN)
    const [Xh, setXh] = useState(NaN)
    const [Yn, setYn] = useState(NaN)
    const [Yk, setYk] = useState(NaN)
    const [Yh, setYh] = useState(NaN)
    const [R, setR] = useState(NaN)
    const [result, setResult] = useState([])
    const [invalid, setInvalid] = useState('')

    function printRes(){
        const res = []
        setInvalid('')
        if (isNaN(Xn) || isNaN(Xk) || isNaN(Xh) || isNaN(Yn) || isNaN(Yk) || isNaN(Yh) || isNaN(R)){
            setInvalid(<h1>invalid data</h1>)
            return 
        }

        const arrX = _.range(Xn, Xk+1, Xh)
        const arrY = _.range(Yn, Yk+1, Yh)
        let key = 0

        for(let i = 0; i < arrX.length; i++){
            for(let j = 0; j < arrY.length; j++){
                if(isInArea(arrX[i], arrY[j], R)){
                    res.push(<li className="main__list__item_true" key={key}>X = {arrX[i]}; Y = {arrY[j]}</li>)
                }else{
                    res.push(<li className="main__list__item_false" key={key}>X = {arrX[i]}; Y = {arrY[j]}</li>)
                }
                key++
            }
        }
        setResult(res)
    }

    function isInArea(x, y, r){
        
        r = Math.abs(r)

        if (x <= 0 && y >= 0){
            return (Math.abs(x) <= r && y <= r)    
        }
        else if (x >= 0 && y >= 0){
            return (x*x+y*y <= r*r)    
        }
        else if (x >= 0 && y <= 0){
            return (x+y <= r/2)  
        }
        else return false
    }

    return (
        <div className="main">
            <h1 className="main__headline">Завдання на лабораторну роботу</h1>
            <p className="main__task">
                Необхідно написати проект на фремворку Angular, який
                визначає потрапляння крапки на координатній площині в задану область чи ні
                відповідно до варіанту завдань, і вміщує HTML-сторінку, яка формує дані для
                відправки їх на обробку.
            </p>
            <h1 className="main__title">Значення X</h1>
            <div className="main__input_div">Xn = <input className="main__input" onBlur={(e)=>setXn(parseInt(e.target.value.trim()))}/></div>
            <div className="main__input_div">Xk = <input className="main__input" onBlur={(e)=>setXk(parseInt(e.target.value.trim()))}/></div>
            <div className="main__input_div">Xh = <input className="main__input" onBlur={(e)=>setXh(parseInt(e.target.value.trim()))}/></div>
            <h1 className="main__title">Значення Y</h1>
            <div className="main__input_div">Yn = <input className="main__input" onBlur={(e)=>setYn(parseInt(e.target.value.trim()))}/></div>
            <div className="main__input_div">Yk = <input className="main__input" onBlur={(e)=>setYk(parseInt(e.target.value.trim()))}/></div>
            <div className="main__input_div">Yh = <input className="main__input" onBlur={(e)=>setYh(parseInt(e.target.value.trim()))}/></div>
            <h1 className="main__title">Значення R</h1>
            <div className="main__input_div">R = <input className="main__input" onBlur={(e)=>setR(parseInt(e.target.value.trim()))}/></div>
            <button onClick={printRes} className="main__button">Розрахунок</button>
            <ul className="main__list">
                {result}
            </ul>
            {invalid}
        </div>
    )
}