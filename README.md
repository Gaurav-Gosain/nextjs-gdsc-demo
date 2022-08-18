# Next.js - Template Repository

Use this repository to follow along with the [Creating your own Web App](https://youtube.com/playlist?list=PLYlB334TcbXGVBqG-7m_udB-QTWQXYCf8) series.

# Using this template

### - Click on the <a target="_blank" href="https://github.com/HWTechClub/nextjs-template/generate"><img alt="Use This Template" title="Click the button above or this to copy the template" src="https://img.shields.io/badge/Use%20This%20Template-informational?style=flat-sqaure&color=2c974b" /></a> button, follow the steps to clone this template giving the repository a name of your choice.
  - #### If the above button doesn't appear, then [**download**](https://github.com/HWTechClub/nextjs-template/archive/refs/heads/main.zip) the ZIP file (<img alt="Use This Template" title="If you don't have a GitHub account, click on this button" src="https://img.shields.io/badge/Code%20-informational?style=flat-sqaure&color=2c974b" /> &rarr; [Download ZIP](https://github.com/HWTechClub/nextjs-template/archive/refs/heads/main.zip))
### - Run the `npm install` command in the root directory of the project to install all dependencies of the project.
### - Start the Next.js App using the `npm run dev`  command from the root directory of the project.

---

## Index

- [Using this template](#using-this-template)
- [Steps to Recreate this template](#steps-to-recreate-this-template)
  - [Creating your first Next.js app](#creating-your-first-nextjs-app)
    - [Choosing how to style your app](#choosing-how-to-style-your-app)
      - [Material-UI](#material-ui)
      - [Tailwind CSS](#tailwind-css)

# Steps to Recreate this template

To recreate this template you can follow the steps below:

## Creating your first Next.js app

Create your first [Next.js](https://nextjs.org/) app by running the following command:

```bash
npx create-next-app <app-name>
```

Replacing `<app-name>` with the name of your app.

### Choosing how to style your app

#### Material-UI

**Material-UI** is a React UI library for building user interfaces.

You can add Material-UI and [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) to your project by running the following command:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

#### Tailwind CSS

**Tailwind CSS** is a utility-first CSS framework for styled-components.

To add Tailwind CSS to your project, run the following command:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize Tailwind CSS by running the following command:

```bash
npx tailwindcss init -p
```

Initializing tailwindcss will create a `tailwind.config.js` file in your project. By default, Tailwind CSS will watch only `.html` files in your project.<br>
You can extend the default configuration by adding your own customizations to the [`tailwind.config.js`](tailwind.config.js) file and editing the `content` property like so:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Finally, add the following Taiwind directives to your CSS file:

[`./styles/globals.css`](styles/globals.css):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now for tailwind to work nicely with Material UI, we need to perform a few extra steps as by default some style properties of both fight for precedence causeing unwanted results.

An indepth interoperability guide can be found [here](https://mui.com/material-ui/guides/interoperability/#tailwind-css).

Add the following as the `corePlugins` property of your[ `tailwind.config.js`](tailwind.config.js) file:

```js
module.exports{
  corePlugins: {
    preflight: false,
  },
}
```
Add the important option, using the id of your app wrapper. For example, `#__next` for Next.js:

```js
module.exports{
  important: "#__next",
}
```

As a final step, we need to fix the CSS injection order.

Most CSS-in-JS solutions inject their styles at the bottom of the HTML `<head>` tag, which gives MUI precedence over Tailwind CSS.<br>
To reduce the need for the important property, you need to change the CSS injection order.

Here's how it can be done in MUI by editing the `<App>` component in [`pages/_app.js`](pages/_app.js):

```jsx
import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
}

export default MyApp;
```

---
