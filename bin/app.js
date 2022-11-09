#!/usr/bin/env node

"use strict";
const fetch = require("node-fetch"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    request = require("request"),
    ProgressBar = require("progress"),
    conf = require("../config").config;

let bookList = conf.bookList,
    dirName = conf.dir,
    optional = conf.opt,
    configPage = conf.page,
    origin = conf.origin,
    viewMode = conf.viewMode;

const option = {
    headers: {
        Cookie: ""
    }
}

async function getPage(book) {
    const res = await fetch(book, option)
    const data = await res.text()
    let $ = cheerio.load(data)
    let page = $(".ptb > tbody > tr").find("td").length - 2
    let title = $("#gn").text()
    if (dirName === 'Default') {
        dirName = title
    }
    return {
        page: page,
        title: title
    }
}

async function makeDir() {
    fs.mkdir(`./${dirName}`, () => {
        console.log(`Initialize Target Directory OK`)
        console.log(`Please check if this folder has already been written!`)
    })
}

async function DownloadPage(book, page) {
    let pageGallery = [],
        imageGallery = [];
    await getimageGallery(book, page, pageGallery)
    await getImage(page, pageGallery, imageGallery)
    await downloadImage(page, imageGallery)
}

async function getimageGallery(book, page, pageGallery) {
    let url = book + `?p=${page-1}`
    await fetch(url, option).then(res => res.text()).then(data => {
        const $ = cheerio.load(data)
        "normal" === viewMode ? $("#gdt > div > div > a").map((index, item) => {
            pageGallery.push($(item).attr("href"))
        }) : $("#gdt > div > a").map((index, item) => {
            pageGallery.push($(item).attr("href"))
        })
    }), console.log(`\nLoad Page ${page} OK\nStart Processing Images\n`)
}

async function getImage(page, pageGallery, imageGallery) {
    let image, waitList = [];
    
    // Advanced Operation here. Set thread for async multiple image processing
   
    let thread = 1;
   
    // Require High Speed Network Connection!!!

    let bar = new ProgressBar('processing image path [:bar] :percent :file :etas', {
        complete: '=',
        incomplete: ' ',
        width: 25,
        total: pageGallery.length 
    })

    for (image = 0; image < pageGallery.length; image++) {
        let url = pageGallery[image];
        waitList.push(fetch(url, option).then(res => res.text()).then(data => {
            let $ = cheerio.load(data)
            if (origin && $("#i7 > a").attr('href')) {
                imageGallery.push($("#i7 > a").attr('href'))
            } else {
                imageGallery.push($("#img").attr("src"))
            }
        }))
        if (image % thread == 0) {
            await Promise.all(waitList)
            bar.tick({
                file: `${imageGallery.length}.jpg`
            })
            waitList = []
        }
    }
    console.log(`\nLoad Image Path From Page ${page} OK\nStart Downloading now\n`)
}

async function downloadImage(page, imageGallery) {

    // Advanced Operation here. Set thread for async multiple image processing
    
    let thread = 1;
    
    // Require High Speed Network Connection!!!

       let bar = new ProgressBar('processing image path [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 25,
        total: imageGallery.length + 1 
    })

    bar.tick(1)
    
    let waitList = [];

    for (let image = 1; image <= imageGallery.length; image++) {
        let download = new Promise((resolve, reject) => {
            let imageUrl = imageGallery[image - 1]
            if (origin) {
                let file = fs.createWriteStream(`${dirName}/${page-1}${image}.jpg`)
                option.url = imageUrl 
                request.get(option).pipe(file)
                file.on("finish", () => {console.log(1), resolve()})
            } 
            else {
                let suffix = imageUrl.substr(-4)
                const file = fs.createWriteStream(`${dirName}/${page-1}${image}${suffix}`)
                option.url = imageUrl
                request.get(option).pipe(file)
                file.on("finish", () => {console.log(2), resolve()})
            }
        })
        waitList.push(download)
        if(image % thread == 0) {
            await Promise.all(waitList)
            bar.tick(1)
            waitList = []
        }     
    }
}

async function ttfish(book) {
    let start, end, page;
    console.log(`\nStart Download Process in Dir ${dirName}\n`)
    const pageInfo = await getPage(book)
    console.log(`${pageInfo.title}\n`)
    console.log(`Contain ${pageInfo.page} Pages\n`)
    console.log("***************************************************************\n")
    await makeDir()
    optional ? (start = configPage.start, end = configPage.end) : (start = 1, end = pageInfo.page)
    for (page = start; page <= end; page++) {
        await DownloadPage(book, page)
    }
    console.log("Download thread Complete!")
}

async function main() {
    for (let book = 0; book < bookList.length; book++) {
        await ttfish(bookList[book])
    }
}

try {
    main()
} catch (error) {
    console.log(error)
    console.log("The pipe stream download process requires great network status\n")
    console.log("Check your network status and try again\n")
}
