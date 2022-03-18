import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  const [value, setValue] = React.useState({ RecipeName: "Recipe Name", IngredientList: 'Ingredient List', Directions: 'Directions'});
  


  const handleChange = (event, field) => {
    // setValue(event.target.value);
    setValue({ ...value, [field]:event.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(JSON.stringify(value))
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >


<div>
        <TextField
          id="filled-multiline-flexible"
          label="Recipe Name"
          placeholder = 'Enter Recipe Name Here'
          value={value.RecipeName}
          onChange={(e)=>handleChange(e, 'RecipeName')}
          variant="filled"
        
        />
</div>
<div>
        <TextField
          id="filled-textarea"
          label="Ingredient List"
          placeholder="Placeholder"
          multiline
          rows={15}
          value={value.IngredientList}
          onChange={(e)=> handleChange(e, 'IngredientList')}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Directions"
          multiline
          rows={15}
          value={value.Directions}
          onChange={(e)=> handleChange(e, 'Directions')}
          defaultValue="Default Value"
          variant="filled"
        />
        
        
      </div>
      <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
      </Box>
  );
}

