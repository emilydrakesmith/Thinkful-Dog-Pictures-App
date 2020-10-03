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

/* ------ Template Generation Functions ------ */

function genForm() {      /* generates the inital page form to prompt the user to choose either the 'Mix it Up' or 'Let Me Choose' function */
    return `<form id="get-dogs-form">
                <div id="user-input-objs">
                    <div id="input-buttons">
                        <input type="button" class='input-button' id='btn-mixitup' value="Mix it Up!"></input>             <!--- Button 1: "Mix it Up" --->
                        <input type="button" class='input-button' id='btn-letmechoose' value="Let Me Choose!"></input>     <!--- Button 2: "Let Me Choose!" --->
                    </div>
                    <div id="input-field">                          <!--- input field will render here --->
                    </div>
                </div>
                <input type="submit" class='hide' id='btn-submit' value="Show me the dogs!">                         <!--- Submit button --->
            </form>
            <section id="show-dogs-here">                           <!--- results field will render here --->
            </section>`;
}

function genInputNumber() {           /* generates the user input field for the 'Mix It Up' function */
    return  `<label class='request-prompt' for='${formFieldFor}'>${formFieldLabel}</label>
             <input type="text" class="user-input-box" id='${formFieldId}' name='${formFieldName}' placeholder='${formFieldPlaceholder}'></input>`;
}

function genInputBreed() {           /* generates the user input field for the 'Let Me Choose' function */
    return  `<label class='request-prompt' for='${formFieldFor}'>${formFieldLabel}</label>
             <select class="user-input-box" id='${formFieldId}' name='${formFieldName}'>${breedsList}</select>`;
}

function genResults(responseJson) {                                                        /* generates the results field */
    let outputString = '';                                                                 /* creates an empty string to append results to */
    if ($('#btn-mixitup').hasClass('active-path')) {                                       /* determines whether 'Mix it Up' is the active app functionality */
        console.log(`User requested ${responseJson.message.length} dog pictures.`);              /* prints the query to the console */
        console.log(`Results of user query follow.`);                                      
        for(i=0; i<responseJson.message.length; i++) {                                           /* iterates a results item for the number of pictures requested */
                                                                                                 /* template HTML container to hold a single image follows */
            outputString += `<section id="show-dogs-here">                                     
                                <img src=${responseJson.message[i]}>                   
                            </section>`;
            console.log(`Dog picture ${i+1}: [${responseJson.message[i]}]`);                     /* prints the URL returned by the API to the console */
        }
    } else {                                                                               /* defaults to 'Let Me Choose' functionality if not 'Mix it Up' */
        console.log(`User requested a picture of a ${$('#input-breed').val()}.`);                /* prints the query to the console */
        console.log(`Results of user query follow.`);                                 
        console.log(`Picture: [${responseJson.message}]`);                                       /* prints the query result to the console */
                                                                                                 /* template HTML container to hold a single image follows */
        outputString += `<section id="show-dogs-here">
                                <img src=${responseJson.message}>
                         </section>`;
    }
    return outputString;                                                                    /* both app functionalities return results in the same variable */
}

/* ------ Render Functions ------ */

function renderForm() {                                                 /* function to render the initial form of the page */
    return $('main').html(genForm());                                   /* renders the HTML template string as functional HTML */
  }

function renderInputNumber() {                                          /* function to render the form input specific to the 'Mix it Up' functionality */
    return $('#input-field').html(genInputNumber());                    /* renders the HTML template string as functional HTML */
}

function renderInputBreed() {                                           /* function to render the form input specific to the 'Let Me Choose' functionality */
    return $('#input-field').html(genInputBreed());                     /* renders the HTML template string as functional HTML */
}

function renderResults(responseJson) {                                  /* function to render the results output, works for both functionalities */
    return $('#show-dogs-here').html(genResults(responseJson))          /* renders the HTML template string as functional HTML */
}

/* ------ Event Handler Functions ------ */

