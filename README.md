# A Downlaod Tool For Share 

@author: H_fish
@mail: hentai6187@gmail.com

## Finish A Download Tool From Some Website Last Week 

*Written in node.js but work not that sufficient.*

*Will be transform into native electron recently*

*Will be pack into npm package and publish recently*

*Will support terminal config setting recently(With some dependencies)*

## Why do you write this tool ? 

As we all know, to download donjishi from website Ex sometimes can be difficult. First, the thread you want to download must contain a torrent resource. However, sometimes, there are no torrents anywhere.Moreover, the speed of the downloading torrent stream would be restricted by the number of the host providers nearby. Clearly, the speed is unpromising. So, why not just set a spider and pipe the images into the local dir which also reduces the time and space for zipped files. It's faster and much more convinient. Great apology for the EX websiter. 

## Some Warnning

+ The images download requires the pipe operation. So you must ensure your WLAN connection is stable and fast.

+ The download process requests the cookie setting. So please be patient if the download process is not successful. Please get me alert so I can refresh the cookies

+ Due to the website page design. Bugs exist when requiring page number is more than 10. 
**Please Check Carefully When Downloading More Than 10 Pages!**

+ Please ! Please ! Select your view mode as normal size / huge size. Or, your download process can be painful.

## Usage Doc

Please download this project in npmjs.org
Search for ex-fish or in npm terminal
```bash
$ npm install ex-fish
```

This project uses several dependencies

- cheerio
- fetch 
- fs
- request 

I tried to use as little dependencies  as possible. 

Just simply type:

```bash
$ npm init yes
$ npm install -g ex-fish
$ npm install 

$ ex-fish
```

You can start yor Test Download. 
**Also dont forget to change your config in config.js**
You can view your config status by typing:

```bash
$ npm run fish
```

## Code Example => config.js 

Configure config.js

```javascript
module.exports = {
  dir: 'xxxx',
  url: `https://xxxxxxx.org/g/xxxx/xxxxxx/`,
  opt: false, 
  page: {
    start: x,
    end: x
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

+ More Config Will Be Exported Out Soon

Please have fun enjoying downloading and Take care of yourself :)

# License 

This project uses [WTFPL License](WTFPL.txt) 