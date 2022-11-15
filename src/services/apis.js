const BASE_API =
  'https://0so4sm1tb9.execute-api.sa-east-1.amazonaws.com/prod-pet/';
const BASE_API_AUTH =
  'https://k00d8ypno1.execute-api.sa-east-1.amazonaws.com/authProd';
const BASE_API_USER =
  'https://z8e8o5q6sf.execute-api.sa-east-1.amazonaws.com/user/';

const userLogin = async body => {
  let res = null;
  await fetch(`${BASE_API_AUTH}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      console.log('RES', response);
      return response.json();
    })
    .then(responseJson => {
      if (responseJson != null) {
        res = responseJson;
      }
    })
    .catch(error => {
      console.log('err', error);

      console.error(error);
    });
  return res;
};

const registerOwner = async body => {
  let res = null;
  await fetch(`${BASE_API_USER}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      console.log('RES', response);
      return response.json();
    })
    .then(responseJson => {
      if (responseJson != null) {
        res = responseJson;
      }
    })
    .catch(error => {
      console.log('err', error);

      console.error(error);
    });
  return res;
};

const registerPet = async body => {
  let res = null;
  await fetch(`${BASE_API}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if (responseJson != null) {
        res = responseJson;
      }
    })
    .catch(error => {
      console.error(error);
    });
  return res;
};

const getPet = async mail => {
  let res = null;
  await fetch(`${BASE_API}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      owner: mail,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if (responseJson != null) {
        res = responseJson;
      }
    })
    .catch(error => {
      console.error(error);
    });
  return res;
};

const updatePet = async body => {
  let res = null;
  await fetch(`${BASE_API}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if (responseJson != null) {
        res = responseJson;
      }
    })
    .catch(error => {
      console.error(error);
    });
  return res;
};
export {registerOwner, registerPet, getPet, updatePet, userLogin};