function searchType() {                                             /* this function listens to determine which functional pathway in the app the user takes */
    $('main').on('click', '#btn-mixitup', function(event) {             /* listens for a click on the 'Mix it Up' button */
        $(this).addClass('active-path');                                    /* marks 'Mix it Up' as the active pathway */
        $(this).siblings().removeClass('active-path');                      /* unmarks 'Let Me Choose' as the active pathway (if applicable) */
        $('#get-dogs-form').find('#btn-submit').addClass('hide')            /* hides the 'Let Me Choose' form input field (if applicable) */
        mixItUp();                                                          /* initiates the 'Mix It Up' pathway */
        $('#input-field').addClass('add-margin-15px');                      /* adds margin, this has to happen here or the page doesn't render properly */
    })
    $('main').on('click', '#btn-letmechoose', function(event) {         /* listens for a click on the 'Let Me Choose' button */
        $(this).addClass('active-path');                                    /* marks 'Let Me Choose' as the active pathway */
        $(this).siblings().removeClass('active-path');                      /* unmarks 'Mix it Up' as the active pathway (if applicable) */
        $('#get-dogs-form').find('#btn-submit').removeClass('hide')         /* hides the 'Mix it Up' form input field (if applicable) */
        letMeChoose();                                                      /* initiates the 'Mix It Up' pathway */
        $('#input-field').addClass('add-margin-15px');                      /* adds margin, this has to happen here or the page doesn't render properly */
    })
}

function textInput() {                                                        /* listens for user input in the 'Mix it Up' functionality */
    $('#get-dogs-form').on('keyup', '.user-input-box', function(event) {          /* listens for the user to type a value into the text box */
        if ($('.user-input-box').val() != "") {                                   /* determines if there is a value entered into the text box */
            $('#get-dogs-form').find('#btn-submit').removeClass('hide');              /* reveals the form submit button */
        } else {                                                                  /* determines if the user has deleted the contents of the text box */
            $('#get-dogs-form').find('#btn-submit').addClass('hide');                 /* hides the tex box if there's no input */
            textInput();                                                              /* re-initiates the function to wait for input */
        }
    })                                                                         //  Please note that the 'Let Me Choose' functionality is designed so that there
}                                                                              //  is always a valid input, so it makes the form submit button visible by default

function submitClick() {                                                   
    $('#get-dogs-form').on('submit', function(event) {           /* listens for user to click the form submit button */
        event.preventDefault();                                  /* stops the page from sending the user input to the server */
        $('#show-dogs-here').addClass('results-section');        /* adds CSS for the results section, this has to happen here or the page doesn't render properly */
        if ($('#btn-mixitup').hasClass('active-path')) {         /* determines whether 'Mix it Up' is the active functionality */
            getDogImageRandom();                                     /* triggers the API request form for the 'Mix it Up' field */
        } else {                                                 /* if 'Mix it Up' is not the active functionality, assumes 'Let Me Choose' must be active */
            getDogImageBreed();                                      /* triggers the API request form for the 'Let Me Choose' field */
        }
    })
}

/* ------ Structural Functions ------ */

function mixItUp() {                                                 /* generates the proper attributes for the 'Mix it Up' input field */
    formFieldFor = 'input-quant';
    formFieldLabel = 'How many dogs do you want to see?'
    formFieldId = 'input-quant';
    formFieldName = 'quant';
    formFieldPlaceholder = 'enter 1-50, eg: 3';
    renderInputNumber();                                             /* launches the render function for the 'Mix it Up' input field */
}

function letMeChoose() {                                             /* generates the proper attributes for the 'Let Me Choose' input field */
    formFieldFor = 'input-breed';
    formFieldLabel = 'What is your favorite breed of dog?'
    formFieldId = 'input-breed';
    formFieldName = 'breed';
    renderInputBreed();                                              /* launches the render function for the 'Let Me Choose' input field */
}

/* ------ API Request Functions ------ */

function getDogImageRandom() {                                                       /* API request form for the 'Mix it Up' field */
    fetch(`https://dog.ceo/api/breeds/image/random/${$('#input-quant').val()}`)          /* API endpoint when querying a number of random images */
    .then(response => response.json())                                                   /* function waits for a response file from the API */
    .then(responseJson => renderResults(responseJson))                                   /* launches a function to render results using the API's response */
        .catch(error => alert('Something went wrong. Try again later.'));                /* catches invalid responses from the API and alerts the user */
}

function getDogImageBreed() {                                                        /* API request form for the 'Mix it Up' field */
    fetch(`https://dog.ceo/api/breed/${$('#input-breed').val()}/images/random`)          /* API endpoint when querying a single breed-specific picture */
    .then(response => response.json())                                                   /* function waits for a response file from the API */
    .then(responseJson => renderResults(responseJson))                                   /* launches a function to render results using the API's response */
        .catch(error => alert('Something went wrong. Try again later.'));                /* catches invalid responses from the API and alerts the user */
}

/* ------ Initialize Functions ------ */

function initializePage() {
    renderForm();
    searchType();
    textInput();
    submitClick();
}

$(initializePage());