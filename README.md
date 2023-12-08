<!-- Header -->
<div id="top" align="center">
  <br />

  <!-- Logo -->
  <img src="./src/assets/img/logo.png" alt="Logo" width="200" height="200">

  <!-- Title -->
  ### Formula Manager 2

  <!-- Description -->
  Formula Recording Software V2

  <!-- Repo badges -->
  [![Version](https://img.shields.io/badge/dynamic/json.svg?label=Version&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/fhsons/formula-manager-2/tags%3Ftoken%3D35a3bf73a216782a7435f86117412bcb9784b716&query=$[0].name)](https://git.zakscode.com/fhsons/formula-manager-2/tags)
  [![Pull Requests](https://img.shields.io/badge/dynamic/json.svg?label=Pull%20Requests&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/fhsons/formula-manager-2%3Ftoken%3D35a3bf73a216782a7435f86117412bcb9784b716&query=open_pr_counter)](https://git.zakscode.com/fhsons/formula-manager-2/pulls)
  [![Issues](https://img.shields.io/badge/dynamic/json.svg?label=Issues&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/fhsons/formula-manager-2%3Ftoken%3D35a3bf73a216782a7435f86117412bcb9784b716&query=open_issues_count)](https://git.zakscode.com/fhsons/formula-manager-2/issues)

  <!-- Links -->

  ---
  <div>
    <a href="https://git.zakscode.com/fhsons/formula-manager-2/releases" target="_blank">Release Notes</a>
    • <a href="https://git.zakscode.com/fhsons/formula-manager-2/issues/new?template=.github%2fissue_template%2fbug.md" target="_blank">Report a Bug</a>
    • <a href="https://git.zakscode.com/fhsons/formula-manager-2/issues/new?template=.github%2fissue_template%2fenhancement.md" target="_blank">Request a Feature</a>
  </div>

  ---
</div>

## Table of Contents
- [Formula Manager 2](#top)
	- [About](#about)
        - [Demo](#demo)
		- [Built With](#built-with)
	- [Setup](#setup)
		- [Development](#development)
	- [License](#license)

## About

Version 2 of [Formula Manager](https://git.zakscode.com/fhsons/formula-manager) re-written to be web-based.

Formula Manager 2 is an angular website made to record chemical formulas & break them down into the required materials.

Formulas can be scaled & have the materials automatically adjusted.

All formulas are maintained by FH & Sons and stored using [Firestore](https://firebase.google.com/docs/firestore) by [Firebase](https://firebase.google.com/).

### Demo

FH&Sons website: https://screenprintingsuppliescanada.com/formulation-manager/

### Built With
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFFFFF?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

## Setup

<details>
<summary>
  <h3 id="produciton" style="display: inline">
    Production
  </h3>
</summary>

#### Instructions
1. Download the latest [release](https://git.zakscode.com/fhsons/formula-manager-2/releases/)
2. Extract to desired install directory & run the application (`.exe` on windows)

</details>

<details>
<summary>
  <h3 id="development" style="display: inline">
    Development
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install the dependencies: `npm install`
2. Start the Angular server: `npm run start`
3. Open [http://localhost:4200](http://localhost:4200)

</details>

## License
Copyright © 2023 Zakary Timson | All Rights Reserved

See the [license](./LICENSE) for more information.
