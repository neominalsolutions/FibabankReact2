// UseMemo yöntemini yapacağız Array [] (Object Ref)

import React, { memo } from "react";

type ListProps = {
  items: any[];
};

export const List = memo(({ items }: ListProps) => {
  console.log("List");
  return (
    <>
      <h1>
        {items.map((item: any) => {
          return <ListItem key={item.id} item={item} />;
        })}
      </h1>
    </>
  );
});

type ListItemProps = {
  item: any;
};

export const ListItem = memo(({ item }: ListItemProps) => {
  return (
    <>
      <li>{item.name}</li>
    </>
  );
});
