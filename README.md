
1. Pre-Requisite

- Node.js atleast v3.3.0
- Gulp v3.9.1
- Gulp-cli v2.3.0
- Bower v1.8.8

2. Steps to follow for predominatly for AEM Developers

- Clone the repo into your designated folder in your local machine.
- Change Directory to the folder
- Run command 	npm install -g gulp 			// Gulp will be installed globally
- Run command 	npm install -g gulp-cli			// Gulp cli would be installed globally
- Run command 	npm install -g bower			// Bower would be installed globally
- Run command 	bower install --force-lastest	// Force updating the latest dependencies
- Run command	gulp serve						// Templating Engine of pug and the compiler will compile the pug code into HTML code in "build" folder
- If in the enitre process, if you facing the following error  
```
	ReferenceError: primordials is not defined
   		at fs.js:33:5
```  
   - Then delete entire contents from npm-shrinkwrap.json file & replace it with the following contents:  
```
    {
      "dependencies": {
        "graceful-fs": {
            "version": "4.2.2"
         }
      }
    }
```  
- Run npm install  
- HTML, CSS and JS code thus generated in build folder would be further integrated in to the AEM Code base