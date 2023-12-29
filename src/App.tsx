import { useState } from 'react'
import './App.css'
type ItemId=`${string}-${string}-${string}-${string}-${string}`
interface Item{
  id:ItemId,
  timestamp:number,
  text:string

}
const INITIAL_ITEMS=[
  {
    id:crypto.randomUUID(),
    timestamp:Date.now(),
    text:"Series"
  },
  {
    id:crypto.randomUUID(),
    timestamp:Date.now(),
    text:"Peliculas"
  },
  {
    id:crypto.randomUUID(),
    timestamp:Date.now(),
    text:"Videojuegos"
  },{
    id:crypto.randomUUID(),
    timestamp:Date.now(),
    text:"Libros"
  }
]
function App() {
  const[items,setItems]=useState(INITIAL_ITEMS)
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const {elements} = event.currentTarget
    const input = elements.namedItem("item")
    const isInput = input instanceof HTMLInputElement
    if(!isInput||input==null)return
    const newItem:Item={
      id:crypto.randomUUID(),
      timestamp:Date.now(),
      text:input.value
    }
    setItems(prevItems=>{
      return [...prevItems,newItem]
    })
    input.value=''
  }

  const createHandleRemoveItem=(id:ItemId)=>()=>{
    setItems(prevItems=>{
      return prevItems.filter(currentItem=>currentItem.id!==id)
    })
  }
  return (
    <main>
      
      <aside><h1>Prueba tecnica</h1>
        <h2>Agregar y eliminar elementos a la lista</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Elemento a introducir
          <input type="text" name='item' required placeholder='Agregar elemento'/>
          </label>
          <button>
            Añadir elemento a la lista
          </button>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {items.length===0?
          <p> 
            <strong> No hay elementos en la lista</strong>
          </p>
          :
          items.map(item=>
            {
              return(
            <li key={item.id}>
            {item.text}
            
            <button onClick={createHandleRemoveItem(item.id)}>
              Eliminar Elemento
            </button>
            </li>
              )
            }
            )}
        </ul>
      </section>
    </main>
  )
}

export default App
