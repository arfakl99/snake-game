import { useState } from "react";
import React from "react";
import "../../src/index.css";

const Grid = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [foodposition, setFoodposition] = useState({ x: 10, y: 10 });

  const handelupdate = (e) => {
    console.log(e.key);

    if (e.key === "ArrowRight") {
        setPosition({ x: position.x + 10, y: position.y });
       
      }
      if (e.key === "ArrowLeft") {
        setPosition({ x: position.x - 10, y: position.y });
        
      }
      if (e.key === "ArrowUp") {
        setPosition({ x: position.x, y: position.y - 10 });
        
      }
      if (e.key === "ArrowDown") {
        setPosition({ x: position.x, y: position.y + 10 });
        
      }
      if (e.key === "Escape") {
        setPosition({ x: 0, y: 0 });
      }
    

    if (e.key === " ") {
      alert("Game Over");
      setPosition({ x: 0, y: 0 });
    }
    if (position.x == foodposition.x && position.y == foodposition.y) {
        setFoodposition({ x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) });
        }

    if(position.x>100 || position.y>100){
        
        setPosition({ x: position.x-100, y: position.y - 10 });
    }
    if(position.x<0 || position.y<0){
        setPosition({ x: 100, y: 100 });
    }


    // setInterval(() => {
    //     if(e.key === "ArrowRight"){
    //         setPosition({ x: position.x + 10, y: position.y });
    //         clearInterval(
    //             setPosition({ x: position.x + 10, y: position.y })
    //         );
           


    //     }
    //     if (e.key === "ArrowRight") {
    //         setPosition({ x: position.x + 10, y: position.y });
    //         clearInterval();
    //       }
    //       if (e.key === "ArrowLeft") {
    //         setPosition({ x: position.x - 10, y: position.y });
    //         clearInterval(

    //         );
    //       }
    //       if (e.key === "ArrowUp") {
    //         setPosition({ x: position.x, y: position.y - 10 });
    //         clearInterval();
    //       }
    //       if (e.key === "ArrowDown") {
    //         setPosition({ x: position.x, y: position.y + 10 });
    //         clearInterval();
    //       }
    //       if (e.key === "Escape") {
    //         setPosition({ x: 0, y: 0 });
    //       }
        
    // }, 1000);

    };


  const positionupdate = (e) => {
    setPosition({ x: position.x + 10, y: position.y + 10 });
  };

  return (
    <>
     
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div> Snake Game</div>

        <input
          style={{
            width: "10%",
            height: "10%",
            border: "1px solid black",
          }}
          onKeyDown={(e) => {
            handelupdate(e);
          }}
          autoFocus
        />

        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            border: "1px solid black",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              width: "8px",
              height: "8px",
              backgroundColor: "red",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              top: foodposition.y,
              left: setFoodposition.x,
              width: "8px",
              height: "8px",
              backgroundColor: "red",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Grid;
