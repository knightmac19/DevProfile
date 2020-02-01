# DevProfile

## User-Story
- AS A developer
- I WANT TO quickly and dynamically create PDF's introducing my team members
- SO THAT I don't have to create static PDF's for their profiles

## Description

This application helps team leaders save time by dynamically creating PDF's based on a person's GitHub profile.

The application is run from the command line using Node.js. After installing Node, navigate to the directory that hosts index.js. In terminal/GitBash, run "node index.js". The user will be prompted for a GitHub username and a color (red, blue, green, or pink).

The application then makes two requests to https://api.github.com/users/ -- once for information on the user's profile, and the second time for the number of repo's that user has starred.

The application then writes an HTML document using template literal. Certain content is passed in to the dynamically created HTML document using the response from the GitHub API. 

Finally, the application runs the HTML document through pdf-puppeteer: a node package module from http://npmjs.com.  

### GIF'S

![alt_text](https://github.com/knightmac19/DevProfile/blob/master/devScreenshot1.png)

![alt_text](https://github.com/knightmac19/DevProfile/blob/master/devScreenshot2.png)



![alt_text](https://github.com/knightmac19/DevProfile/blob/master/GIF1.mp4)

![alt_text](https://github.com/knightmac19/DevProfile/blob/master/GIF2.mp4)

![alt_text](https://github.com/knightmac19/DevProfile/blob/master/GIF3.mp4)



### Tutorials / Resources

- https://www.npmjs.com/package/pdf-puppeteer