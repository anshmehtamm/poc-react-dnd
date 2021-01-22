import logo from './logo.svg';
import './App.css';

import React from 'react'

const items = [
  { id: "1", title: " Task 1", clr:"red"},
  { id: "2", title: " Task 2", clr:"blue"},
  { id: "3", title: " Task 3",clr:"green"},
  { id: "4", title: "Task 4",clr:"grey"},
  { id: "5", title: " Task 5",clr:"purple"},
 ]

 const initialDnDState = {

  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []

 }


function App() {

  const [list,setList] = React.useState(items);
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);


  const onDragStart = (event) =>{

    event.currentTarget.classList.add("being-dragged");

    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
     ...dragAndDrop,
     draggedFrom: initialPosition,
     isDragging: true,
     originalOrder: list
    });


    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", '');

  }

  const onDragOver = (event) =>{

    event.preventDefault();

    if (event.currentTarget.className === "card"){
      event.currentTarget.classList.add('over');
    }

          let newList = dragAndDrop.originalOrder.slice();
      
          // index of the item being dragged
          const draggedFrom = dragAndDrop.draggedFrom; 

          // index of the droppable area being hovered
          const draggedTo = Number(event.currentTarget.dataset.position); 

          const itemDragged = newList[draggedFrom];
          // const remainingItems = newList.filter((item, index) => index !== draggedFrom);

          newList[draggedFrom] = newList[draggedTo];
          newList[draggedTo] = itemDragged;

          //  newList = [
          //   ...remainingItems.slice(0, draggedTo),
          //   itemDragged,
          //   ...remainingItems.slice(draggedTo)
          //  ];

          if (draggedTo !== dragAndDrop.draggedTo){
           setDragAndDrop({
            ...dragAndDrop,
            updatedOrder: newList,
            draggedTo: draggedTo
           })
          }
  }

  const onDrop = (event) =>{

    if (event.currentTarget.className === "card over"){
      event.currentTarget.classList.remove('over');
    }
    
    setList(dragAndDrop.updatedOrder);
  
    setDragAndDrop({
     ...dragAndDrop,
     draggedFrom: null,
     draggedTo: null,
     isDragging: false
    });


  }

  const onDragEnd = (event) =>{
    event.currentTarget.classList.remove("being-dragged");
  }

  const onDragEnter = (event) =>{
    
    if (event.currentTarget.className === "card"){
      event.currentTarget.classList.add("over");
    }


  }

  const onDragLeave = (event) =>{

    if (event.currentTarget.className === 'card over'){
      event.currentTarget.classList.remove("over");
    }

    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
     });

  }
  React.useEffect( ()=>{
    console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
    console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
   }, [dragAndDrop])
   
   React.useEffect( ()=>{
    console.log("List updated!");
   }, [list])

  return (
    <div className="App">
      <div className='container'>
        {list.map((item,i) => {
          return(
            <div className= 'card' 
                  color={item.clr}
                  //taskId = {item.id}
                  name={item.title}
                  key={item.id}
                  index={i}
                  data-position={i}
                  draggable
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragEnter={onDragEnter}
                  onDragEnd={onDragEnd}
                  onDragLeave={onDragLeave}
                  
               //   className={}
            >
              {item.title}
            </div>
          )
        })}
      
      </div>
    </div>
  );



}

export default App;
