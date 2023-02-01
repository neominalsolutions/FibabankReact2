import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { ITodo, ITodoUser } from "./models/todo";
import Todo from "./components/Todo";

function App() {
  //

  const todoPromise = new Promise((resolve, reject) => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        let todoList = response.data as any[];

        console.log("response", todoList);

        // her bir todo item değeri için apidan istek atarak user bilgisine erişmem gerektiğinde dolayı promise then yöntemi ile birleştiremedik. // mantıken promise.all ile de yapamadık (farklı promiseler tek bir sonuç döndürsün diye var)
        todoList.forEach((item: ITodo) => {
          // async bir istek var.
          axios
            .get(`https://jsonplaceholder.typicode.com/users/${item.userId}`)
            .then((response: any) => {
              let user = Object.assign({
                id: response.data.id,
                name: response.data.name,
                username: response.data.username,
              });

              item.user = { ...(user as ITodoUser) }; // spread operatörü ile user nesneni güncelleyecek.
            });
        });

        resolve(response.data);
      })
      .catch((err) => reject(err));
  });

  useEffect(() => {
    console.log("promise");
    todoPromise
      .then((todoResponse) => {
        console.log("todoResponse", todoResponse); // {id,title,completed,user:{id,name}} beklenen result<
      })
      .catch((err) => {
        console.log("err", err);
      });

    return () => {};
  }, []); // tek sefer sayfa açıldığında çalışsın

  // const res = () => {
  //   // this // windows
  // }

  // function res2() {
  //   // this self kendi context
  // }

  // res(){}

  return (
    <div className="App">
      <Todo items={[]} />
    </div>
  );
}

export default App;
