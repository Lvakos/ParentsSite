"use strict";
const IMAGES = {
    "glubokayachistka/1divando": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/glubokayachistka/1divando"
    },
    "glubokayachistka/1divanposle": {
        "w": 593,
        "h": 854,
        "widths": [
            480,
            593
        ],
        "fallbackWidth": 593,
        "base": "assets/img/glubokayachistka/1divanposle"
    },
    "glubokayachistka/2divando": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/glubokayachistka/2divando"
    },
    "glubokayachistka/2divanposle": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/glubokayachistka/2divanposle"
    },
    "glubokayachistka/matrasdo": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/glubokayachistka/matrasdo"
    },
    "glubokayachistka/matrasposle": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/glubokayachistka/matrasposle"
    },
    "kartochki/chistayakvartira": {
        "w": 1254,
        "h": 1254,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/kartochki/chistayakvartira"
    },
    "kartochki/chistiypodjesd": {
        "w": 1254,
        "h": 1254,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/kartochki/chistiypodjesd"
    },
    "kartochki/pokoshenayatrava": {
        "w": 600,
        "h": 450,
        "widths": [
            480,
            600
        ],
        "fallbackWidth": 600,
        "base": "assets/img/kartochki/pokoshenayatrava"
    },
    "moykaOkon/1moykaOkonDo": {
        "w": 3213,
        "h": 5712,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/moykaOkon/1moykaOkonDo"
    },
    "moykaOkon/1moykaOkonPosle": {
        "w": 3213,
        "h": 5712,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/moykaOkon/1moykaOkonPosle"
    },
    "moykaOkon/2moykaOkonDo": {
        "w": 4284,
        "h": 5712,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/moykaOkon/2moykaOkonDo"
    },
    "moykaOkon/2moykaOkonPosle": {
        "w": 4284,
        "h": 5712,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/moykaOkon/2moykaOkonPosle"
    },
    "moykaOkon/3moykaOkonDo": {
        "w": 4284,
        "h": 5712,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/moykaOkon/3moykaOkonDo"
    },
    "moykaOkon/3moykaOkonPosle": {
        "w": 4284,
        "h": 5712,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/moykaOkon/3moykaOkonPosle"
    },
    "moykaOkon/4moykaOkonDo": {
        "w": 4284,
        "h": 5712,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/moykaOkon/4moykaOkonDo"
    },
    "moykaOkon/4moykaOkonPosle": {
        "w": 4284,
        "h": 5712,
        "widths": [
            480,
            800,
            1200
        ],
        "fallbackWidth": 800,
        "base": "assets/img/moykaOkon/4moykaOkonPosle"
    },
    "strizhkaKustov/kustido1": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/strizhkaKustov/kustido1"
    },
    "strizhkaKustov/kustido2": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/strizhkaKustov/kustido2"
    },
    "strizhkaKustov/kustiposle1": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/strizhkaKustov/kustiposle1"
    },
    "strizhkaKustov/kustiposle2": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/strizhkaKustov/kustiposle2"
    },
    "thumbnail/ChistayaKvartira": {
        "w": 1672,
        "h": 940,
        "widths": [
            640,
            1280,
            1672
        ],
        "fallbackWidth": 1280,
        "base": "assets/img/thumbnail/ChistayaKvartira"
    },
    "thumbnail/ChistiyPodjezd": {
        "w": 1672,
        "h": 941,
        "widths": [
            640,
            1280,
            1672
        ],
        "fallbackWidth": 1280,
        "base": "assets/img/thumbnail/ChistiyPodjezd"
    },
    "thumbnail/pokostravi": {
        "w": 1672,
        "h": 941,
        "widths": [
            640,
            1280,
            1672
        ],
        "fallbackWidth": 1280,
        "base": "assets/img/thumbnail/pokostravi"
    },
    "thumbnail/uborkaterritory": {
        "w": 1672,
        "h": 941,
        "widths": [
            640,
            1280,
            1672
        ],
        "fallbackWidth": 1280,
        "base": "assets/img/thumbnail/uborkaterritory"
    },
    "uborkaTerritory/territory2do": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/uborkaTerritory/territory2do"
    },
    "uborkaTerritory/territory2posle": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/uborkaTerritory/territory2posle"
    },
    "uborkaTerritory/territorydo": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/uborkaTerritory/territorydo"
    },
    "uborkaTerritory/territoryposle": {
        "w": 640,
        "h": 854,
        "widths": [
            480,
            640
        ],
        "fallbackWidth": 640,
        "base": "assets/img/uborkaTerritory/territoryposle"
    }
};
/** Фото для слайдера на главном экране (папка photos/thumbnail), по порядку имён файлов. */
const HERO_IMAGES = ["thumbnail/ChistayaKvartira", "thumbnail/ChistiyPodjezd", "thumbnail/pokostravi", "thumbnail/uborkaterritory"];
