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

```
Posible DataBase structure

1. Users
users: array
|
|____user
        |
        |__id: string
        |
        |__mail: string
        |
        |__password: string
        |
        |__name: string
        |
        |__lastName: string
        |
        |__profiles: string[] profileId


2. Profiles
profiles: array
|
|___profile
          |
          |__id: string
          |
          |__profileName: string
          |
          |__profilePhoto: string
          |
          |__profileBio: string
          |
          |__age: number
          |
          |__breed: string
          |
          |__sex: string
          |
          |__size: string

3. Events
events: array
|
|___event
        |
        |__id: string
        |
        |__profileIdCreator: string
        |
        |__profileIdAsisstant: string[] profileId
        |
        |__eventPhoto: string
        |
        |__eventDescription: string
        |
        |__dateTime: number
        |
        |__hour: number
        |
        |__location: string
        |
        |__places: number
        |
        |__activity: string
        |
        |__breeds: string[]
        |
        |__assistantLimit: string []

4. Events Joined & Favourites
events: array
|
|___profileId
            |
            |__eventsJoined: string[] eventId
            |
            |__eventsFavourites: string[] eventId

5. Ratings
ratings: array
|
|___rating
         |
         |__profileId: string
         |
         |__fromProfileId: string
         |
         |__value: number
         |
         |__commentaries?: string

```
