import axios from 'axios'
import React from 'react'
import { useState , useEffect , useRef } from 'react'

const App = () => {

const [data , setData] = useState('')
const title = useRef()
const description = useRef()

  useEffect(()=>{
    axios.get("http://localhost:5000/api/v1/allTodos")
  .then((res)=>{
  console.log(res.data.todos);
  setData(res.data.todos)
  })
  .catch((err)=>{
  console.log(err);
  })
  } , [])

const addTodo = async (event)=>{
  event.preventDefault()
 try {
  const response = await axios.post("http://localhost:5000/api/v1/todo", {
    title: title.current.value,
    description: description.current.value,
  });
  console.log(response.data);
} catch (error) {
  console.log(error);
}
}

  return (
    <>
    <div>
      <form onSubmit={addTodo}>
      <input type="text" placeholder='title' ref={title}/>
      <input type="text" placeholder='description' ref={description}/>
      <button type="submit">Add Todo</button>
      </form>
    </div>
    {
      data.length > 0 ? (
        data.map((item) => {
          return (
            <div key={item._id}>
              <h1>{item.title}</h1>
              <h1>{item.description}</h1>
            </div>
          );
        })
      ) : (
        <h1>No data found</h1>
      )
    }
    
    </>
  )
}

export default App