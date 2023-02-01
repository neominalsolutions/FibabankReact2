import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { ITodo, ITodoUser } from "./models/todo";
import Todo from "./components/Todo";
import * as _ from "lodash";

function App() {
  const controller = new AbortController();
  // Then Catch Promise yapısı kullanımı
  const todoPromise = () =>
    new Promise((resolve, reject) => {
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

  let todos: any[] = []; // variable (Bunu angular yapar, Gerçek DOM var, ChangeTracker diye bir mekanizma variable değişikliğini direk doma yansıtıyor.)

  const [todoState, setTodoState] = useState<ITodo[]>([]);

  const fetchTodo = async (signal: AbortSignal) => {
    let todoRes = (await (
      await axios.get("https://jsonplaceholder.typicode.com/todos", {
        signal: signal,
      })
    ).data) as ITodo[];

    let todoRes2: any[] = [];

    // loadash ile farklı referanslarda copy işlemleri yapabiliriz.
    todoRes2 = _.cloneDeep(todoRes); // array ve object içinde kullanılabilir.

    todoRes.forEach(async (item: ITodo) => {
      // yada referance durumu yaratan object,array (object) gibi js yapılarını spread operatörü yardımı ile eşlemek referans hatalarının çnüne geçer. Object.assing() yeni ref tanımı = {... item} [... items]
      item.user = {
        ...((
          await axios.get(
            `https://jsonplaceholder.typicode.com/users/${item.userId}`,
            { signal: signal }
          )
        ).data as ITodoUser),
      };

      // console.log("item.user", item.user);
    });

    todos = [...todoRes];
    setTodoState(todoRes); // yukarıdaki variable yerine state güncellenir.

    // Not: sayfa açıldığında sayfada render edilecek olan değerleri useEffect ile apiden çekiririz. bu apiden gelen verilerin sayfaya yansımasını istiyorsak bu durumda useState kullanmamız gerekir. Aksi takdirde veri çekilecek ama component re-render olmayacağından arayüze yansımayacaktır. (Virtual DOM değişikliği sadece state güncellemesi ile oluyor.)
    console.log("todos", todos);
  };

  useEffect(() => {
    // async her bir her bir api call işleminde kullanmayı tavsiye ederiz.
    // api kaynak tüketimini iş bittikten sonra kesme görevi görüyor
    fetchTodo(controller.signal);

    // clean up function
    return () => {
      console.log("clean-up");
      controller.abort(); // artık bu component ile işim bitti http istediğini sonlandır. diğer componentler etkilenmesin.
    };
  }, []);

  useEffect(() => {
    // console.log("promise");
    // todoPromise()
    //   .then((todoResponse) => {
    //     console.log("todoResponse", todoResponse); // {id,title,completed,user:{id,name}} beklenen result<
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });

    return () => {};
  }, []); // tek sefer sayfa açıldığında çalışsın

  const controllerAbort = () => {
    controller.abort();
    console.log("self clean up");
  };

  return (
    <div className="App">
      <button onClick={controllerAbort}>Custom Abort</button>
      <button onClick={() => setTodoState([])}>State Temizle</button>
      <span>{todoState.length > 0 && <Todo items={todoState} />}</span>
    </div>
  );
}

export default App;
