let Base_URL =
  "https://join-a8a87-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Gets all data in a list
 *
 * @param {*} endpoint -name of the List
 * @returns a array of the list data
 */
async function getData(endpoint) {
  let url = `${Base_URL}${endpoint}.json`;
  try {
    let response = await fetch(url);
    let json = await response.json();
    return getArrayOfData(json);
  } catch (error) {
    throw error;
  }
}

/**
 * Creats a array with the data
 *
 * @param {{}} json -data of the list
 * @returns a array with the data
 */
function getArrayOfData(json) {
  let dataArray = [];
  let dataKeysArray = Object.keys(json);
  for (let i = 0; i < dataKeysArray.length; i++) {
    dataArray.push({
      id: dataKeysArray[i],
      ...json[dataKeysArray[i]],
    });
  }
  return dataArray;
}

/**
 * Added new data to Firebase
 *
 * @param {string} endpoint -name of the List
 * @param {{}} data -data to be added
 * @returns a object of the data with the id
 */
async function pushData(endpoint, data) {
  let url = `${Base_URL}${endpoint}.json`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Change data on Firebase
 *
 * @param {string} endpoint -name of the List
 * @param {{}} data -data to be changed
 */
async function changeData(endpoint, data) {
  let url = `${Base_URL}${endpoint}/${data.id}.json`;
  try {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Delete data from Firebase
 *
 * @param {string} endpoint -name of the List
 * @param {{}} data -data to be delete
 */
async function deleteData(endpoint, data) {
  let url = `${Base_URL}${endpoint}/${data.id}.json`;
  try {
    await fetch(url, {
      method: "DELETE",
    });
  } catch (error) {
    throw error;
  }
}
