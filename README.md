# Masters for Designers

This is the source code for [https://mastersfordesigners.com](https://mastersfordesigners.com). The website aims to centralize information about all masters for design related topics in germany.

## Development Setup.

This site uses `node 16` and `npm 8`. To install specific versions of `node.js`, use  `nvm`, here is how to do it for macOS:


```
brew install nvm
nvm install 16
nvm use 16
```

After this, install the requirements using `npm install` and use `npm start` to launch the local development, it runs by default at port 8000, e.g. [http://localhost:8000](http://localhost:8000).

## Stack

* GatsbyJS: The site uses GatsbyJs 3.5 and relies on its source file system plugin to transform the .json files in this repository into the data on the site.
* NetlifyCMS: To make this site editable, it uses Netlify CMS to make the content editable. Netlify CMS is exposed at /admin e.g. [http://localhost:8000/admin](http://localhost:8000/admin) for local development or [https://mastersfordesigners.com/admin](https://mastersfordesigners.com/admin) for production. If you launch this locally, you have to let Netlify CMS know the production URL (https://mastersfordesigners.com).
