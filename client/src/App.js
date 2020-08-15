import React, { useState } from 'react';
import {
  Provider,
  defaultTheme,
  ActionButton,
  MenuTrigger,
  Menu,
  Item,
  Picker
} from '@adobe/react-spectrum';

export default function App() {
  let [picked, setPicked] = useState('sometimes');
  let [selected, setSelected] = useState(new Set(['Sidebar', 'Console']));

  return (
    <Provider theme={defaultTheme}>
      <MenuTrigger closeOnSelect={false}>
        <ActionButton margin="size-300">Show</ActionButton>
        <Menu selectionMode="multiple" selectedKeys={selected} onSelectionChange={setSelected}>
          <Item key="Sidebar">Sidebar</Item>
          <Item key="Searchbar">Searchbar</Item>
          <Item key="Tools">Tools</Item>
          <Item key="Console">Console</Item>
        </Menu>
      </MenuTrigger>
      <Picker label="Choose frequency" onSelectionChange={setPicked}>
        <Item key="rarely">Rarely</Item>
        <Item key="sometimes">Sometimes</Item>
        <Item key="always">Always</Item>
      </Picker>
      <p>Current selection (controlled): {[...selected].join(', ')}</p>
      <p>Current picker (controlled): {picked}</p>
    </Provider>
  );
}
