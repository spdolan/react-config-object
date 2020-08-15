import React, { useState } from 'react';
import {
  Provider,
  defaultTheme,
  ActionButton,
  MenuTrigger,
  Menu,
  Item,
  Picker,
  Flex
} from '@adobe/react-spectrum';
import data from './data.json';
import ProductView from './ProductView';

export default function App() {
  const [picked, setPicked] = useState(Math.max(...data.map(prod => prod.price)));
  const [selected, setSelected] = useState(new Set(data.map(prod => prod.category)));

  const rowSize = 4;
  return (
    <Provider theme={defaultTheme}>
      <MenuTrigger closeOnSelect={false}>
        <ActionButton margin="size-300">Show Category</ActionButton>
        <Menu selectionMode="multiple" selectedKeys={selected} onSelectionChange={setSelected}>
          <Item key="Apparel">Apparel</Item>
          <Item key="Shoes">Shoes</Item>
          <Item key="Bags">Bags</Item>
          <Item key="Gear">Gear</Item>
        </Menu>
      </MenuTrigger>
      <Picker label="Choose price range" onSelectionChange={setPicked}>
        <Item key="10">under $10</Item>
        <Item key="25">under $25</Item>
        <Item key="100">under $100</Item>
      </Picker>
      <p>Current selection (controlled): {[...selected].join(', ')}</p>
      <p>Current picker (controlled): {picked}</p>
      <Flex direction="column" width="size-4000" gap="size-100">
        {Array.from(Array(Math.ceil(data.length / rowSize)), (_, dataIndex) => dataIndex + 1).map(
          (rowNumber, index) => {
            return (
              <Flex direction="row" gap="size-100" key={`product-row-${index}`}>
                {data
                  .filter(product => product.price <= picked && selected.has(product.category))
                  .slice(index * rowSize, rowNumber * rowSize)
                  .map(product => (
                    <ProductView product={product} key={`product-${product.id}`} />
                  ))}
              </Flex>
            );
          }
        )}
      </Flex>
    </Provider>
  );
}
