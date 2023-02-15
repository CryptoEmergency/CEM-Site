import { Variable, initReload } from '@betarost/cemserver/cem.js'
import { openDB, deleteDB, wrap, unwrap } from 'idb';



let idb = null
// Variable.idb = idb

const initInexedDB = async function () {
    idb = openDB('CryptoEmergency', 1, {
        upgrade(idb) {
            const MyInfo = idb.createObjectStore('MyInfo', {
                keyPath: 'uuid',
                autoIncrement: false,
            });
            //   MyInfo.createIndex('date', 'date');
        },
    });
}

export { initInexedDB, idb };