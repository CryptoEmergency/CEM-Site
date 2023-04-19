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

export { indexedDB, idb };