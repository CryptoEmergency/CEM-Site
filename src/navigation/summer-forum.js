import {
    jsx,
    jsxFrag,
    sendApi,
    Variable,
    init,
    initReload,
    Helpers
} from "@betarost/cemserver/cem.js";


import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Swiper from 'swiper/bundle';

import { fn } from "@src/functions/index.js";




import 'swiper/css/bundle';


const start = function (data, ID) {
    let showAllCompanies = false
    Variable.Static.forumHeaderShow = true

    const swiperGo = function (numIndex) {
        // if (!swiperitem) {
        let swiperitem1 = new Swiper("#summer_forum", {
            direction: "horizontal",
            loop: true,
            autoplay: {
                delay: 2000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: false,
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
            breakpoints: {
                // 100: {
                //     slidesPerView: 1,
                //     spaceBetween: 0,
                // },
                // 768: {
                //     slidesPerView: 1,
                //     spaceBetween: 0,
                // },
                // 980: {
                //     slidesPerView: 2,
                //     spaceBetween: 40,
                // },
                // 1240: {
                //     slidesPerView: 3,
                //     spaceBetween: 30,
                // },
                320: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
        // }
    }

    const swiperTwo = function (numIndex) {
        // if (!swiperitem) {
        let swiperitem2 = new Swiper(".swiper-two", {
            effect: "creative",
            grabCursor: true,
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination-two',
            },
            scrollbar: {
                el: '.swiper-scrollbar-two',
            },
            slidesPerView: 1,
            spaceBetween: 20
        });
        // }
    }

    const ShowAllCompany = function () {
        showAllCompanies = true
        initReload()
    }

    init(
        async () => {
            // console.log('=bbcdd5=', Variable)
        },
        () => {

            var map;

            setTimeout(function () {
                DG.then(function () {
                    map = DG.map('map', {
                        center: [44.712398, 37.784382],
                        zoom: 16,
                        // dragging: false,
                        touchZoom: false,
                        scrollWheelZoom: false,
                        doubleClickZoom: false,
                        boxZoom: false,
                        geoclicker: false,
                        zoomControl: false,
                        fullscreenControl: false
                    });

                    DG.marker([44.712398, 37.784382]).addTo(map).bindPopup(`
                        <div class="connect "></div>
                        <a style="cursor: default" class="c-logo c-menu__link"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zOS42IDcuNjI3VjguNzJsLTQuNTA3IDEuMDY3LS42MTMuMTMzLjEzMy42MTMgMi4yMTQgOS40MTQtOS44OTQgMi4zMi0uNjEzLjEzMy4xNi42MTMgMi40OCAxMC42NC4xNi42MTQuNTg3LS4xMzQgOS44OTMtMi4zMnY5LjEySDIzLjI1M1Y3LjYyN0gzOS42WiIgZmlsbD0iIzI4NENDQiIvPjxwYXRoIGQ9Im00Ni40IDcuNzYgMi4zNDcgMTAuMDUzIDEwLjQ4LTIuNDUzTDYxLjcwNyAyNmwtMTAuNDggMi40NTMgMi4zNDYgMTAuMDI3LTExLjEyIDIuNTg3LTIuMzQ2LTEwLjAyNy0xMC40OCAyLjQ1My0yLjQ4LTEwLjY0IDEwLjQ4LTIuNDUzLTIuMzQ3LTEwLjAyN0w0Ni40IDcuNzZaIiBmaWxsPSIjQzEyNkNFIi8+PHBhdGggZD0iTTcyLjQ4IDM5Ljc4N2ExMS40NCAxMS40NCAwIDAgMS0yLjUzMy0uOTA3Yy0uOC0uNC0xLjUyLS44OC0yLjE4Ny0xLjQ5M2E5LjcxMiA5LjcxMiAwIDAgMS0xLjcwNy0yLjA1NCA5LjY2NCA5LjY2NCAwIDAgMS0xLjEyLTIuNjEzYy0uMjY2LS45ODctLjQtMi4wNTMtLjQtMy4xNzMgMC0uOTg3LjEwNy0xLjkyLjMyLTIuODI3LjIxNC0uOTA3LjUzNC0xLjc2LjkzNC0yLjUzMy40LS44LjkwNi0xLjUyIDEuNTQ2LTIuMTYuNjQtLjY0IDEuMzM0LTEuMiAyLjEwNy0xLjY1NGE5LjYxNCA5LjYxNCAwIDAgMSAyLjY2Ny0xLjA2NiAxMy42MSAxMy42MSAwIDAgMSAzLjE3My0uMzc0YzEuNDkzIDAgMi45ODcuMzIgNC41MDcuOTg3IDEuNDkzLjY2NyAyLjggMS42NTMgMy44OTMgMi45ODdsLTQuMDI3IDMuNDY2YTcuMTUyIDcuMTUyIDAgMCAwLS44LS43NDYgNy4wNjggNy4wNjggMCAwIDAtLjk4Ni0uNjY3IDQuNTczIDQuNTczIDAgMCAwLTEuMjI3LS41MDdjLS40NTMtLjEwNi0uOTA3LS4xODYtMS4zNi0uMTg2LS41MDcgMC0xLjAxMy4wOC0xLjQ5My4yMTMtLjQ4LjEzMy0uOTM0LjM0Ny0xLjM2LjY2N2E0LjYyIDQuNjIgMCAwIDAtMS4wOTQgMS4wNjZjLS4yOTMuNC0uNTYuOTA3LS43NDYgMS40OTQtLjE4Ny41ODYtLjI2NyAxLjItLjI2NyAxLjg5MyAwIC42OTMuMTA3IDEuMzYuMzQ3IDIgLjI0LjY0LjUzMyAxLjIuOTYgMS42OC40MjYuNDguOTMzLjg1MyAxLjU3MyAxLjE0Ny42NC4yOTMgMS4zMzMuNDI2IDIuMDguNDI2LjggMCAxLjYtLjE4NiAyLjQtLjU4NmE1LjYgNS42IDAgMCAwIDEuOTczLTEuNTJsNC4wMjcgMy40NjZjLS45NiAxLjE3NC0yLjE2IDIuMTA3LTMuNiAyLjg1NC0xLjQ0Ljc0Ni0zLjA0IDEuMDkzLTQuOCAxLjA5My0uOTg3LS4wNTMtMS44OTMtLjE2LTIuOC0uMzczWk05My44MTMgMjUuMjh2NS41NDdjLS4yOTMtLjAyNy0uNjQtLjAyNy0xLjA5My0uMDI3LS45NiAwLTEuNzA3LjI0LTIuMTg3Ljc0Ny0uNDguNTA2LS43NDYgMS4xNzMtLjc0NiAyLjAyNnY2LjIxNGgtNS4xNzRWMjUuNmg1LjE3NHYxLjk0N2guMDUzYy41MDctLjcyIDEuMDkzLTEuMjggMS43ODctMS42NTQuNjkzLS4zNzMgMS40MTMtLjU4NiAyLjE4Ni0uNTg2di0uMDI3WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDguOTA3IDI1LjYgMTAxLjYgNDUuNTQ3aC01LjA0bDIuNC02Ljc3NEw5My41NDcgMjUuNmg1LjMzM2wyLjQgNi43MmguMDUzbDIuMjY3LTYuNzJoNS4zMDdaTTEyMC4yNCAyNS41NDdjLjUzMy4xNiAxLjA2Ny40IDEuNTIuNjkzLjQ1My4yOTMuODguNjY3IDEuMjUzIDEuMTJhNy4yNjMgNy4yNjMgMCAwIDEgMS41NzQgMy4yOGMuMTMzLjY2Ny4yMTMgMS4zMzMuMjEzIDIuMDUzIDAgMS40NC0uMjY3IDIuNzItLjgyNyAzLjg2Ny0uNTYgMS4xNDctMS4zMzMgMi0yLjM0NiAyLjYxMy0xLjAxNC42MTQtMi4xMzQuOTM0LTMuNDQuOTM0LTEuNDY3IDAtMi42NC0uNTA3LTMuNTItMS41MnY2Ljk2aC01LjE3NFYyNS42aDUuMnYxLjQ0aC4wNTRjLjk4Ni0xLjE0NyAyLjI2Ni0xLjczMyAzLjgxMy0xLjczMy41Ni0uMDI3IDEuMTIuMDggMS42OC4yNFptLTEuMzMzIDkuMjI2Yy40OC0uNTMzLjcyLTEuMjI2LjcyLTIuMDggMC0uODUzLS4yNC0xLjUyLS43Mi0yLjA1My0uNDgtLjUzMy0xLjA2Ny0uOC0xLjgxNC0uOC0uNzczIDAtMS4zODYuMjY3LTEuODkzLjgtLjUwNy41MzMtLjc0NyAxLjIyNy0uNzQ3IDIuMDUzIDAgLjg1NC4yNCAxLjU0Ny43NDcgMi4wOC40OC41MzQgMS4xMi43NzQgMS44OTMuNzc0LjcyLjAyNiAxLjMzNC0uMjQgMS44MTQtLjc3NFpNMTI5LjA5MyAzOS44MTNhMy42OSAzLjY5IDAgMCAxLTEuMzMzLS44NTMgMy45NDUgMy45NDUgMCAwIDEtLjkwNy0xLjQ5M2MtLjIxMy0uNjE0LS4zMi0xLjMwNy0uMzItMi4xMDd2LTUuNjI3aC0xLjU0NlYyNS42aDEuNTQ2di00LjQ4bDUuMTc0LS41MzNWMjUuNmgzLjA5M3Y0LjEwN2gtMy4wOTN2NC41MDZjMCAuMTg3IDAgLjM3NC4wMjYuNTA3LjAyNy4xNi4wNTQuMjkzLjEwNy40NTNhLjYzLjYzIDAgMCAwIC4yOTMuMzQ3Yy4xMzQuMDguMjk0LjEzMy41MDcuMTMzLjM3MyAwIC43Mi0uMDggMS4wNC0uMjRsMS4yNTMgMy42YTcuNzI1IDcuNzI1IDAgMCAxLTEuODQuNzc0Yy0uNjEzLjE4Ni0xLjM4Ni4yNjYtMi4zMi4yNjZhMy44NDMgMy44NDMgMCAwIDEtMS42OC0uMjRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTYuMDggNDMuMjhoMTR2NS4wNGgtOC41MzN2My4xNzNoNi42OTNWNTYuNGgtNi43MnYyLjk2aDkuMTczdjUuMDEzSDYuMDhWNDMuMjhaTTQ1LjQxMyA1NS44Njd2OC41MDZoLTUuMjh2LTcuMzA2YzAtLjI0IDAtLjQ1NC0uMDI2LS42NC0uMDI3LS4xODctLjAyNy0uNC0uMDgtLjU4N2EzLjExNSAzLjExNSAwIDAgMC0uMTM0LS41MzNjLS4wNTMtLjE2LS4xMzMtLjI5NC0uMjEzLS40NTRhLjkyLjkyIDAgMCAwLS4zMi0uMzIgMi4xMjQgMi4xMjQgMCAwIDAtLjQyNy0uMjEzIDEuNzIgMS43MiAwIDAgMC0uNTMzLS4wOGMtLjU2IDAtMS4wNC4yNC0xLjM4Ny43Mi0uMzQ2LjQ4LS41MzMgMS4xNzMtLjUzMyAyLjEzM1Y2NC40aC01LjMwN3YtNy4zMzNhNy4xMiA3LjEyIDAgMCAwLS4wOC0xLjEyIDMuMDc3IDMuMDc3IDAgMCAwLS4yNjYtLjg4IDEuNTE1IDEuNTE1IDAgMCAwLS41MzQtLjYxNGMtLjIxMy0uMTMzLS41MzMtLjIxMy0uODUzLS4yMTMtLjYxMyAwLTEuMDkzLjI0LTEuNDY3LjcyLS4zNzMuNDgtLjU2IDEuMTczLS41NiAyLjEzM1Y2NC40SDIyLjA4VjQ5Ljg2N2g1LjMwN3YxLjY1M2guMDI2YTUuMzk4IDUuMzk4IDAgMCAxIDEuNzYtMS40NjcgNC45MjEgNC45MjEgMCAwIDEgMi4xMzQtLjUwNmMxLjkyIDAgMy4zMzMuNjkzIDQuMTYgMi4wNTNoLjA1M2MxLjE0Ny0xLjM2IDIuNzItMi4wNTMgNC42OTMtMi4wNTMgMy40NjcgMCA1LjIgMi4xMDYgNS4yIDYuMzJaTTYxLjE0NyA1OC40aC05LjUyYy4xMDYuNjY3LjQ1MyAxLjIuOTg2IDEuNTQ3LjUzNC4zNDYgMS4yMjcuNTMzIDIuMDI3LjUzMyAxLjIgMCAyLjMyLS41MzMgMy4zNi0xLjZsMi43NDcgMy4wMTNjLS42NjcuODI3LTEuNTc0IDEuNDk0LTIuNzIgMi0xLjE0Ny41MDctMi40NTQuNzc0LTMuOTQ3Ljc3NC0xLjQ0IDAtMi43NDctLjMyLTMuODkzLS45Ni0xLjE0Ny0uNjQtMi4wOC0xLjUyLTIuNzItMi42OTQtLjY2Ny0xLjE3My0uOTg3LTIuNDgtLjk4Ny0zLjk0NiAwLTEuNDQuMzItMi43NDcuOTYtMy44OTRhNi44ODQgNi44ODQgMCAwIDEgMi42OTMtMi42OTNjMS4xNDctLjY0IDIuNDU0LS45NiAzLjg5NC0uOTYgMS4wNCAwIDIgLjE4NyAyLjkwNi41Ni45MDcuMzczIDEuNjguODggMi4zMiAxLjUyLjY0LjY0IDEuMTQ3IDEuNDQgMS41MiAyLjM3My4zNzQuOTM0LjU2IDEuOTIuNTYgMy4wMTQtLjA1My41Ni0uMTA2IDEuMDQtLjE4NiAxLjQxM1ptLTguNzItNC4zMmMtLjQyNy4zNDctLjY5NC44MjctLjggMS40NGg0LjUwNmEyLjYwNiAyLjYwNiAwIDAgMC0uMjkzLS44IDIuMjI4IDIuMjI4IDAgMCAwLS40OC0uNjEzYy0uMTg3LS4xNi0uNC0uMjk0LS42NC0uMzc0YTIuNTE0IDIuNTE0IDAgMCAwLS44LS4xMzNjLS41Ni0uMDI3LTEuMDY3LjE2LTEuNDkzLjQ4Wk03MS44NjcgNDkuNTQ3VjU1LjJjLS4yOTQtLjAyNy0uNjY3LS4wMjctMS4xMi0uMDI3LS45ODcgMC0xLjczNC4yNjctMi4yNC43NzQtLjUwNy41MDYtLjc3NCAxLjItLjc3NCAyLjA4djYuMzQ2aC01LjMwNlY0OS44NGg1LjMwNnYxLjk3M2guMDU0YTUuNSA1LjUgMCAwIDEgMS44MTMtMS43MDZjLjY5My0uNCAxLjQ0LS41ODcgMi4yNC0uNTg3aC4wMjd2LjAyN1pNODcuNDEzIDQ5Ljg0djEyLjQyN2MwIDEuMDEzLS4wOCAxLjkyLS4yNCAyLjc0NmE3LjIwNSA3LjIwNSAwIDAgMS0uODI2IDIuMjY3Yy0uNC42OTMtLjg4IDEuMjgtMS40OTQgMS43Ni0uNjEzLjQ4LTEuMzYuODUzLTIuMjkzIDEuMTItLjkzMy4yNjctMS45NzMuNC0zLjE3My40LTEuMjU0IDAtMi4zNDctLjEwNy0zLjI1NC0uMjkzYTEwLjEyIDEwLjEyIDAgMCAxLTIuNzczLTEuMDRsMS4xNzMtNC4xNmMuNTM0LjMyIDEuMTc0LjYxMyAxLjk3NC44MjYuOC4yNCAxLjU0Ni4zNDcgMi4yMTMuMzQ3IDEuMTIgMCAyLS4yMTMgMi42MTMtLjY2Ny42MTQtLjQ1My45MzQtMS4wMTMuOTM0LTEuNjh2LTEuMzA2aC0uMDU0Yy0uOTMzIDEuMDEzLTIuMjEzIDEuNTItMy44NCAxLjUyYTYuNCA2LjQgMCAwIDEtMy4zODYtLjkzNGMtMS4wMTQtLjYxMy0xLjc2LTEuNDY2LTIuMzItMi41Ni0uNTM0LTEuMDY2LS44MjctMi4yOTMtLjgyNy0zLjYyNiAwLTEuMDY3LjE2LTIuMDU0LjQ4LTIuOTg3YTcuODAyIDcuODAyIDAgMCAxIDEuMzA3LTIuMzczYy41MzMtLjY2NyAxLjItMS4xNDcgMS45NzMtMS41MmE1LjYgNS42IDAgMCAxIDIuNDUzLS41NmMxLjYyNyAwIDIuOTYuNTYgMy45NzQgMS43MzNoLjA1M3YtMS40MTNsNS4zMzMtLjAyN1ptLTUuNzg2IDguODUzYy40OC0uNDguNzItMS4wOTMuNzItMS44NjYgMC0uNzQ3LS4yNC0xLjM2LS43NDctMS44NjdhMi41MTYgMi41MTYgMCAwIDAtMS44MTMtLjcyYy0uNzIgMC0xLjMzNC4yNC0xLjg0LjcyLS41MDcuNDgtLjc0NyAxLjEyLS43NDcgMS44NjcgMCAuNzczLjI0IDEuMzg2Ljc0NyAxLjg2Ni41MDYuNDggMS4wOTMuNzIgMS44NC43Mi43NDYgMCAxLjMzMy0uMjQgMS44NC0uNzJaTTEwMy4yNTMgNTguNGgtOS41MmMuMTA3LjY2Ny40NTQgMS4yLjk4NyAxLjU0Ny41MzMuMzQ2IDEuMjI3LjUzMyAyLjAyNy41MzMgMS4yIDAgMi4zMi0uNTMzIDMuMzMzLTEuNmwyLjc0NyAzLjAxM2MtLjY2Ny44MjctMS41NzQgMS40OTQtMi43MiAyLTEuMTQ3LjUwNy0yLjQ1NC43NzQtMy45NDcuNzc0LTEuNDQgMC0yLjc0Ny0uMzItMy44OTMtLjk2LTEuMTQ3LS42NC0yLjA4LTEuNTItMi43Mi0yLjY5NC0uNjY3LTEuMTczLS45ODctMi40OC0uOTg3LTMuOTQ2IDAtMS40NC4zMi0yLjc0Ny45Ni0zLjg5NGE2Ljg4NCA2Ljg4NCAwIDAgMSAyLjY5My0yLjY5M2MxLjE0Ny0uNjQgMi40NTQtLjk2IDMuODk0LS45NiAxLjA0IDAgMiAuMTg3IDIuOTA2LjU2YTcuMDEgNy4wMSAwIDAgMSAyLjMyIDEuNTJjLjY0LjY0IDEuMTQ3IDEuNDQgMS41MiAyLjM3My4zNzQuOTM0LjU2IDEuOTIuNTYgMy4wMTQtLjAyNi41Ni0uMDggMS4wNC0uMTYgMS40MTNabS04LjcyLTQuMzJjLS40MjYuMzQ3LS42OTMuODI3LS44IDEuNDRoNC41MzRhMi42MDYgMi42MDYgMCAwIDAtLjI5NC0uOCAyLjIyOCAyLjIyOCAwIDAgMC0uNDgtLjYxM2MtLjE4Ni0uMTYtLjQtLjI5NC0uNjQtLjM3NGEyLjUxNCAyLjUxNCAwIDAgMC0uOC0uMTMzIDIuMzA2IDIuMzA2IDAgMCAwLTEuNTIuNDhaTTExNS40MTMgNDkuNjUzYy40MjcuMDguODU0LjIxNCAxLjIyNy40LjQuMTg3Ljc0Ny40MjcgMS4wNC43NDcuMjkzLjMyLjU2LjY5My43NzMgMS4xMi4yMTQuNDI3LjQuOTYuNTA3IDEuNTczLjEwNy42MTQuMTYgMS4zMDcuMTYgMi4wOHY4LjhoLTUuMzA3di03LjUyYzAtLjY2Ni0uMDgtMS4yLS4yMTMtMS42LS4xMzMtLjQtLjM0Ny0uNjQtLjYxMy0uOC0uMjY3LS4xNi0uNjE0LS4yMTMtMS4wNjctLjIxMy0uNjY3IDAtMS4xNzMuMjQtMS41NDcuNjkzLS4zNzMuNDgtLjU2IDEuMTc0LS41NiAyLjEzNHY3LjMwNmgtNS4yOFY0OS44NGg1LjMwN3YxLjZoLjAyN2MuNTMzLS42MTMgMS4xNDYtMS4wOTMgMS44NjYtMS40MTMuNzItLjMyIDEuNDY3LS40OCAyLjI2Ny0uNDguNTA3IDAgLjk2LjAyNiAxLjQxMy4xMDZaTTEyMy45MiA2My43MzNjLTEuMTczLS42NC0yLjA4LTEuNTItMi43Mi0yLjY5My0uNjY3LTEuMTQ3LS45ODctMi40NTMtLjk4Ny0zLjk0NyAwLTEuNDY2LjM0Ny0yLjggMS4wMTQtMy45NDZhNi44ODYgNi44ODYgMCAwIDEgMi44MjYtMi42OTRjMS4yMjctLjY0IDIuNTg3LS45NiA0LjEzNC0uOTYgMS4yNTMgMCAyLjQyNi4yNjcgMy41NzMuNzc0YTcuMDYxIDcuMDYxIDAgMCAxIDIuNzczIDIuMjEzbC0zLjUyIDIuOTg3Yy0uNzQ2LS44OC0xLjYyNi0xLjMwNy0yLjY5My0xLjMwNy0uODI3IDAtMS40OTMuMjY3LTIgLjgtLjUwNy41MzMtLjc3MyAxLjItLjc3MyAyLjA1MyAwIC44NTQuMjY2IDEuNTQ3LjggMi4wOC41MzMuNTM0IDEuMi44IDIuMDI2LjggMS4wNjcgMCAxLjk0Ny0uNCAyLjYxNC0xLjE3M2wzLjYgMy4xNDdjLS42NjcuODI2LTEuNTc0IDEuNDkzLTIuNzQ3IDItMS4xNzMuNTA2LTIuNTA3Ljc3My00LjAyNy43NzMtMS40NC4wMjctMi43NDYtLjI5My0zLjg5My0uOTA3Wk0xNDkuODY3IDQ5Ljg0bC03LjQ2NyAyMC40aC01LjE0N2wyLjQ1NC02LjkzMy01LjU3NC0xMy40NjdoNS40NjdsMi40NTMgNi44OGguMDU0bDIuMzItNi44OGg1LjQ0WiIgZmlsbD0iI0MxMjZDRSIvPjwvc3ZnPg=="></a>
                    `);
                });
            }, 2000)

            return (
                <div class='c-main__body с-summerforum'>
                    <div class="page-content page-content--full">
                        <section class="c-aboutforum" id="about">
                            {/* <h4 class="с-summerforum__title c-aboutforum__title">О форуме</h4> */}
                            <div class="c-container">
                                <div class="c-aboutforum__cover">
                                    <figure class="c-aboutforum__logo">
                                        <img src={images["summer_forum/logo"]} />
                                    </figure>
                                    <div class="c-aboutforum__caption">
                                        <h2 class="">Ежегодный криптовалютный форум</h2>
                                        <span class="">
                                            3-4 июня
                                            <br />
                                            г. Новороссийск
                                        </span>
                                        <a href="#" class="c-button c-button--gradient2">
                                            <span class="c-button__text">{Variable.lang.button.buyTicket}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="c-aboutforum__text c-container">
                                <p>
                                    Команда <b>Crypto Emergency</b> приглашает Вас на второй ежегодный форум Crypto Юг 2023  в качестве спонсора.
                                </p>
                                <p>
                                    <b>Crypto Юг 2023</b> это самый крупный форум в сфере криптовалют на Юге России, который состоится 3 - 4 июня в г. Новороссийске.
                                </p>
                                <p>
                                    Наш форум привлекает разнообразную аудиторию инвесторов, трейдеров, энтузиастов и профессионалов из разных ниш. Как спонсор, у Вас будет возможность продемонстрировать свои материалы заинтересованной аудитории, повысив свой авторитет и узнаваемость в индустрии.
                                </p>

                                <a href="#" class="c-button c-button--gradient2">
                                    <span class="c-button__text">Купить билет</span>
                                </a>

                                <div class="swiper-container">
                                    <div id="summer_forum" class="swiper swiper-post_media" After={() => swiperGo()}>
                                        <div class="swiper-wrapper">
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="/*height: 218px;*/ border-radius: 13px" src={images['summer_forum/slide_about']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="/*height: 218px;*/ border-radius: 13px" src={images['summer_forum/slide_about']} />
                                                </div>
                                            </a>
                                            <a class="swiper-slide">
                                                <div class="swiper-post_media_image_container">
                                                    <img style="/*height: 218px;*/ border-radius: 13px" src={images['summer_forum/slide_about']} />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="swiper-button-prev">
                                            <img src={svg["summer_forum/slider_arrow"]} />
                                        </div>
                                        <div class="swiper-button-next">
                                            <img src={svg["summer_forum/slider_arrow"]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="c-speakers c-container" id="speakers">
                            <h4 class="с-summerforum__title c-speakers__title">{Variable.lang.h.speakersForum}</h4>
                            <ul class="c-speakers__list">
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker1"]} />
                                        </div>
                                        <figcaption class="c-speakers__caption">
                                            <h3>Ян Кривоносов</h3>
                                            <p>CEO Crypto Emergency</p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker2"]} />
                                        </div>
                                        <figcaption class="c-speakers__caption">
                                            <h3>Андрей Тугарин</h3>
                                            <p>CEO компании GMT Legal</p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker3"]} />
                                        </div>
                                        <figcaption class="c-speakers__caption">
                                            <h3>Александр Бражников</h3>
                                            <p>Исполнительный директор РАКИБ</p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker4"]} />
                                        </div>
                                        <figcaption class="c-speakers__caption">
                                            <h3>Балахонцев Александр</h3>
                                            <p>Директор Blockchain 2</p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker"]} />
                                        </div>
                                        <figcaption class="c-speakers__caption">
                                            <h3>Андрей Ховалюк</h3>
                                            <p>Генеральный директор международной компании</p>
                                        </figcaption>
                                    </figure>
                                </li>
                                <li>
                                    <figure class="c-speakers__item">
                                        <div class="c-speakers__wrappper">
                                            <img src={images["summer_forum/speaker"]} />
                                        </div>
                                        <figcaption class="c-speakers__caption">
                                            <h3>Андрей Ховалюк</h3>
                                            <p>Генеральный директор международной компании</p>
                                        </figcaption>
                                    </figure>
                                </li>
                            </ul>
                            <a href="https://t.me/dmitriibelov" target="_blank" class="c-button c-button--gradient2">
                                <span class="c-button__text">{Variable.lang.button.becomeSpeaker}</span>
                            </a>
                        </section>

                        <section class="c-eventmap c-container" id="stands">
                            <h4 class="с-summerforum__title c-eventmap__title">{Variable.lang.h.standsForum}</h4>
                            <div class="c-eventmap__wrapper">
                                {/** Фоновая карта */}
                                <img class="c-eventmap__imagebg" src={svg['summer_forum/map']} />

                                {/** Спецификация */}
                                {/* <h5 class="c-eventmap__highlight c-eventmap__highlight--general">Генеральный спонсор</h5> */}
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--entrance">Вход</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--registration">Регистрация</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--buffet">Буфет</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--photozone">Фотозона</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--restzone">Зона отдыха</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--scene">Сцена</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--ourstand">CryptoEmergency</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--freestands">Свободные стенды</h5>
                                <h5 class="c-eventmap__highlight c-eventmap__highlight--reservedstands">Зарезервированные стенды</h5>

                                {/** "VIP-зоны" */}
                                {/* <div data-zone="general" class="c-eventmap__zone c-eventmap__zone--23">
                                            <span class="c-eventmap__titlezone">23</span>
                                            <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                                <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                                    <img class="" src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1" width="" height="" />
                                                    <span class="">google.com</span>
                                                </a>
                                                <span class="">Google — корпорация, инвестирующая в интернет-поиск, облачные вычисления и рекламные технологии.</span>
                                            </div>
                                        </div> */}

                                {/** Стенды */}
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--1">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--2">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--3">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--4">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--5">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--6">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--7">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--8">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--9">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--10">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--11">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--12">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--13">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--14">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--15">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--16">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--17">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--18">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--19">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--20">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--21">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--22">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--23">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--24">
                                    {/* <span class="c-eventmap__titlezone">5</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--25">
                                    {/* <span class="c-eventmap__titlezone">25</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class=""></span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>
                                <div data-zone="freestands" class="c-eventmap__zone c-eventmap__zone--26">
                                    {/* <span class="c-eventmap__titlezone">25</span> */}
                                    <div class="c-eventmap__popup c-eventmap__popup--righttop">
                                        <a class="c-eventmap__linkzone" href="https://www.google.ru/" target="_blank" rel="nofollow">
                                            <img class="" src={svg["summer_forum/free"]} width="" height="" />
                                            {/* <span class="">google.com</span> */}
                                        </a>
                                        <span class="">Это место в данный момент свободно</span>
                                    </div>
                                </div>

                                {/** тематические зоны */}
                                <div data-zone="entrance" class="c-eventmap__area c-eventmap__area--entrance"></div>
                                <div data-zone="registration" class="c-eventmap__area c-eventmap__area--registration"></div>
                                <div data-zone="scene" class="c-eventmap__area c-eventmap__area--scene"></div>
                                <div data-zone="buffet" class="c-eventmap__area c-eventmap__area--buffet"></div>
                                <div data-zone="photozone" class="c-eventmap__area c-eventmap__area--photozone"></div>
                                <div data-zone="restzone" class="c-eventmap__area c-eventmap__area--restzone"></div>
                                <div data-zone="ourstand" class="c-eventmap__area c-eventmap__area--ourstand"></div>

                                {/** попапы тематических зон */}
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--entrance">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Вход</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/entrance"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Вход - это начальная часть помещения форума, отсюда всё начинается</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--registration">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Регистрация</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/registration"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Для того, чтобы получить доступ к форуму и стать его участником необходимо зарегистрироваться</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--scene">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Сцена</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/scene"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Сцена - это ключевая часть помещения форума, место основного действия</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--buffet">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Буфет</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/buffet"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Зона кофе-брейков с напитками, закусками и обедом для участников форума</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--photozone">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Фотозона</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/photozone"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Фотозона на мероприятиях – это ключевое место для мероприятия, так как именно она попадает на огромное множество фотографий с гостями.</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--restzone">
                                    <header class="c-eventmap__areatitle">
                                        <h5>Зона отдыха</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/restzone"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Зона отдыха на мероприятиях – это место отдыха от насыщенного дня и устанавления неформальных связей</p>
                                    </div>
                                </div>
                                <div class="c-eventmap__areapopup c-eventmap__areapopup--ourstand">
                                    <header class="c-eventmap__areatitle">
                                        <h5>CryptoEmergency</h5>
                                    </header>
                                    <figure class="c-eventmap__areaphoto">
                                        <img src={images["summer_forum/our_stand"]} />
                                    </figure>
                                    <div class="c-eventmap__areainfo">
                                        <p>Организатор форума. Объединяем криптоэнтузиастов всего мира на единой многофункциональной платформе Crypto Emergency.</p>
                                    </div>
                                </div>
                            </div>
                            <img class="c-eventmap__image" src={svg['summer_forum/map']} />

                            <a href="https://t.me/dmitriibelov" target="_blank" class="c-button c-button--gradient2">
                                <span class="c-button__text">{Variable.lang.button.buyStand}</span>
                            </a>
                        </section>

                        <section class="c-partnersforum c-container" id="partners">
                            <h4 class="с-summerforum__title c-partnersforum__title">{Variable.lang.h.partnersForum}</h4>
                            <div class="c-partnersforum__list">
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://cryptoholding.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_1"]} />
                                </a>
                                <a
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://тц-черноморский.рф"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_7"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://crypto.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_8"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://carding.pro"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_9"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://blockchain24.pro"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_10"]} />
                                </a>
                                <a
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://www.instagram.com/abrau1870/"
                                    class="c-partnersforum__item"
                                    style="background: #383637"
                                >
                                    <img src={images["forum/partner_2"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://www.instagram.com/barycoffee.nvr/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_3"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://hotel-capital.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_4"]} />
                                </a>
                                <a style="display: block!important; background: #FFFFFF"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://seeyour.info/vizhu.more.rest"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_5"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://hginov.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_6"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://ti.turovinvest.ru/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_11"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://cryptonews.net/ru/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_12"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://digitalfutureclub.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_13"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://www.onestopmining.com"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_14"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://cripta.games"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_15"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://voltep.online"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_16"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://cryptometa.media"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_17"]} />
                                </a>
                                <a style="background:  transparent;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://t.me/unionclub_invest"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_18"]} />
                                </a>
                                <a style="display: block!important;"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://hotel-novoros.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_19"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_20"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://racib.com"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_21"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://www.artemotiochain.ru/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_22"]} />
                                </a>
                                <a style="background: #1C1A27"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://zerogravity.foundation/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_23"]} />
                                </a>
                                <a style="background: #EDEDED"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="http://www.zhcashcrypto.site"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_24"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://t.me/zhcashcrypto/1036"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_26"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://bloknot-novorossiysk.ru"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_25"]} />
                                </a>
                                <a style="background: #C4CFE3"
                                    target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://t.me/zhcashcrypto/1040"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_27"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://www.cls.global"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_28"]} />
                                </a>
                                <a target="_blank"
                                    rel="nofollow nooopener"
                                    href="https://garantex.io/"
                                    class="c-partnersforum__item"
                                >
                                    <img src={images["forum/partner_30"]} />
                                </a>
                            </div>
                            <a href="https://t.me/dmitriibelov" target="_blank" class="c-button c-button--gradient2">
                                <span class="c-button__text">{Variable.lang.button.becomePartner}</span>
                            </a>
                        </section>

                        <section class="c-localmap" id="localmap">
                            <h4 class="с-summerforum__title c-localmap__title">{Variable.lang.h.localmap}</h4>
                            <div id="map" class="c-localmap__map"></div>
                        </section>
                    </div>
                    <script src="https://widget.tiwo.ru/loader/loader.js.php"></script>
                    {/* <script src="//code.jivo.ru/widget/eSqQ27xJUs" async></script> */}
                    <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"></script>
                </div>
            )
        }, ID
    )
}

export default start;
