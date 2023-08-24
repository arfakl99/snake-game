import { useEffect, useState } from "react";
import React from "react";
import "../../src/index.css";
import { AiFillApple } from "react-icons/ai";
import { FaBeer } from "react-icons/fa";

import ArrowKeysReact from "arrow-keys-react";

import bgimg from "../assets/images/snake.jpg";
import snake from "../assets/images/snake2.jpg";
import Node from "postcss/lib/node";

const Grid = () => {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [foodposition, setFoodposition] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState("right");
  const [score, setScore] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showdiv, setShowdiv] = useState(false);
  const [showdiv2, setShowdiv2] = useState(false);
  const [level, setLevel] = useState(1);
  const [bigfoodposition, setBigfoodposition] = useState({ x: 50, y: 30 });
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

  // const handelupdate = (e) => {
  //   clearInterval(interval);
  //   console.log(e.key);
  //   if (e.key === "ArrowRight") {
  //     setDirection("right");
  //   }
  //   if (e.key === "ArrowLeft") {
  //     setDirection("left");
  //   }
  //   if (e.key === "ArrowUp") {
  //     setDirection("up");
  //   }
  //   if (e.key === "ArrowDown") {
  //     setDirection("down");
  //   }
  // };

  useEffect(() => {
    const keydownHandler = (e) => {
      switch (e.key) {
        case "ArrowUp":
         

          if (direction === "down" ) return;
          
          setDirection("up");
          break;
        case "ArrowDown":
          if (direction === "up" ) return;
          setDirection("down");
          break;
        case "ArrowLeft":
          if (direction === "right" ) return;
          setDirection("left");
          break;
        case "ArrowRight":
          if (direction === "left") return;
          setDirection("right");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [ direction]);


  useEffect(() => { 
    if (score>2 && score % 3 === 0) {
      setShowdiv(true);
      
      setTimeout(() => {
        setShowdiv(false);
      }, 12000);
    }
    if(score>6){
      setShowdiv2(true);
    }

    if (score>2 && score % 3 === 0) {
      setLevel(level + 1);
    }

    if( position.x === bigfoodposition.x && position.y === bigfoodposition.y ){
      setScore(score + 5);
      setBigfoodposition({
        
        x: Math.floor(Math.floor(Math.random() * 520) / 10) * 10,
        y: Math.floor(Math.floor(Math.random() * 420) / 10) * 10,
      });

      setSnakeposition((prevSnakeposition) => {
        const newSnakeposition = [...prevSnakeposition];
        newSnakeposition.push({
          x: bigfoodposition.x,
          y: bigfoodposition.y,
        });
        
        return newSnakeposition;
      }
      );

    }
  
    // snakeposition.map((item) => {
    //   if (snakeposition[0].x === item.x && snakeposition[0].y === item.y) {
    //     clearInterval(interval);
    //     alert("Game Over");
    //   }
    // });

    // for (let i = 2; i < snakeposition.length; i++) {
    //   if (
    //     snakeposition[0].x === snakeposition[i].x &&
    //     snakeposition[0].y === snakeposition[i].y
    //   ) {
    //     clearInterval(interval);
    //     alert("Game Over");
    //     break;
    //   }
    // }

    console.log("snakeposition[0]", snakeposition[0]);
    console.log("snakeposition{1}", snakeposition[1]);
    console.log("snakeposition{2}", snakeposition[2]);
    console.log("snakeposition{3}", snakeposition[3]);
    console.log("snakeposition{4}", snakeposition[4]);
    console.log("snakeposition{5}", snakeposition[5]);
    console.log("snakeposition{6}", snakeposition[6]);
    console.log("snakeposition{7}", snakeposition[7]);

    
    
  }, [score, bigfoodposition, position, snakeposition]);

  useEffect(() => {
    for (let i = 2; i < snakeposition.length; i++) {
      if (
        snakeposition[0].x === snakeposition[i].x &&
        snakeposition[0].y === snakeposition[i].y
      ) {
        clearInterval(interval);
        alert("Game Over");
        break;
      }
    }
  }, [position  , snakeposition]);


  return (
    <>
    <div style={
      {
        backgroundColor:"white",
        height:"100vh",
        width:"100vw",

      }
    }>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          //   backgroundImage: "url('bgimg')",
          // backgroundImage: `url(${bgimg})`,
          // backgroundColor:"rgba(0,0,0,0.5)",

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
          Snake head Position : {position.x} , {position.y}
        </div>
       
        {/* <div>
          Snake Position : {snakeposition[2].x} , {snakeposition[2].y}
        </div> */}
        {/* <div>
          Snake Position : {snakeposition[3].x} , {snakeposition[3].y}
        </div>
        <div>
          Snake Position : {snakeposition[4].x} , {snakeposition[4].y}
        </div>
        <div>
          Snake Position : {snakeposition[5].x} , {snakeposition[5].y}
        </div>
        <div>
          Snake Position : {snakeposition[6].x} , {snakeposition[6].y}
        </div>
        <div>
          Snake Position : {snakeposition[7].x} , {snakeposition[7].y}
        </div>
         */}

<div style={
  {
    
    backgroundColor:"white",
    height:"70vh",
    width:"20vw",
    position:"absolute",
    top:"10px",
    right:"10px",
    zIndex:"1",
    opacity:"0.8",
    color:"black",
    
    // backgroundColor:"rgba(0,0,0,0.5)",
  }
}>
{
          snakeposition.map((item) => (
            <div>
              snake position : {item.x} , {item.y}
              

            </div>
          ))

         }
  </div>
         

        

        {/* <input
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
        /> */}
       

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

         

        
          {showdiv && (
             <div
             className={`blinking-box ${isBlinking ? "blink" : ""}`}
 
               style={{
                 position: "absolute",
                 // i want to show this div at random position along with food
                 top: bigfoodposition.y,
                  left: bigfoodposition.x,
 
                 width: "18px",
                 height: "18px",
                 backgroundColor: "green",
                 borderRadius: "50%",
               }}
             ></div>
          )}


          {/* {showdiv2 && (
            
          )} */}

          {
            showdiv2 && (
            <section>
<div  style={
            {
              position: "absolute",
              top: 40,
              left: 40,
              width: "480px",
              height: "5px",
              backgroundColor: "#b8b817",

            }
          }>

          </div>
            
          <div  style={
            {
              position: "absolute",
              top: 60,
              right: 40,
              width: "480px",
              height: "5px",
              backgroundColor: "#b8b817",

            }
          }>

          </div>
          <div  style={
            {
              position: "absolute",
              top: 239,
              right: 140,
              rotate:"45deg",
              width: "445px",
              height: "5px",
              backgroundColor: "#b8b817",

            }
          }>

          </div>
            
          <div  style={
            {
              position: "absolute",
              top: 246,
              right:-21,
              rotate:"133deg",
              width: "445px",
              height: "5px",
              backgroundColor: "#b8b817",

            }
          }>

          </div>
            </section>
              
            )

          }

          
            

         
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
      </div>
    </>
  );
};

export default Grid;
