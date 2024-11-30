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



const deleteTodo = async (id)=>{
  try{
    const response = await axios.delete(`http://localhost:5000/api/v1/todo/${id}`)
    console.log(response.data);
  } catch (err){
    console.log(err);
  }
}
const editTodo = async (id) => {
  const title = prompt("edited title value");
  const description = prompt("edited title value");
  try {
    const edit = await axios.put(`http://localhost:5000/api/v1/todo/${id}`, {
      title,
      description
    });
    console.log(edit);
  } catch (error) {
    console.log(error);
  }
};


  return (
    <>
<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4">
      <form
        onSubmit={addTodo}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
         Todo App
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            ref={title}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            ref={description}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Add Todo
        </button>
      </form>


      <div className="w-full max-w-2xl">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-4">
                  <button
                    onClick={() => deleteTodo(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => editTodo(item._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <h1 className="text-gray-500 text-lg">No data found</h1>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default App