
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { useState } from 'react';

// export default function ActionAlerts() {


const ActionAlerts = () => {
    const [show, setShow] = useState(false);
    
      return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert onClose={() => {}}>Dang, thats a good looking recipe...</Alert>
    </Stack>
  );
}
  
  export default ActionAlerts