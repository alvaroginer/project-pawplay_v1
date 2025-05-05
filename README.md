# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

### 📝 Environment variables setup

To work with this repository, copy the example environment file by running the following command in a Unix-like terminal:

````bash
cp .env.example .env

Then, fill in the .env file with your actual API keys and environment variables.


🚩 If you accidentally committed the .env file to the Git repository:
Run the following command to stop tracking it (without deleting it from your local machine):

```bash
git rm --cached .env

Then commit this change
git commit -m "Remove .env from version control"



````

DataBase structure

1. Users
   users: array
   |
   |\_**\_user
   |
   |**id: string
   |
   |**mail: string
   |
   |**password: string
   |
   |**name: string
   |
   |**lastName: string
   |
   |\_\_profiles: string[] profileId

2. Profiles
   profiles: array
   |
   |**\_profile
   |
   |**id: string
   |
   |**profileName: string
   |
   |**profilePhoto: string
   |
   |**profileBio: string
   |
   |**age: number
   |
   |**breed: string
   |
   |**sex: string
   |
   |\_\_size: string

3. Events
   events: array
   |
   |**\_event
   |
   |**id: string
   |
   |**profileIdCreator: string
   |
   |**profileIdAsisstant: string[] profileId
   |
   |**eventPhoto: string
   |
   |**eventDescription: string
   |
   |**dateTime: number
   |
   |**location: string
   |
   |**places: number
   |
   |**activity: string
   |
   |**breeds: string[]
   |
   |**assistantLimit: number

4. Events Joined & Favourites
   events: array
   |
   |**\_profileId
   |
   |**eventsJoined: string[] eventId
   |
   |\_\_eventsFavourites: string[] eventId

5. Ratings
   ratings: array
   |
   |**\_rating
   |
   |**profileId: string
   |
   |
   |**profileRating: array
   |**fromProfileId: string
   |
   |\_\_value: number

```

```
