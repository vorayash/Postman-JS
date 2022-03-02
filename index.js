let index = 2;
let JSONholder = document.querySelector(".JSONholder");
let parameterHolder = document.querySelector('.parameterHolder');

//clicking on json hide custome parater and viceversa
let JSONrad = document.getElementById('JSONrad');
let Customrad = document.getElementById('Customrad');
JSONrad.addEventListener('click', () => {
    JSONholder.style.display = 'block';
    parameterHolder.style.display = 'none';

})
Customrad.addEventListener('click', () => {
    JSONholder.style.display = 'none';
    parameterHolder.style.display = 'block';

})

//new parameter
function makeparameter(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div;
}
let addParameter = document.getElementById("addParameter");
addParameter.addEventListener('click', () => {
    let string = `<div class="row g-3">
    <label for="" id="Parameter${index}" class="col-sm-2 col-form-label">Parameter ${index}</label>
    <div class="col mb-1">
    <input type="text" class="form-control" id="key${index}" placeholder="Enter parameter ${index} key" aria-label="First name">
    </div>
    <div class="col mb-1">
    <input type="text" class="form-control" id="value${index}" placeholder="Enter parameter ${index} value" aria-label="Last name">
            </div>
        <div class="col-sm-1 mb-1">
            <button type="button" id=${index} class="btn btn-primary newPara">- </button>
        </div>
    </div>`;
    let newParameter = makeparameter(string);
    let newParameterHolder = document.querySelector(".newParameterHolder");
    newParameterHolder.appendChild(newParameter);
    index++;

    //remove parameter on clicking minus button
    let removepara = document.getElementsByClassName("newPara");
    for (item of removepara) {
        item.addEventListener('click', (e) => {
            let elem=document.getElementById("Parameter"+e.target.id);   
            if (confirm(`Do you want to delete ${elem.innerHTML}`)) {
                e.target.parentElement.parentElement.remove();
            }   
            // e.target.parentElement.parentElement.remove();

        })
    }

})


//when user clicks on submit
let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
    let responseHolder = document.getElementById("response");
    responseHolder.innerHTML = "Please wait... We are fetching data...";
    let url = document.getElementById("url");
    let requestType = document.querySelector("input[name='RequestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    console.log(requestType, contentType);
    let data;

    if (contentType == "JSON") {
        data = document.getElementById('JSONtext').value;
        
    }
    else {
        data = {};
        for (let i = 0; i < index; i++) {
            let key = document.getElementById(`key${i}`);
            let value = document.getElementById(`value${i}`);
            if (key != undefined) {
                data[key.value] = value.value;
            }
        }
        
    }
    if (requestType == "GET") {
        fetch(url.value)
            .then(response => response.text())
            .then((json) =>{
                responseHolder.innerHTML=json;
                Prism.highlightAll();
            })
        }
        else {
            fetch(url.value, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.text())
        .then((json) =>{
            responseHolder.innerHTML=json;
            Prism.highlightAll();

            });
    }


})