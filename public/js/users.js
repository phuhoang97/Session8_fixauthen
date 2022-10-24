const baseApi = "http://127.0.0.1:3000/";
const tbody = document.getElementById("tbody");
// const logout = document.querySelector(".signout-btn");
const logout = document.getElementById("logout-users");

const showMessage = (status, message) => {
  let messageContainer = document.getElementsByClassName("message")[0];
  if (status === "delete") {
    messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  }
  if (status === "update") {
    messageContainer.innerHTML = `<div class="alert alert-success">${message}</div>`;
  }
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 3000);
};

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.id;
    fetch(baseApi + `users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        showMessage("delete", data.message);
        e.target.parentElement.parentElement.remove();
        console.log(data);
      })
      .catch((err) => {
        showMessage("delete", err.message);
      });
  }

  if (e.target.classList.contains("btn-update")) {
    // GET id
    let id = e.target.id.split("-")[1]; // update-1, update-2...

    // GET current row (Lấy ra dòng hiện tại của nút update)
    let td = e.target.parentElement.parentElement;

    // GET current row children
    // Lấy toàn bộ phần tử con (td list) của dòng hiện tại
    let tdChildList = e.target.parentElement.parentElement.children;

    // Lấy ra toàn bộ thông tin của user nằm trong từng ô (từng td)
    let info = {
      index: tdChildList[0].innerHTML,
      id: tdChildList[1].innerHTML,
      name: tdChildList[2].innerHTML,
      username: tdChildList[3].innerHTML,
      email: tdChildList[4].innerHTML,
      website: tdChildList[5].innerHTML,
      phone: tdChildList[6].innerHTML,
      password: tdChildList[7].innerHTML,
    };

    // Fill toàn bộ thông tin lấy được ở trên vào template dòng mới
    // đã được thay thế bằng input.value
    td.innerHTML = `
    <tr>
        <th scope="row">
            ${info.index}
        </th>
        <td>${info.id}</td>
        <td><input type="text" value="${info.name}"></td>
        <td><input type="text" value="${info.username}"></td>
        <td>${info.email}</td>
        <td><input type="text" value="${info.website}"></td>
        <td><input type="text" value="${info.phone}"></td>
        <td class="password">${info.password}</td>
        <td class="action">
            <span id="${info.id}" class="btn-delete btn btn-danger">
                <ion-icon name="trash-outline"></ion-icon>
            </span>
            <span id="save-${info.id}" class="btn-save btn btn-info">
                Save
            </span>
        </td>
    </tr>
    `;
  }

  if (e.target.classList.contains("btn-save")) {
    // GET id
    let id = e.target.id.split("-")[1]; // update-1, update-2...

    // GET current row (Lấy ra dòng hiện tại của nút update)
    let td = e.target.parentElement.parentElement;

    // GET current row children
    // Lấy toàn bộ phần tử con (td list) của dòng hiện tại
    let tdChildList = e.target.parentElement.parentElement.children;

    let info = {
      index: tdChildList[0].innerHTML,
      id: tdChildList[1].innerHTML,
      name: tdChildList[2].children[0].value,
      username: tdChildList[3].children[0].value,
      email: tdChildList[4].innerHTML,
      website: tdChildList[5].children[0].value,
      phone: tdChildList[6].children[0].value,
      password: tdChildList[7].innerHTML,
    };
    // .innerHTML ---> text (input) "<input />"

    // .children ---> 1 mảng HTML, [0] --> .value
    console.log(info.website, info.phone);

    // Tiến hành gọi fetch update
    fetch(baseApi + `users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showMessage("update", data.message);
        // DOM để đổi lại dòng hiện tại thành một dòng bình thường không có
        // input nằm ở bên trong nữa
        td.innerHTML = `
        <tr>
            <th scope="row">
                ${info.index}
            </th>
            <td>${info.id}</td>
            <td>${info.name}</td>
            <td>${info.username}</td>
            <td>${info.email}</td>
            <td>${info.website}</td>
            <td>${info.phone}</td>
            <td class="password">${info.password}</td>
            <td class="action">
                <span id="${info.id}" class="btn-delete btn btn-danger">
                    <ion-icon name="trash-outline"></ion-icon>
                </span>
                <span id="save-${info.id}" class="btn-update btn btn-info">
                  <ion-icon name="build-outline"></ion-icon>
                </span>
            </td>
        </tr>
        `;
      })
      .catch((err) => {
        showMessage("delete", err.message);
      });
  }
});

// logout.addEventListener("click", (e) => {
//   e.preventDefault();
//   fetch(baseApi + "auth/logout")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("hello");
//       console.log(data);
//     })
//     .catch((err) => console.log(err));
// });

logout.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(baseApi + `clear/logout`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});
