import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

function DropdownMenu({ selectedFilter, setSelectedFilter }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'No Filter', value: 'no_filter' },
    { label: 'Not-Favourites', value: 'no_favs' },
    { label: 'Favourites', value: 'favs' },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={selectedFilter}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedFilter} 
      setItems={setItems}
    />
  );
}

export default DropdownMenu;
