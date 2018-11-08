# XDownloader v1.2

<img align="right" width="180px" src="https://raw.githubusercontent.com/fish98/QSC_Journey/master/Image/fish1.jpg">

## Update on Nov.5th

Due to the demand of origin sized image when embeddig, add new feature for origin sized download option in config file

check the usage in new T-UI feature and planning to migrate to electronic version with all platform packaged

## XDownloader v1.1

*Written in node.js but work not that sufficient.*

*Will be transform into native electron recently*

*Will be pack into npm package and publish recently*

*Will support terminal config setting recently(With some dependencies)*

## Why do you write this tool ? 

As we all know, to download manga from Ex sometimes can be difficult. First, the thread you want to download must contain a torrent resource. However, there are no torrent file shared anywhere in most cases. Moreover, the speed of the downloading torrent stream would be restricted by the number of the host providers nearby. Clearly, the speed is unpromising. So, why not just set a spider and pipe the images into the local dir which also reduces the time and space for zipped files. It's much faster and much more convinient. Great apology to the website maintainer. 

## Some Warnning

+ The images download requires the pipe operation. So you must ensure your WLAN connection is stable and fast. IMPORTANT!!! especially when in origin mode

+ The download process requests the cookie setting. So please be patient if the download process is not successful. Please get me alert so I can refresh the cookies

+ Due to the website page design. Bugs exist when requiring page number is more than 10. 
**Please Check Carefully When Downloading More Than 10 Pages!**

+ Please ! Please ! Select your view mode as normal size / huge size. Or, your download process can be painful.

## Usage Doc

Please download this project in npmjs.org

! deleted three month ago...

This project requires several dependencies

- cheerio
- fetch 
- fs
- request 

I tried to use as few dependencies as possible. 

## To Run this downloader

```bash
$ npm install 
$ npm start
```

Please ensure you have Node.js environment on your computer
Or you can download by yourself

**Also dont forget to change your config in config.js**
You can view your config status by typing:

```bash
$ npm run fish
```

then it will print out the present status of your download config

## Code Example => config.js 

Configure config.js

```javascript
module.exports = {
  dir: 'xxxxxxx',                         
  url: `https://xxxxxxxxxx.org/g/xxxxxxxxx`,                           
  opt: false,                            
  origin: true,     // new feature !!                     
  page: {                                
    start: 1,
    end: 10
  },
  viewMode: 'huge' 
}
```
You can set config and do some simple option 

+ dir : set all the images into the ./[dirname] (Create one if not exist) 
+ url : the url from the home page you want to download
+ opt : set whether you want to download the selected page[default false] 
+ page : (if the opt is set to true) => set the download mission start page and the end page
+ viewMode: select view mode as huge or normal
+ origin: Download the original sized image instead of the zipped image displayed on the page(When aviliable)

+ More Config Will Be Exported Out Soon

Please have fun enjoying downloading and Take care of yourself :)

# License 

This project uses [WTFPL License](LICENSE.txt) 