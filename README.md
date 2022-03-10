# jiralist

**The idea:**  
Create a checklist app that connects to Jira to list out your current issues (todo, and in progress). when you cross-out an item, it will group into the date you crossed it out on.

Bootsrapped with react/typescript template based on the [arno](https://github.com/smashingboxes/arno) react native template.

![login-sc](https://user-images.githubusercontent.com/32459751/120070095-ef3b7280-c0bb-11eb-8ce3-3dc43de87d42.png)
![home-sc](https://user-images.githubusercontent.com/32459751/120070099-f1053600-c0bb-11eb-8091-1a6dc0a9283f.png)

## Getting started

### Running locally

Add .env file

```bash
cp .env.example .env
```

Replace the following vars with the ones from [jiralist-dev](https://developer.atlassian.com/console/myapps/b04690dd-1c73-4838-bc00-3b8496362a66/overview)

```bash
REACT_APP_3LO_CLIENT_ID=
REACT_APP_3LO_SECRET=
```

Install dependencies

```bash
npm install
```

Run on development

```bash
npm run start
```

## File structure

```bash
📦src
 ┣ 📂api
 ┃ ┣ 📂models         # Typescript models and types
 ┃ ┣ 📜API.ts         # API model
 ┃ ┣ 📜JiraAPI.ts     # API model specific to this project
 ┃ ┣ 📜JiraAPIClient.ts # API client
 ┃ ┗ 📜MockAPI.ts
 ┣ 📂model            # Redux store and slices
 ┃ ┣ 📜store.ts
 ┃ ┗ 📜userSlice.ts
 ┣ 📂modules
 ┃ ┣ 📂core           # Shared compoents, global styling
 ┃ ┃ ┗ 📜Styles.ts    # Typefaces and colors specific to this project
 ┃ ┣ 📂todo           # An example module
 ┃ ┃ ┣ 📂components   # Dumb, stateless components
 ┃ ┃ ┗ 📂containers   # Smart, stateful components
 ┣ 📂services         # Services used throughout the app
 ┃ ┣ 📜Auth0Service.ts
 ┃ ┣ 📜LocalStorageService.ts
 ┃ ┗ 📜LoggingService.ts
 ┣ 📂util             # Helpful utilities used throughout the app
 ┣ 📜App.tsx          # Top-level component definitions
 ┣ 📜Environment.ts   # Global environment config to access API and services
 ┣ 📜index.tsx        # Entry point
 ┗ 📜routes.ts        # Route definitions
```
