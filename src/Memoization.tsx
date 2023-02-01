import React, { useCallback, useEffect, useMemo, useState } from "react";
import { List } from "./components/memoization/List";
import "./memoization.css";
import logo from "./logo.svg";
import Header from "./components/memoization/Header";
import ClearButton from "./components/memoization/ClearButton";

type MemoizationProps = {};

export const Memoization = ({}: MemoizationProps) => {
  console.log("text");

  const [counter, setCounter] = useState<number>(0); // memoizationState
  const [slogo, setLogo] = useState<string>(logo);
  const [search, setSearch] = useState(""); // search edilen değeri elimde tutmak için kullandık
  const [text, setText] = useState(""); // Input text değeri

  // useState tanımı yaparken Usememo aynı aynda kullanamadığımdan aşağıda bir useMemo için variable tanımı yaptık.
  const [items, setItems] = useState<any[]>([
    { id: 1, name: "ali" },
    { id: 2, name: "can" },
    { id: 3, name: "mustafa" },
    { id: 4, name: "hasan" },
  ]);

  // filterItems da referans type olduğu için
  // her bir search değişimde yeniden filterelenmiş oluyor ali => search bu filter kodu çalışıyor
  // referans type bir
  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        console.log("filter", item);
        return item.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, items] // deps
  );

  const onType = (event: any) => {
    setText(event.target.value); // input text değeri üzerinden
    // yeniden render alındığı state değişiminde
  };

  const onSearch = (event: any) => {
    setSearch(text);
  };

  useEffect(() => {
    console.log("slogo", slogo);
  }, [slogo]);

  // handleClear ile button click olduğunda üst parent componentte clear function tetikle
  const clear = useCallback(() => {
    // set temizlem işlemi yapacağız
    console.log("temizle");
    setCounter(0); // aslında buraki state counter state parent componente ait bir state ama clearButton ve List Componentinde re-render sebep oluyor.

    setText("");
    setSearch("");
  }, []); // useEffect deps benzer hangi state değişikliği durumdan re-render yapılacağına karar vermek için kullanılır.

  return (
    <>
      <div className="container">
        <h1>Memoization Component </h1>
        {/* primative bir props */}
        <Header logo={slogo} />
        <List items={filteredItems} />
        <br></br>
        <ClearButton handleClear={clear} />
        {/* child component parent componette bir değişiklik bir eylemi yerine getir */}
        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          + Counter {counter}
        </button>
        <br></br>
        <input value={text} onChange={onType} placeholder="search user" />
        {/* search: {search}
        text: {text} */}
        <button onClick={onSearch}>Search</button>
        {/* <input
          onChange={(event) => {
            setLogo(event.target.value);
          }}
        ></input>
        <button onClick={() => setLogo(logo)}>Change Logo</button> */}
      </div>
    </>
  );
};
