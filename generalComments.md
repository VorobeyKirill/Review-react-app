1. All packages (dependencies) have old versions in package.json (major and minor versions).
All used dependencies have newer versions, it's better to update them.

2. It looks like the project was created using `create-react-app`. For now, It's better to use `Vite` for React apps creation, because CRA installs old versions of packages, also the initial installation is very slow and bulky.

3. There is no `.eslintrc.json` file. Eslint is very useful for preventing errors while writing code.
Also it can help to have the similar code style for all developers in a big team.

4. There is no `.prettierrc.json` file. Prettier is very useful for having the same code style (indents, quotes, trailing commas) for all developers in a big team.

5.