import {
    jsx,
    jsxFrag,
    Variable,
    getValue,
    sendApi
} from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';

const phoneCodes = [
    {
        code: 7,
        abbr: "ru",
        text: "Russia (Россия)"
    }, {
        code: 61,
        abbr: "au",
        text: "Australia (Australia)"
    }, {
        code: 43,
        abbr: "at",
        text: "Austria (Österreich)"
    },
    {
        code: 994,
        abbr: "az",
        text: "Azerbaijan (Azərbaycan)"
    },
    {
        code: 35818,
        abbr: "ax",
        text: "Åland Islands (Ahvenanmaa)"
    },
    {
        code: 355,
        abbr: "al",
        text: "Albania (Shqipëria)"
    },
    {
        code: 213,
        abbr: "dz",
        text: "Algeria (الجزائر)"
    },
    {
        code: 1264,
        abbr: "ai",
        text: "Anguilla (Anguilla)"
    },
    {
        code: 244,
        abbr: "ao",
        text: "Angola (Angola)"
    },
    {
        code: 376,
        abbr: "ad",
        text: "Andorra (Andorra)"
    },
    {
        code: 1268,
        abbr: "ag",
        text: "Antigua and Barbuda (Antigua and Barbuda)"
    },
    {
        code: 853,
        abbr: "mo",
        text: "aomyn (Macau)"
    },
    {
        code: 54,
        abbr: "ar",
        text: "Argentina (Argentina)"
    },
    {
        code: 374,
        abbr: "am",
        text: "Armenia (Հայաստան)"
    },
    {
        code: 297,
        abbr: "aw",
        text: "Aruba (Aruba)"
    },
    {
        code: 93,
        abbr: "af",
        text: "Afghanistan (افغانستان)"
    },
    {
        code: 1242,
        abbr: "bs",
        text: "Bahamas (The Bahamas)"
    },
    {
        code: 880,
        abbr: "bd",
        text: "Bangladesh (বাংলাদেশ)"
    },
    {
        code: 1246,
        abbr: "bb",
        text: "Barbados (Barbados)"
    },
    {
        code: 973,
        abbr: "bh",
        text: "Bahrain (البحرين)"
    },
    {
        code: 375,
        abbr: "by",
        text: "Belarus (Беларусь)"
    },
    {
        code: 501,
        abbr: "bz",
        text: "Belize (Belize)"
    },
    {
        code: 32,
        abbr: "be",
        text: "Belgium (Belgique)"
    },
    {
        code: 229,
        abbr: "bj",
        text: "Benin (Bénin)"
    },
    {
        code: 1441,
        abbr: "bm",
        text: "Bermuda (the Bermuda Islands)"
    },
    {
        code: 359,
        abbr: "bg",
        text: "Bulgaria (България)"
    },
    {
        code: 591,
        abbr: "bo",
        text: "Bolivia (Bolivia)"
    },
    {
        code: 599,
        abbr: "bq",
        text: "Bonaire, St. Eustatius, Saba (Bonaire, Sint Eustatius en Saba)"
    },
    {
        code: 387,
        abbr: "ba",
        text: "Bosnia (Bosna i Hercegovina)"
    },
    {
        code: 267,
        abbr: "bw",
        text: "Botswana (Botswana)"
    },
    {
        code: 55,
        abbr: "br",
        text: "Brazil (Brasil)"
    },
    {
        code: 246,
        abbr: "io",
        text: "British Indian Ocean Territory (British Indian Ocean Territory)"
    },
    {
        code: 1284,
        abbr: "vg",
        text: "British Virgin Islands (British Virgin Islands)"
    },
    {
        code: 673,
        abbr: "bn",
        text: "Brunei (Brunei)"
    },
    {
        code: 226,
        abbr: "bf",
        text: "Burkina Faso (Burkina Faso)"
    },
    {
        code: 257,
        abbr: "bi",
        text: "Burundi (Burundi)"
    },
    {
        code: 975,
        abbr: "bt",
        text: "Butane (འབྲུག་ཡུལ)"
    },
    {
        code: 678,
        abbr: "vu",
        text: "Vanatau (Vanuatu)"
    },
    {
        code: 379,
        abbr: "va",
        text: "Vatican (Civitas Vaticana)"
    },
    {
        code: 44,
        abbr: "gb",
        text: "Great Britain (United Kingdom)"
    },
    {
        code: 36,
        abbr: "hu",
        text: "Hungary (Magyarország)"
    },
    {
        code: 58,
        abbr: "ve",
        text: "Venezuela (Venezuela)"
    },
    {
        code: 1340,
        abbr: "vi",
        text: "United States Virgin Islands (United States Virgin Islands)"
    },
    {
        code: 1,
        abbr: "um",
        text: "British Virgin Islands (British Virgin Islands)"
    },
    {
        code: 670,
        abbr: "tl",
        text: "East Timor (Timor Lorosa’e)"
    },
    {
        code: 84,
        abbr: "vn",
        text: "Vietnam (Việt Nam)"
    },
    {
        code: 241,
        abbr: "ga",
        text: "Gabon (Gabon)"
    },
    {
        code: 509,
        abbr: "ht",
        text: "Haiti (Haïti)"
    },
    {
        code: 592,
        abbr: "gy",
        text: "Guyana (Guyana)"
    },
    {
        code: 220,
        abbr: "gm",
        text: "Gambia (The Gambia)"
    },
    {
        code: 233,
        abbr: "gh",
        text: "Ghana (Ghana)"
    },
    {
        code: 590,
        abbr: "gp",
        text: "Guadeloupe (Guadeloupe)"
    },
    {
        code: 502,
        abbr: "gt",
        text: "Guatemala (Guatemala)"
    },
    {
        code: 224,
        abbr: "gn",
        text: "Guinea (Guinée)"
    },
    {
        code: 245,
        abbr: "gw",
        text: "Guinea-Bissau (Guiné-Bissau)"
    },
    {
        code: 49,
        abbr: "de",
        text: "Germany (Deutschland)"
    },
    {
        code: 350,
        abbr: "gi",
        text: "Gibraltar (Gibraltar)"
    },
    {
        code: 504,
        abbr: "hn",
        text: "Honduras (Honduras)"
    },
    {
        code: 852,
        abbr: "hk",
        text: "Hong Kong (Hong Kong)"
    },
    {
        code: 1473,
        abbr: "gd",
        text: "Grenada (Grenada)"
    },
    {
        code: 299,
        abbr: "gl",
        text: "Greenland (Kalaallit Nunaat)"
    },
    {
        code: 30,
        abbr: "gr",
        text: "Greece (Ελλάδα)"
    },
    {
        code: 995,
        abbr: "ge",
        text: "Georgia (საქართველო)"
    },
    {
        code: 1671,
        abbr: "gu",
        text: "Guam (Guam)"
    },
    {
        code: 45,
        abbr: "dk",
        text: "Denmark (Danmark)"
    },
    {
        code: 243,
        abbr: "cd",
        text: "Democratic Republic of the Congo (Democratic Republic of the Congo)"
    },
    {
        code: 253,
        abbr: "dj",
        text: "Djibouti (جيبوتي)"
    },
    {
        code: 1767,
        abbr: "dm",
        text: "Dominican (Dominica)"
    },
    {
        code: 1809,
        abbr: "do",
        text: "Dominican Republic (República Dominicana)"
    },
    {
        code: 20,
        abbr: "eg",
        text: "Egypt (مصر)"
    },
    {
        code: 260,
        abbr: "zm",
        text: "Zambia (Zambia)"
    },
    {
        code: 263,
        abbr: "zw",
        text: "Zimbabwe (Zimbabwe)"
    },
    {
        code: 972,
        abbr: "il",
        text: "Israel (ישראל)"
    },
    {
        code: 91,
        abbr: "in",
        text: "India (हिंदुस्तान)"
    },
    {
        code: 62,
        abbr: "id",
        text: "Indonesia (Indonesia)"
    },
    {
        code: 962,
        abbr: "jo",
        text: "Jordan (الأردن)"
    },
    {
        code: 964,
        abbr: "iq",
        text: "Iraq (العراق)"
    },
    {
        code: 98,
        abbr: "ir",
        text: "Iran (ایران)"
    },
    {
        code: 353,
        abbr: "ie",
        text: "Ireland (Ireland)"
    },
    {
        code: 354,
        abbr: "is",
        text: "Iceland (Ísland)"
    },
    {
        code: 34,
        abbr: "es",
        text: "Spain (España)"
    },
    {
        code: 39,
        abbr: "it",
        text: "Italy (Italia)"
    },
    {
        code: 967,
        abbr: "ye",
        text: "Yeymen (اليمن)"
    },
    {
        code: 7,
        abbr: "kz",
        text: "Kazakhstan (Қазақстан)"
    },
    {
        code: 1345,
        abbr: "ky",
        text: "Cayman islands (Cayman islands)"
    },
    {
        code: 855,
        abbr: "kh",
        text: "Cambodia (កម្ពុជា)"
    },
    {
        code: 237,
        abbr: "cm",
        text: "Cameroon (Cameroun)"
    },
    {
        code: 1,
        abbr: "ca",
        text: "Canada (Canada)"
    },
    {
        code: 974,
        abbr: "qa",
        text: "Qatar (قطر)"
    },
    {
        code: 254,
        abbr: "ke",
        text: "Kenya (Kenya)"
    },
    {
        code: 357,
        abbr: "cy",
        text: "Cyprus (Κύπρος)"
    },
    {
        code: 996,
        abbr: "kg",
        text: "Kyrgyzstan (Кыргызстан)"
    },
    {
        code: 686,
        abbr: "ki",
        text: "Kiribati (Kiribati)"
    },
    {
        code: 86,
        abbr: "cn",
        text: "China (中国)"
    },
    {
        code: 61,
        abbr: "cc",
        text: "coconut islands (coconut islands)"
    },
    {
        code: 57,
        abbr: "co",
        text: "Colombia (Colombia)"
    },
    {
        code: 269,
        abbr: "km",
        text: "Comoros (Komori)"
    },
    {
        code: 242,
        abbr: "cg",
        text: "Republic of the Congo (Congo)"
    },
    {
        code: 850,
        abbr: "kp",
        text: "Republic of Korea (北朝鮮)"
    },
    {
        code: 506,
        abbr: "cr",
        text: "Costa Rica (Costa Rica)"
    },
    {
        code: 225,
        abbr: "ci",
        text: "Ivory Coast (Côte d’Ivoire)"
    },
    {
        code: 53,
        abbr: "cu",
        text: "Cuba (Cuba)"
    },
    {
        code: 965,
        abbr: "kw",
        text: "Kuwait (الكويت )"
    },
    {
        code: 599,
        abbr: "cw",
        text: "Curacao (Curaçao)"
    },
    {
        code: 856,
        abbr: "la",
        text: "Laos (ລາວ)"
    },
    {
        code: 371,
        abbr: "lw",
        text: "Latvia (Latvija)"
    },
    {
        code: 266,
        abbr: "ls",
        text: "Lesotho (Lesotho)"
    },
    {
        code: 231,
        abbr: "lr",
        text: "Liberia (Liberia)"
    },
    {
        code: 961,
        abbr: "lb",
        text: "Lebanon (Liban)"
    },
    {
        code: 218,
        abbr: "ly",
        text: "Libya (ليبيا)"
    },
    {
        code: 370,
        abbr: "lt",
        text: "Lithuania (Lietuva)"
    },
    {
        code: 423,
        abbr: "li",
        text: "Liechtenstein (Liechtenstein)"
    },
    {
        code: 352,
        abbr: "lu",
        text: "Luxembourg (Lëtzebuerg)"
    },
    {
        code: 230,
        abbr: "mu",
        text: "Mauritius (Mauritius)"
    },
    {
        code: 222,
        abbr: "mr",
        text: "Mauritania (Mauritania)"
    },
    {
        code: 261,
        abbr: "mg",
        text: "Madagascar (Madagascar)"
    },
    {
        code: 262,
        abbr: "yt",
        text: "Mayotte (Mayotte)"
    },
    {
        code: 389,
        abbr: "mk",
        text: "Macedonia (Македонија)"
    },
    {
        code: 265,
        abbr: "mw",
        text: "Malawi (Malawi)"
    },
    {
        code: 60,
        abbr: "my",
        text: "Malaysia (Malaysia)"
    },
    {
        code: 223,
        abbr: "ml",
        text: "Mali (Mali)"
    },
    {
        code: 960,
        abbr: "mv",
        text: "Maldives (Dhivehi Raajje)"
    },
    {
        code: 356,
        abbr: "mt",
        text: "Malta (Malta)"
    },
    {
        code: 212,
        abbr: "ma",
        text: "Morocco (المغرب)"
    },
    {
        code: 596,
        abbr: "mq",
        text: "Martinique (Martinique)"
    },
    {
        code: 692,
        abbr: "mh",
        text: "Marshall Islands (Marshall Islands)"
    },
    {
        code: 52,
        abbr: "mx",
        text: "Mexico (México)"
    },
    {
        code: 691,
        abbr: "fm",
        text: "micronesia (micronesia)"
    },
    {
        code: 258,
        abbr: "mz",
        text: "Mozambique (Moçambique)"
    },
    {
        code: 373,
        abbr: "md",
        text: "Moldova (Moldova)"
    },
    {
        code: 377,
        abbr: "mc",
        text: "Monaco (Monaco)"
    },
    {
        code: 976,
        abbr: "mn",
        text: "Mongolia (Монгол Улс)"
    },
    {
        code: 1664,
        abbr: "ms",
        text: "Montserrat (Montserrat)"
    },
    {
        code: 95,
        abbr: "mm",
        text: "Myanmar (မြန်မာ)"
    },
    {
        code: 264,
        abbr: "na",
        text: "Namibia (Namibia)"
    },
    {
        code: 674,
        abbr: "nr",
        text: "Nauru (Nauru)"
    },
    {
        code: 977,
        abbr: "np",
        text: "Nepal (नेपाल)"
    },
    {
        code: 227,
        abbr: "ne",
        text: "Niger (Niger)"
    },
    {
        code: 234,
        abbr: "ng",
        text: "Nigeria (Nigeria)"
    },
    {
        code: 31,
        abbr: "nl",
        text: "Netherlands (Nederland)"
    },
    {
        code: 505,
        abbr: "ni",
        text: "Nicaragua (Nicaragua)"
    },
    {
        code: 683,
        abbr: "nu",
        text: "Niue (Niue)"
    },
    {
        code: 64,
        abbr: "nz",
        text: "New Zealand (New Zealand)"
    },
    {
        code: 687,
        abbr: "nc",
        text: "New Caledonia (Nouvelle-Calédonie)"
    },
    {
        code: 47,
        abbr: "no",
        text: "Norway (Noreg)"
    },
    {
        code: 971,
        abbr: "ae",
        text: "United Arab Emirates (الإمارات العربيّة المتّحدة)"
    },
    {
        code: 968,
        abbr: "om",
        text: "Oman (عُمان)"
    },
    {
        code: 672,
        abbr: "nf",
        text: "Norfolk Island (Norfolk Island)"
    },
    {
        code: 61,
        abbr: "cx",
        text: "Christmas Island (Christmas Island)"
    },
    {
        code: 590,
        abbr: "bl",
        text: "Saint Bartholomew Island (Saint Bartholomew Island)"
    },
    {
        code: 590,
        abbr: "mf",
        text: "Saint Martin's Island (Saint Martin's Island)"
    },
    {
        code: 290,
        abbr: "sh",
        text: "Saint Helena (Saint Helena)"
    },
    {
        code: 238,
        abbr: "cv",
        text: "Cape Verde Island (Cape Verde Island)"
    },
    {
        code: 682,
        abbr: "ck",
        text: "Cook Islands (Cook Islands)"
    },
    {
        code: 1649,
        abbr: "tc",
        text: "Turks and Caicos Islands (Turks and Caicos Islands)"
    },
    {
        code: 681,
        abbr: "wf",
        text: "Wallis and Futuna Islands (Wallis and Futuna Islands)"
    },
    {
        code: 92,
        abbr: "pk",
        text: "Pakistan (پاکستان)"
    },
    {
        code: 680,
        abbr: "pw",
        text: "Palau (Palau)"
    },
    {
        code: 970,
        abbr: "ps",
        text: "Palestinian territories (Palestinian territories)"
    },
    {
        code: 507,
        abbr: "pa",
        text: "Panama (Panamá)"
    },
    {
        code: 675,
        abbr: "pg",
        text: "Papua New Guinea (Papua New Guinea)"
    },
    {
        code: 595,
        abbr: "py",
        text: "Paraguay (Paraguay)"
    },
    {
        code: 51,
        abbr: "pe",
        text: "Peru (Perú)"
    },
    {
        code: 870,
        abbr: "pn",
        text: "Pitcairn (Pitcairn)"
    },
    {
        code: 48,
        abbr: "pl",
        text: "Poland (Polska)"
    },
    {
        code: 351,
        abbr: "pt",
        text: "Portugal (Portugal)"
    },
    {
        code: 1787,
        abbr: "pr",
        text: "Puerto Rico (Puerto Rico)"
    },
    {
        code: 82,
        abbr: "kr",
        text: "Korea (Korea)"
    },
    {
        code: 262,
        abbr: "re",
        text: "reunion (Réunion)"
    },
    {
        code: 250,
        abbr: "rw",
        text: "Rwanda (Rwanda)"
    },
    {
        code: 40,
        abbr: "ro",
        text: "Romania (România)"
    },
    {
        code: 503,
        abbr: "sv",
        text: "Salvador (El Salvador)"
    },
    {
        code: 685,
        abbr: "ws",
        text: "Samoa (Samoa)"
    },
    {
        code: 378,
        abbr: "sm",
        text: "San Marino (San Marino)"
    },
    {
        code: 239,
        abbr: "st",
        text: "Sao Tome and Principe (São Tomé and Príncipe)"
    },
    {
        code: 966,
        abbr: "sa",
        text: "Saudi Arabia (العربية السعودية)"
    },
    {
        code: 268,
        abbr: "sz",
        text: "Swaziland (Swaziland)"
    },
    {
        code: 1670,
        abbr: "mp",
        text: "Northern Mariana Islands (Northern Mariana Islands)"
    },
    {
        code: 248,
        abbr: "sc",
        text: "Seychelles (Seychelles)"
    },
    {
        code: 508,
        abbr: "pm",
        text: "Saint Pierre and Miquelon (Saint-Pierre et Miquelon)"
    },
    {
        code: 221,
        abbr: "sn",
        text: "Senegal (Sénégal)"
    },
    {
        code: 1784,
        abbr: "vc",
        text: "Saint Vincent and the Grenadines (Saint Vincent and the Grenadines)"
    },
    {
        code: 1869,
        abbr: "kn",
        text: "Saint Kitts and Nevis (Saint Kitts and Nevis)"
    },
    {
        code: 1758,
        abbr: "lc",
        text: "Saint Lucia (Saint Lucia)"
    },
    {
        code: 381,
        abbr: "rs",
        text: "Serbia (Србија)"
    },
    {
        code: 65,
        abbr: "sg",
        text: "Singapore (Singapore)"
    },
    {
        code: 599,
        abbr: "sx",
        text: "Sint Maarten (Sint Maarten)"
    },
    {
        code: 963,
        abbr: "sy",
        text: "Syrian Arab Republic (سورية)"
    },
    {
        code: 421,
        abbr: "sk",
        text: "Slovakia (Slovensko)"
    },
    {
        code: 386,
        abbr: "si",
        text: "Slovenia (Slovenija)"
    },
    {
        code: 1,
        abbr: "us",
        text: "United States (United States)"
    },
    {
        code: 677,
        abbr: "sb",
        text: "Solomon Islands (Solomon Islands)"
    },
    {
        code: 252,
        abbr: "so",
        text: "Somalia (Soomaaliya)"
    },
    {
        code: 249,
        abbr: "sd",
        text: "Sudan (السودان)"
    },
    {
        code: 597,
        abbr: "sr",
        text: "Suriname (Suriname)"
    },
    {
        code: 232,
        abbr: "sl",
        text: "Sierra Leone (Sierra Leone)"
    },
    {
        code: 992,
        abbr: "tj",
        text: "Tajikistan (Тоҷикистон)"
    },
    {
        code: 66,
        abbr: "th",
        text: "Thailand (เมืองไทย)"
    },
    {
        code: 886,
        abbr: "tw",
        text: "Taiwan (臺灣)"
    },
    {
        code: 255,
        abbr: "tz",
        text: "Tanzania (Tanzania)"
    },
    {
        code: 228,
        abbr: "tg",
        text: "Togo (Togo)"
    },
    {
        code: 690,
        abbr: "tk",
        text: "Tokelau (Tokelau)"
    },
    {
        code: 676,
        abbr: "to",
        text: "Tonga (Tonga)"
    },
    {
        code: 1868,
        abbr: "tt",
        text: "Trinidad and Tobago (Trinidad and Tobago)"
    },
    {
        code: 688,
        abbr: "tv",
        text: "Tuvalu (Tuvalu)"
    },
    {
        code: 216,
        abbr: "tn",
        text: "Tunisia (تونس)"
    },
    {
        code: 993,
        abbr: "tm",
        text: "Turkmenistan (Türkmenistan)"
    },
    {
        code: 90,
        abbr: "tr",
        text: "Turkey (Türkiye)"
    },
    {
        code: 256,
        abbr: "ug",
        text: "Uganda (Uganda)"
    },
    {
        code: 998,
        abbr: "uz",
        text: "Uzbekistan (O’zbekiston)"
    },
    {
        code: 380,
        abbr: "ua",
        text: "Ukraine (Україна)"
    },
    {
        code: 598,
        abbr: "uy",
        text: "Uruguay (Uruguay)"
    },
    {
        code: 298,
        abbr: "fo",
        text: "Faroe islands (Føroyar)"
    },
    {
        code: 679,
        abbr: "fj",
        text: "Fiji (Fiji)"
    },
    {
        code: 63,
        abbr: "ph",
        text: "Philippines (Philippines)"
    },
    {
        code: 358,
        abbr: "fi",
        text: "Finland (Finland)"
    },
    {
        code: 500,
        abbr: "fk",
        text: "Falkland Islands (Falkland Islands)"
    },
    {
        code: 33,
        abbr: "fr",
        text: "France (France)"
    },
    {
        code: 594,
        abbr: "gf",
        text: "Guyane France (Guyane Française)"
    },
    {
        code: 689,
        abbr: "pf",
        text: "French polynesia (Polynésie française)"
    },
    {
        code: 385,
        abbr: "hr",
        text: "Croatia (Hrvatska)"
    },
    {
        code: 236,
        abbr: "cf",
        text: "Central African Republic (République Centrafricaine)"
    },
    {
        code: 235,
        abbr: "td",
        text: "Republic of CHAD (Tchad)"
    },
    {
        code: 382,
        abbr: "me",
        text: "Montenegro (Crna Gora)"
    },
    {
        code: 420,
        abbr: "cz",
        text: "Czech (Česko)"
    },
    {
        code: 56,
        abbr: "cl",
        text: "Chile (Chile)"
    },
    {
        code: 41,
        abbr: "ch",
        text: "Switzerland (Schweiz)"
    },
    {
        code: 46,
        abbr: "se",
        text: "Sweden (Sverige)"
    },
    {
        code: 94,
        abbr: "lk",
        text: "Sri Lanka (ලංකාව)"
    },
    {
        code: 593,
        abbr: "ec",
        text: "Ecuador (Ecuador)"
    },
    {
        code: 240,
        abbr: "gq",
        text: "Equatorial Guinea (Guinea Ecuatorial)"
    },
    {
        code: 291,
        abbr: "er",
        text: "Eritrea (إرتريا)"
    },
    {
        code: 372,
        abbr: "ee",
        text: "Estonia (Eesti)"
    },
    {
        code: 251,
        abbr: "et",
        text: "Ethiopia (ኢትዮጵያ)"
    },
    {
        code: 27,
        abbr: "za",
        text: "Republic of South Africa (South Africa)"
    },
    {
        code: 211,
        abbr: "ss",
        text: "South Sudan (South Sudan)"
    },
    {
        code: 1876,
        abbr: "jm",
        text: "Jamaica (Jamaica)"
    },
    {
        code: 81,
        abbr: "jp",
        text: "Japan (日本)"
    }
];

const PhoneCode = function ({ lang, changeCode, abbr, codeTitle, ID }) {
    // console.log('=bbd92f=', { lang, changeCode, abbr, codeTitle, ID })

    return (
        <div class="country-phone2">
            <div class="country-phone-selector2">
                <div class="country-phone-selected2" onClick={(e) => { changeCode(e) }}>
                    <span>
                        +{codeTitle}
                        <img src={images.blank} class={`flag flag-${abbr}`} />
                    </span>
                </div>
                <div class="country-phone-options2" style={getValue(ID, "showPhoneSelect") ? "display:block" : "display : none"}>
                    <input type="text" class="country-phone-search2" value="" />
                    <label class="country-phone-search-label2" style="display: none;">Введите страну</label>
                    <ul>
                        {
                            phoneCodes.map(function (item) {
                                return (
                                    <li data-phone={item.code} data-co={item.abbr} class="country-phone-option2" onClick={(e) => changeCode(e, item)}>
                                        <span>
                                            +{item.code}
                                            <img src="/assets/image/blank.gif" class={`flag flag-${item.abbr}`} />
                                        </span>
                                        {item.text}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export { PhoneCode };