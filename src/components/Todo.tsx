// tfc

import React from "react";
import { ITodo } from "../models/todo";

type TodoProps = {
  items: ITodo[]; // [{id:1,completed:false,name:'ali',title:'deneme'}]
};
// map ile diğer backend dillerinde olduğu gibi arayüze gelen bir nesnenin iterate edilecek şekilde yazılmasını sağlarız. (foreach, for)
export const Todo = (
  { items }: TodoProps // parent component
) => (
  <>
    <h1>TodoList</h1>
    <ul>
      {items.map((item: ITodo) => {
        return <TodoItem todo={item} />; // burdaki template değerini return et
      })}
    </ul>
  </> // tek bir jsx return ediyor
);

export default Todo;

type TodoItemProps = {
  todo: ITodo; // {id:1,completed:false,name:'ali',title:'deneme'}
};
// her bir item değerini ekrana yansıtacak.
export const TodoItem = ({ todo }: TodoItemProps) => {
  // child component
  return (
    <>
      <li>
        {todo.title}
        <span style={{ backgroundColor: todo.completed ? "green" : "" }}>
          {todo.completed && <span>completedBy: {todo.user?.name}</span>}
        </span>
      </li>
    </>
  );
};
