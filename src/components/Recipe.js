import * as React from 'react';
import Box from '@mui/material/Box';
import { useFirebase } from "../FirebaseProvider";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import { getDatabase, ref, child, get } from "firebase/database";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  
  });


export default function Recipe({ recipe }) {
    
//     const firebase = useFirebase();
//     const [recipes, setRecipes] = React.useState([]);
//     const [loading, setLoading] = React.useState(true);
//   // const starCountRef = ref(database, 'recipes/');
//   // onValue(starCountRef, (snapshot) => {
//   //   const data = snapshot.val();
//   //   updateStarCount(postElement, data);
//   // });

//   React.useEffect(() => {
//     if (firebase) {
//       const database = getDatabase(firebase.app);
//       const dbRef = ref(database);
//       get(child(dbRef, `recipes/`)).then((snapshot) => {
//         console.log(snapshot);
//         if (snapshot.exists()) {
//           const recipeObject = snapshot.val();
//           const recipeList = Object.values(recipeObject);
//           setRecipes(recipeList);
//           console.log(snapshot.val());
//         } else {
//           console.log("No data available");
//         }
//       });
//     }
//   }, [firebase]);
  return (
    <><ThemeProvider theme={darkTheme}>
          <Container style = {{background: "rgba(255, 255, 255, 0.10)"}}>
          

              <CssBaseline />
              <Header/>
              <div style={{margin: '25px', padding:'25px', background: "rgba(255, 255, 255, 0.10)", float: "left", width: '50%', borderRadius:'.5%'}}>
              <Avatar alt="Remy Sharp" src="https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2FChip%20Hubbard%20-%20HCA%20Headshot%20-.jpg?alt=media&token=1e32f0d3-3438-4c11-ad49-e75344f13760" />
                <Box style = {{background: "rgba(255, 255, 255, 0.10)", margin: '10px',  padding: '10px'}} >
                
                    Title + Date
                    {/* {recipe.RecipeName}
                    {recipe.Date} */}
                </Box>
                <Box style = {{background: "rgba(255, 255, 255, 0.10)", margin: '10px',  padding: '10px'}}>
                    Ingredients
                </Box >
                <Box style = {{background: "rgba(255, 255, 255, 0.10)", margin: '10px',  padding: '10px'}}>
                    Directions
                </Box>
              </div>
             <div style={{ margin: '25px', padding:'25px', background: "rgba(255, 255, 255, 0.10)", float: 'right', width: '25%', borderRadius:'.5%'}}>
             <Box
                component="img"
                sx={{
                     margin: '5px', background: "rgba(255, 255, 255, 0.10)", borderRadius:'.5%',
                // height: 233,
                // width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                }}
                alt="Looks delicous."
                src="https://firebasestorage.googleapis.com/v0/b/bakin-with-the-bros.appspot.com/o/images%2Fchip2.jpg?alt=media&token=87db18d7-5abe-4497-92f0-6de978c319a0"
            />
             <Box style = {{background: "rgba(255, 255, 255, 0.10)", margin: '10px',  padding: '10px'}}>
                Pro Tips
              </Box>
             </div>
              
          </Container>
      </ThemeProvider></>
  );
}
