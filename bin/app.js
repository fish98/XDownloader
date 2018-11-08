#!/usr/bin/env node

"use strict";
const fetch = require("node-fetch"),
    fs = require("fs"),
    cheerio = require("cheerio"),
    request = require("request"),
    ProgressBar = require("process"),
    conf = require("../config").config;

let url = conf.url,
    dirName = conf.dir,
    optional = conf.opt,
    configPage = conf.page,
    origin = conf.origin,
    viewMode = conf.viewMode;

const option = {
    headers: {
        Cookie: "ipb_member_id=4259928; ipb_pass_hash=fa7b84cfe16195e8795f21f8b55a9753; yay=louder; igneous=1959a2232; sl=dm_1; lv=1541349054-1541349079; s=a46a45a9e; sk=3qojffy6x7pvkt1sskpqsgdz79wy"
    }
}

async function getPage(site) {
    const res = await fetch(site, option),
        data = await res.text();
    let page = cheerio.load(data)(".ptb > tbody > tr").find("td").length - 2
    let title = cheerio.load(data)("#gn").text()
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

async function DownloadPage(site, e) {
    let o = [],
        t = [];
    await getimageGallery(site, e, o)
    await getImage(e, o, t)
    await downloadImage(site, e, t)
}

async function getimageGallery(site, e, o) {
    let t = site + `?p=${e-1}`
    await fetch(t, option).then(e => e.text()).then(e => {
        const t = cheerio.load(e)
        "normal" === viewMode ? t("#gdt > div > div > a").map((e, a) => {
            o.push(t(a).attr("href"))
        }) : t("#gdt > div > a").map((e, a) => {
            o.push(t(a).attr("href"))
        })
    }), console.log(`\nLoad Page ${e} OK\n`)
}

async function getImage(e, o, t) {
    let a, n = [];
    for (a = 0; a < o.length; a++) {
        let e = o[a];
        n.push(fetch(e, option).then(e => e.text()).then(e => {
            let o = cheerio.load(e)
            if (origin && o("#i7 > a").attr('href')) {
                t.push(o("#i7 > a").attr('href'))
            } else {
                t.push(o("#img").attr("src"))
            }
        })), a % 1 == 0 && (await Promise.all(n), console.log("Load Image " + t.length), n = [])
    }
    console.log(`\nLoad Image Path From Page ${e} OK\n`)
}

async function downloadImage(site, e, o) {
    let t = [];
    for (let a = 1; a <= o.length; a++) {
        let n = new Promise((t, n) => {
            const i = o[a - 1]
            if (origin) {
                const l = fs.createWriteStream(`${dirName}/${e}_${a}`)
                option.url = i, request.get(option).pipe(l), l.on("finish", () => {
                    console.log(`Write Page ${e}_${a} OK`), t()
                })
            } else {
                let r = i.substr(-4)
                const l = fs.createWriteStream(`${dirName}/${e}_${a}${r}`)
                option.url = i, request.get(option).pipe(l), l.on("finish", () => {
                    console.log(`Write Page ${e}_${a}${r} OK`), t()
                })
            }
        })
        t.push(n), a % 1 == 0 && (await Promise.all(t), t = [])
    }
}

async function ttfish(site) {
    let e, o, t;
    console.log(`\nStart Download Process in Dir ${dirName}\n`)
    const pageInfo = await getPage(site)
    console.log(`${pageInfo.title}\n`)
    console.log(`Contain ${pageInfo.page} Pages\n`)
    console.log("***************************************************************\n")
    await makeDir()
    optional ? (e = configPage.start, o = configPage.end) : (e = 1, o = pageInfo.page)
    for (t = e; t <= o; t++) {
        await DownloadPage(site, t)
    }
    console.log("Download thread complete!")
}

async function main() {
    for (let i = 0; i < url.length; i++) {
        await ttfish(url[i])
    }
}

try {
    main()
} catch (error) {
    console.log(error)
    console.log("The pipe stream download process requires great network status\n")
    console.log("Check your network status and try again\n")
}