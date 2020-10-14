# Anthem project Info

This document explains project and source code structure. 


# Project Setup
- Install gulp globally (if not installed globally)
	**npm install --global gulp**
- From trunk folder run **npm install**
- From trunk folder run **gulp** 

Install necessary bower components also using **bower install**


# Technology Used

- HTML5
- CSS3
- Javascript


## External Libraries used

- Jquery **v. 3.3.1**
- Bootstrap **v.4.0**

## Project Structure
Source code is inside **src** folder. 
**src** folder is composed of 
- **assets**
	- This folder includes all the images and fonts need for the project. This has two folders 
	- **fonts** folder contains all the fonts ttf files.
	- **images** folder stores all the images needed for the project. Need to follow consistent naming conventions as mentioned. 
- **markup**
	- Markup folder contains all the html snippets needed for the project. This uses **pug** preprocessor to code htmls.
	- This folder is further divided into **components**, **pages** and **includes**
	- **components** folder contains html partials in the form components. This makes htmls more reusable. Each component will have its own **css** and **pug** files. If you need to use any component then include corresponding css files also.  while writting **css** make sure to scope it properly to avoid overriding of css properties. 
	- **pages** folder contains markup for a particular page. Similar to components each page will have its own **css** and **pug** files. css file present here is page specific. Again you need to scope css to this page only to avoid overriding. You should not use this page specific css in another pages.  
- **scripts**
	- This folder contains javascript code needed for the project.
- **styles**
	- This folder contains css which common to entire project. 
