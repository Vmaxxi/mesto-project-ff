

const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

const config = {
   baseUrl:'https://nomoreparties.co/v1/wff-cohort-25',
   headers: {
        authorization: 'd11fb9d8-c4f7-4266-b3f7-c9dbed519790',
        'Content-Type': 'application/json',
   },
}

function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        }
    ).then(handleResponse);
}

function getCard() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(handleResponse);
}   

function profileEdit(newName, newAbout) {
    return fetch(`${config.baseUrl}/users/me `, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
          name: newName,
          about: newAbout,
        }),
    }).then(handleResponse)
}

function addNewCard(name, link){
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
}).then(handleResponse);

}

function deletedCardServer(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(handleResponse);
  }

function changeLike (id, like) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: like ? "PUT" : "DELETE",
        headers: config.headers,
    }).then(handleResponse);
  }

function avatarEdit (link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
          avatar: link,
        }) 
    }).then(handleResponse);
  }

export {
    getUser,
    getCard,
    profileEdit,
    addNewCard,
    deletedCardServer,
    changeLike,
    avatarEdit
}



