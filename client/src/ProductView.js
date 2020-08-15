import React from 'react';
import { View, Header, Content } from '@adobe/react-spectrum';
export default function ProductView({ product: { name, category, price } }) {
  const productColors = {
    Apparel: 'blue',
    Bags: 'indigo',
    Gear: 'celery',
    Shoes: 'magenta'
  };

  return (
    <View backgroundColor={`${productColors[category]}-600`} flex padding="size-100">
      <Header>{name}</Header>
      <Content>
        <span>Category: {category}</span>
        <br />
        <span>Price: ${price}</span>
      </Content>
    </View>
  );
}
