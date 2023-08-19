import { useEffect, useState } from "react";
import React from "react";
import "../../src/index.css";
import { AiFillApple } from "react-icons/ai";
import { FaBeer } from "react-icons/fa";

import bgimg from "../assets/images/snake.jpg";
import snake from "../assets/images/snake2.jpg";
import Node from "postcss/lib/node";

const Grid = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [foodposition, setFoodposition] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState("right");
  const [score, setScore] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  // const [secondposition, setSecondposition] = useState({ x: 0, y: 0 });
  // const [thirdposition, setThirdposition] = useState({ x: 0, y: 0 });
  // const [fourthposition, setFourthposition] = useState({ x: 0, y: 0 });
  const initialSnakePosition = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  const updateFoodAndScore = () => {};

  const [snakeposition, setSnakeposition] = useState(initialSnakePosition);

  let interval = null;
  useEffect(() => {
    setSnakeposition((prevSnakeposition) => {
      let newSnakeposition = [...prevSnakeposition];
      newSnakeposition[0] = position;
      for (let i = 1; i < newSnakeposition.length; i++) {
        newSnakeposition[i] = prevSnakeposition[i - 1];
      }
      return newSnakeposition;
    });
  }, [position]);

  // useEffect(() => {
  //   if (snakeposition[0].x === snakeposition[1].x && snakeposition[0].y === snakeposition[1].y) {
  //     clearInterval(interval);
  //     alert("Game Over");
  //   }
  // }, [snakeposition]);

  useEffect(() => {
    if (position.x === foodposition.x && position.y === foodposition.y) {
      setFoodposition({
        x: Math.floor(Math.floor(Math.random() * 520) / 10) * 10,
        y: Math.floor(Math.floor(Math.random() * 420) / 10) * 10,
      });
      setScore(score + 1);
      debugger;
      setSnakeposition((prevSnakeposition) => {
        const newSnakeposition = [...prevSnakeposition];
        newSnakeposition.push({
          x: foodposition.x,
          y: foodposition.y,
        });
        console.log("foodposition", foodposition);
        console.log("newSnakeposition", newSnakeposition);
        return newSnakeposition;
      });
    }
  }, [position, foodposition]);

  // useEffect(() => {
  //   if (score > 0) {
  //     setIsBlinking(true);
  //     setTimeout(() => {
  //       setIsBlinking(false);
  //     }, 1000);
  //   }
  // }, [score]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    interval = setInterval(() => {
      if (direction === "right") {
        setPosition((prevPosition) => {
          let newX = prevPosition.x + 10;
          let newY = prevPosition.y;
          if (newX > 520) newX = 0;
          // if (newY > 520) newY = 0;
          return { x: newX, y: newY };
        });
      }
      if (direction === "left") {
        setPosition((prevPosition) => {
          let newX = prevPosition.x - 10;
          let newY = prevPosition.y;
          if (newX < 0) newX = 520;
          // if (newY < 0) newY = 520;
          return { x: newX, y: newY };
        });
      }
      if (direction === "up") {
        // e.key === "ArrowUp" || e.key === "ArrowDown"
        //   ? e.preventDefault()
        //   : null;

        setPosition((prevPosition) => {
          let newX = prevPosition.x;
          let newY = prevPosition.y - 10;
          // if (newX < 0) newX = 520;
          if (newY < 0) newY = 420;
          return { x: newX, y: newY };
        });
      }
      if (direction === "down") {
        setPosition((prevPosition) => {
          let newX = prevPosition.x;
          let newY = prevPosition.y + 10;
          // if (newX < 0) newX = 520;
          if (newY > 420) newY = newY - 420;
          return { x: newX, y: newY };
        });
        if (position.x === snakeposition.x && position.y === snakeposition.y) {
          clearInterval(interval);
          alert("Game Over");
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [direction, position]);

  // useEffect(() => console.log("foodposition", foodposition), [foodposition]);

  const handelupdate = (e) => {
    clearInterval(interval);
    console.log(e.key);
    if (e.key === "ArrowRight") {
      setDirection("right");
    }
    if (e.key === "ArrowLeft") {
      setDirection("left");
    }
    if (e.key === "ArrowUp") {
      setDirection("up");
    }
    if (e.key === "ArrowDown") {
      setDirection("down");
    }
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
          //   backgroundImage: "url('bgimg')",
          backgroundImage: `url(${bgimg})`,

          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div> Snake Game</div>
        <div> Score : {score}</div>
        <div>
          Food Position : {foodposition.x} , {foodposition.y}
        </div>
        <div>
          Snake Position : {position.x} , {position.y}
        </div>

        <input
          style={{
            width: "10%",
            height: "10%",
            // border: "1px solid transparent",
            backgroundColor: "transparent",
          }}
          onKeyDown={(e) => {
            handelupdate(e);
          }}
          autoFocus
        />

        <div
          style={{
            position: "relative",
            width: "38vw",
            height: "60vh",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "30%",
          }}
        >
          {/* {
    snakeposition.map((snakeposition, index) => {
      return (
        <div
          key={index}
          style={{
            position: "absolute",
            top: snakeposition.y,
            left: snakeposition.x,
            width: "8px",
            height: "8px",
            backgroundColor: "black",
          }}
        ></div>
      );
    })
    
  } */}

          {snakeposition.map((item) => (
            <div
              style={{
                position: "absolute",
                top: item.y,
                left: item.x,
                width: "8px",
                height: "8px",
                backgroundColor: "green", // Change the snake color
                borderRadius: "50%",
              }}
            ></div>
          ))}

          {/* { score > 2 && (
            <div>
              <div
              style={{
                position: "absolute",
                top:"50px",
                left: "50px",
                width: "18px",
                height: "18px",
                
              }}
            ></div>
            </div>
            
          )} */}

        
         
          {score > 2  && score % 3 === 0 && (
            <div
            className={`blinking-box ${isBlinking ? "blink" : ""}`}

              style={{
                position: "absolute",
                top:foodposition.y,
                left: foodposition.x,
                width: "18px",
                height: "18px",
                backgroundColor: "green",
                borderRadius: "50%",
              }}
            ></div>

          )}

{/* {score > 2  && score % 3 === 0 && ( */}
          <div
            className={`blinking-box ${isBlinking ? "blink" : ""}`}
            style={{
              position: "absolute",
              top: foodposition.y,
              left: foodposition.x,
              width: "8px",
              height: "8px",
              backgroundColor: "green",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiFillApple
              size={50}
              style={{ width: "24px" }}
              className="text-green-700"
            />
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Grid;
