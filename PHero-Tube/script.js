const itemContainer = document.getElementById("item-container");
console.log(itemContainer);

// fetch("https://openapi.programming-hero.com/api/videos/category/1000")
//     .then((res) => res.json())
//     .then((data) => console.log(data));

fetchData(1000,1);

function fetchData(id,btn) {
    itemContainer.innerHTML = "";
    for (var i = 1; i < 5; i++){
        if (btn == i) {
            const btn1 = document.getElementById(btn);
            btn1.style.backgroundColor = 'red';
        }
        else {
            const btn1 = document.getElementById(i);
            btn1.style.backgroundColor = 'lightgray';
        }
    }
    const str = `https://openapi.programming-hero.com/api/videos/category/${id}`
    fetch(str)
        .then((res) => res.json())
        .then((data) => {
            if (data.data.length ==0) {
                console.log("empty");
                itemContainer.innerHTML = `
                <div class="container text-center">
                    <img src="./Icon.png" style="width: 100px; height: 100px;" alt="no-content">
                    <h2>Oops sorry ! There is no content.</h2>
                </div>
                `;
            }
            else {
                display(data)
            }
        })
        .catch((err) => console.log(err));

    function display(data) {
        
        data.data.forEach(it => {
            // console.log(it.authors[0].profile_name);
            const item = document.createElement("div");
            // console.log(it.authors[0].verified == true);
            var txt = '';
            if (it.authors[0].verified == true) {
                txt =
                  '<i class="fa fa-check-circle" style="padding-left: 5px;font-size:15px;color:rgb(83, 128, 231)"></i>';
            }
            item.innerHTML = `
            <div class="card">
              <img src="${it.thumbnail}" class="card-img-top" style="width: 200px; height: 100px;" alt="...">
              <div class="d-flex">
                <div class="author">
                  <img src="${it.authors[0].profile_picture}" class="card-img-top mt-3" style="width: 30px; height: 30px; border-radius: 30px;" alt="...">
                </div>
                <div class="card-body">
                  <p class="card-title" style="font-size: 15px;">${it.title}</p>
                  <p class="card-text" style="font-size: 10px;">${it.authors[0].profile_name}${txt}</p>
                  <p class="card-text" style="font-size: 10px;"><small class="text-body-secondary">${it.others.views}</small></p>
                </div>
              </div>
            </div>`;
            itemContainer.appendChild(item);
        });
        
    };
}

