/*    Pseudocode
 *       1. Render page with header, form, and initial two buttons in form.
 *       2. Clicking a button reveals its input field; hides/clears other field.
 *       3. Typing a value enables the submit button.
 *       4. On submission, request is sent to Dogs API.
 *       5. Data from Dogs API is displayed appropriately, including a 404 if none.   
 */

/* ------ Variable Declarations ------ */

let formFieldFor = '';
let formFieldLabel = ''
let formFieldId = '';
let formFieldName = '';
let formFieldPlaceholder = '';
let formMaxLength = 50;
let formMaxNum = 50;

let numRequested = 0;


/* ------ Template Generation Functions ------ */

function genForm() {
    console.log('3: gen form works');
    return `<form id="get-dogs-form">
                <div id="user-input-objs">
                    <div id="input-buttons">
                        <input type="button" id='btn-mixitup' value="Mix it Up!"></input>             <!--- Button 1: "Mix it Up" --->
                        <input type="button" id='btn-letmechoose' class='hide' value="Let Me Choose!"></input>         <!--- Button 1: "Mix it Up" --->
                    </div>
                    <div id="input-field">
                    </div>
                </div>
                <div>
                    <input type="submit" class='hide' id='btn-submit' value="Show me the dogs!">                         <!--- Submit button --->
                </div>
            </form>
            <section id="show-dogs-here">
            </section>`;
}

function genInputNumber() {
    return  `<label for='input-quant'>'How many dogs do you want to see?'</label>
             <input type="text" class="user-input-box" id='input-quant' name='quant' placeholder='Enter a 1 - 50 number, eg: 3'></input>`;
}

function genInputBreed() {
    return  `<label for='${formFieldFor}'>${formFieldLabel}</label>
             <input type="text" class="user-input-box" id='${formFieldId}' name='${formFieldName}' placeholder='${formFieldPlaceholder}'></input>`;
}

function genResults(responseJson) {
    console.log('func genResults called')
    let outputString = '';

    for(i=0; i<responseJson.message.length; i++) {
        outputString += `<section id="show-dogs-here">
                            <img src=${responseJson.message[i]}>
                        </section>`;
    }
    return outputString;       
}

/* ------ Render Functions ------ */

function renderForm() {
    console.log('2: render form works')
    return $('main').html(genForm());
  }

function renderInputNumber() {
    return $('#input-field').html(genInputNumber(formFieldFor, formFieldLabel, formFieldId, formFieldName, formFieldPlaceholder));
}

function renderInputBreed() {
    return $('#input-field').html(genInputBreed(formFieldFor, formFieldLabel, formFieldId, formFieldName, formFieldPlaceholder));
}

function renderResults(responseJson) {
    console.log('render results working');
    return $('#show-dogs-here').html(genResults(responseJson))
}

/* ------ Event Handler Functions ------ */

function searchType() {
    $('main').on('click', '#btn-mixitup', function(event) {
        mixItUp();
    })
    $('main').on('click', '#btn-letmechoose', function(event) {
        letMeChoose();
    })
}

function textInput() {
    $('#get-dogs-form').on('keyup', '.user-input-box', function(event) {
        if ($('#input-quant').val() != "") {
            $('#get-dogs-form').find('#btn-submit').removeClass('hide');
        } else {
            $('#get-dogs-form').find('#btn-submit').prop('disabled', true)
        }
    })
}

function submitClick() {
    $('#get-dogs-form').on('submit', function(event) {
        event.preventDefault();    
        getDogImageRandom();    
    })
}

/* ------ Structural Functions ------ */

function mixItUp() {
    formFieldFor = 'input-quant';
    formFieldLabel = 'How many dogs do you want to see?'
    formFieldId = 'input-quant';
    formFieldName = 'quant';
    formFieldPlaceholder = 'enter a 1 - 50 number, e.g.: 3';
    renderInputNumber();
}

function letMeChoose() {
    formFieldFor = 'input-breed';
    formFieldLabel = 'What is your favorite breed of dog?'
    formFieldId = 'input-breed';
    formFieldName = 'breed';
    formFieldPlaceholder = 'e.g.: dachshund';
    renderInputBreed();
}

/* ------ API Request Functions ------ */

function getDogImageRandom() {
    console.log('func getDogImageRandom is being called')
    console.log((`https://dog.ceo/api/breeds/image/random/${$('#input-quant').val()}`))
    fetch(`https://dog.ceo/api/breeds/image/random/${$('#input-quant').val()}`)
    .then(response => response.json())
    .then(responseJson => renderResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

/*function getDogImageBreed() {
    fetch()
        .then()
        .then()
        .catch();
}*/

/* ------ Initialize Functions ------ */

function initializePage() {
    renderForm();
    searchType();
    textInput();
    submitClick();
    console.log("1: initializePage works")
}

$(initializePage());