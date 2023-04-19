import { Variable, initReload } from '@betarost/cemserver/cem.js'
import { openDB, deleteDB, wrap, unwrap } from 'idb';



let idb = null
// Variable.idb = idb

const indexedDB = async function () {
    idb = openDB('CryptoEmergency', 1, {
        upgrade(idb, oldVersion) {
            const MyInfo = idb.createObjectStore('MyInfo', {
                keyPath: 'uuid',
                autoIncrement: false,
            });

            const CachePage = idb.createObjectStore('CachePage', {
                keyPath: 'name',
                autoIncrement: false,
            });
            //   MyInfo.createIndex('date', 'date');
        },
    });
}
// fn.idb = {}

// fn.idb.get = async function (table, key) {
//   let record = await (await idb).get(table, key)
//   if (!record) {
//     return []
//   }
//   return record
// }

// fn.idb.set = async function (table, key, value) {
//   (await idb).put("CachePage", { test: "dfh", name: "dfhdhf" })
//   return
//   return await (await idb).put(table, value, key)
// }
export { indexedDB, idb };