const IndexDBName = 'lexicon';
const IndexStoreName = 'lexicon_store';

export function createDB() {
    let db;
    const request = indexedDB.open(IndexDBName, 1);

    request.onerror = function (event) {
        console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Database opened successfully");
    };

    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        const store = db.createObjectStore(IndexStoreName, { keyPath: 'id', autoIncrement: true });
        // Define the structure of your object store here
        store.createIndex('type', 'type', { unique: false }); // 增加索引
        store.createIndex('word', 'word', { unique: true });  // 增加索引
        store.createIndex('time', 'time', { unique: false }); // 增加索引
        console.log("Store created successfully");
    }
};

export function saveData(data, onsuccess, onerror) {

    const request = indexedDB.open(IndexDBName, 1);
    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction([IndexStoreName], 'readwrite');
        const store = transaction.objectStore(IndexStoreName);

        const request = store.add(data);

        request.onsuccess = function (event) {
            console.log("Data added successfully");
            if (onsuccess) {
                onsuccess(event)
            }
        };

        request.onerror = function (event) {
            console.error("Error adding data: " + event.target.errorCode);
            if (onerror) {
                onerror(event)
            }
        };
    }
}

export function getDatas(key, value, onsuccess, onerror) {

    const request = indexedDB.open(IndexDBName, 1);

    request.onsuccess = function (event) {

        const db = event.target.result;
        const transaction = db.transaction([IndexStoreName], 'readonly');
        const store = transaction.objectStore(IndexStoreName);

        // 获取名为name的索引
        const index = store.index(key);

        // 创建一个范围查询
        const range = IDBKeyRange.only(value);

        // 打开游标并执行查询
        const request = index.openCursor(range);

        request.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                console.log("Retrieved data:", cursor.value);
                if (onsuccess) {
                    onsuccess(cursor.value);
                }
                cursor.continue(); // 继续游标，以便获取下一个匹配项
            } else {
                console.log("No more matching data found");
            }
        };

        request.onerror = function (event) {
            console.error("Error retrieving data: " + event.target.errorCode);
            if (onerror) {
                onerror(event);
            };
        };
    }
}

export function getAllDatas(key, value, onsuccess, onerror) {

    const request = indexedDB.open(IndexDBName, 1);
    request.onsuccess = function (event) {

        const db = event.target.result;
        const transaction = db.transaction([IndexStoreName], 'readonly');
        const store = transaction.objectStore(IndexStoreName);
        const request = store.getAll();

        request.onsuccess = function (event) {
            const cursor = event.target.result;
            console.log(cursor)
            if (onsuccess) {
                onsuccess(cursor);
            }
        };

        request.onerror = function (event) {
            console.error("Error retrieving data: " + event.target.errorCode);
            if (onerror) {
                onerror(event);
            }
        };
    };
}

export function updateData(key, oldValue, newValue, onsuccess, onerror) {

    const request = indexedDB.open(IndexDBName, 1);
    request.onsuccess = function (event) {

        const db = event.target.result;
        const transaction = db.transaction([IndexStoreName], 'readwrite');
        const store = transaction.objectStore(IndexStoreName);

        // 获取名为name的索引
        const index = store.index(key);

        // 创建一个范围查询
        const range = IDBKeyRange.only(oldValue);

        // 打开游标并执行查询
        const request = index.openCursor(range);

        request.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                // 获取匹配到的数据
                const data = cursor.value;
                console.log("Retrieved data:", data);
                // 更新数据
                data[key] = newValue;
                const updateRequest = cursor.update(data);
                updateRequest.onsuccess = function (event) {
                    console.log("Data updated successfully");
                    if (onsuccess) {
                        onsuccess();
                    }
                };
                updateRequest.onerror = function (event) {
                    console.error("Error updating data: " + event.target.errorCode);
                    if (onerror) {
                        onerror(event);
                    }
                };
                cursor.continue(); // 继续游标，以获取下一个匹配项
            } else {
                console.log("No more matching data found");
            }
        };

        request.onerror = function (event) {
            console.error("Error retrieving data: " + event.target.errorCode);
            if (onerror) {
                onerror(event);
            }
        };
    };
}

export function deleteData(key, value, onsuccess, onerror) {

    const request = indexedDB.open(IndexDBName, 1);
    request.onsuccess = function (event) {
        const db = event.target.result;
        console.log("Database opened successfully");

        const transaction = db.transaction([IndexStoreName], 'readwrite');
        const store = transaction.objectStore(IndexStoreName);

        // 获取名为name的索引
        const index = store.index(key);

        // 创建一个范围查询
        const range = IDBKeyRange.only(value);

        // 打开游标并执行查询
        const request = index.openCursor(range);

        request.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                console.log("Retrieved data:", cursor.value);
                // 删除匹配到的数据
                const deleteRequest = cursor.delete();
                deleteRequest.onsuccess = function (event) {
                    console.log("Data deleted successfully");
                    if (onsuccess) {
                        onsuccess()
                    }
                };
                deleteRequest.onerror = function (event) {
                    console.error("Error deleting data: " + event.target.errorCode);
                    if (onerror) {
                        onerror()
                    }
                };
                cursor.continue(); // 继续游标，以获取下一个匹配项
            } else {
                console.log("No more matching data found");
            }
        };

        request.onerror = function (event) {
            console.error("Error retrieving data: " + event.target.errorCode);
            if (onerror) {
                onerror()
            }
        };
    };
}
