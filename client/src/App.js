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

const createNumberArray = number => {
  return Array.from(Array(Math.ceil(data.length / number)), (_, dataIndex) => dataIndex + 1);
};

const getUniqueValues = (data, key) => {
  return new Set(data.map(prod => prod[key]));
};

const getValueRange = (data, key, numberOfValues) => {
  return Array.from(
    Array(numberOfValues),
    (_, dataIndex) =>
      (dataIndex + 1) * Math.ceil(Math.max(...data.map(item => item[key])) / numberOfValues)
  );
};

export default function App() {
  const rowSize = 4;
  const [filters, setFilters] = useState({
    maxPrice: Math.max(...data.map(prod => prod.price)),
    category: getUniqueValues(data, 'category')
  });

  const handleFiltersChange = (key, newValue) => {
    setFilters({
      ...filters,
      [key]: newValue
    });
  };

  return (
    <Provider theme={defaultTheme}>
      <MenuTrigger closeOnSelect={false}>
        <ActionButton margin="size-300">Show Category</ActionButton>
        <Menu
          selectionMode="multiple"
          selectedKeys={filters.category}
          onSelectionChange={value => handleFiltersChange('category', value)}
        >
          {[...getUniqueValues(data, 'category')].map(category => {
            return <Item key={category}>{category}</Item>;
          })}
        </Menu>
      </MenuTrigger>
      <Picker
        label="Choose price range"
        onSelectionChange={value => handleFiltersChange('maxPrice', value)}
      >
        {getValueRange(data, 'price', rowSize).map(quartile => (
          <Item key={quartile}>{`under ${quartile}`}</Item>
        ))}
      </Picker>
      <p>Current selection (filters): {[...filters.category].join(', ')}</p>
      <p>Current picker (filters): {filters.maxPrice}</p>
      <Flex direction="column" width="size-4000" gap="size-100">
        {createNumberArray(rowSize).map((rowNumber, index) => {
          return (
            <Flex direction="row" gap="size-100" key={`product-row-${index}`}>
              {data
                .filter(
                  product =>
                    product.price <= filters.maxPrice && filters.category.has(product.category)
                )
                .slice(index * rowSize, rowNumber * rowSize)
                .map(product => (
                  <ProductView product={product} key={`product-${product.id}`} />
                ))}
            </Flex>
          );
        })}
      </Flex>
    </Provider>
  );
}
