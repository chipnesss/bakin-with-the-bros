import { getDatabase, ref, child, get } from "firebase/database";

export const getRecipesSortedByDate = async (firebase) => {
  return new Promise((resolve, reject) => {
    if (firebase) {
      const database = getDatabase(firebase.app);
      const dbRef = ref(database);
      get(child(dbRef, `recipes/`)).then(async (snapshot) => {
        if (snapshot.exists()) {
          const recipeList = Object.entries(snapshot.val()).map(([k, v]) => ({
            RecipedId: k,
            ...v,
          }));
          const recipeListSorted = recipeList.sort((a, b) =>
            new Date(a.TimeStamp) < new Date(b.TimeStamp) ? 1 : -1
          );
          const recipeListWithUsers = await Promise.all(
            recipeListSorted.map(async (recipe) => {
              const snapshot = await get(
                child(dbRef, `user_meta/${recipe.userId}`)
              );
              console.log(snapshot);
              if (snapshot.exists()) {
                console.log(snapshot.val());
                return {
                  ...recipe,
                  userPhoto: snapshot.val().photoURL,
                  userDisplayName: snapshot.val().displayName,
                };
              }
              return recipe;
            })
          );
          console.log(recipeListWithUsers);

          resolve(recipeListWithUsers);
        } else {
          return [];
        }
      });
    }
  });
  if (firebase) {
    const database = getDatabase(firebase.app);
    const dbRef = ref(database);
    get(child(dbRef, `recipes/`)).then(async (snapshot) => {
      if (snapshot.exists()) {
        const recipeList = Object.entries(snapshot.val()).map(([k, v]) => ({
          RecipedId: k,
          ...v,
        }));
        const recipeListSorted = recipeList.sort((a, b) =>
          new Date(a.TimeStamp) < new Date(b.TimeStamp) ? 1 : -1
        );
        const recipeListWithUsers = await Promise.all(
          recipeListSorted.map(async (recipe) => {
            const snapshot = await get(
              child(dbRef, `user_meta/${recipe.userId}`)
            );
            console.log(snapshot);
            if (snapshot.exists()) {
              console.log(snapshot.val());
              return {
                ...recipe,
                userPhoto: snapshot.val().photoURL,
                userDisplayName: snapshot.val().displayName,
              };
            }
            return recipe;
          })
        );
        console.log(recipeListWithUsers);

        return recipeListWithUsers;
      } else {
        return [];
      }
    });
  }
};
