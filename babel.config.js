export default {
    "presets": [
        ["@babel/preset-env"],
        ["@babel/preset-react",
        {
            "pragma": "jsx",
            "pragmaFrag": "jsxFrag",
            "throwIfNamespace": false
        }]
    ],
    "plugins":[
        ["module-resolver",
        {
            "alias": {
            "@src": "./src",
            "@assets": "./src/assets",
            "@component": "./src/component",
            "@navigation": "./src/router/navigation"
            }
        }
        ]
    ]

}