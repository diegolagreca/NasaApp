import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

function DifficultyPicker({ selectedDifficulty, setSelectedDifficulty }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Easy', value: 'easy' },
    { label: 'Hard', value: 'hard' },
    { label: 'Medium', value: 'medium' },
  ]);

  return (
    <DropDownPicker
      placeholder='Select Difficulty'
      open={open}
      value={selectedDifficulty}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedDifficulty} 
      setItems={setItems}
    />
  );
}

export default DifficultyPicker;
