import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

function DropdownMenu({ selectedFilter, setSelectedFilter }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'No Filter', value: 'no_filter' },
    { label: 'No Moons', value: 'no_moons' },
    { label: 'Moons', value: 'moons' },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={selectedFilter}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedFilter} // Actualiza el estado local en PlanetFilter.js
      setItems={setItems}
    />
  );
}

export default DropdownMenu;
