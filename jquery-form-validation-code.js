/* GUI HW4 
Natalie Mallon
email: natalie_mallon@student.uml.edu 
*/

var output = '';
var BlankFieldError = '';
var ValueConflictError = '';
var scndValueConflictError = '';
/* initializing variables above that are not initialized otherwise before the function call */
function ReadInFourNumbers(){
    
    // Changed these to match the IDs I changed to in the html file
    var MinColumnValue = +document.getElementById('MinColumn').value;
    var MaxColumnValue = +document.getElementById('MaxColumn').value;
    var MinRowValue = +document.getElementById('MinRow').value;
    var MaxRowValue = +document.getElementById('MaxRow').value; 

/* empty space */
output += '<td>' + ' ' + '</td>';

/*creates the first row of the table.*/
for(var i =  MinRowValue; i <= MaxRowValue; i++)
{
    output += '<td>' + i + '</td>';
}

output += '</tr>'; /* adds a table row and assigns the current output as this row. */

/* creates the first column of the table. */
for(var i = MinColumnValue; i <= MaxColumnValue; i++)
{
    output += '<tr>'; /* adds a table row and assigns the current row as this row. */
    output += '<td>' + i + '</td>';
    /* creates results that will be produced in the table. */
    for(var j = MinRowValue; j <= MaxRowValue; j++)
    {
        output += '<td>' + i * j + '</td>';
    }
    output += '</tr>'; /* adds a table row and assigns the current output as this row. */
}
  document.getElementById('MultiplicationTable').innerHTML = output; 

}

/* below is the JQuery validation code. */ 

//Checks if value in the form is greater than any other
$.validator.addMethod(
  "greaterThan",
  function (value, element, param) {
    var i = parseInt(value);
    var j = parseInt($(param).val());
    return i >= j;
  },
  "the max value must be greater than the min value."
);
//checks whether the inputted values are a non numeric value or a float and returns false if they are
$.validator.addMethod(
  "invalidOrFloat",
  function (value, element, param) {
    // Added $. to the isNumeric function because it seems to be a jQuery specific function
    // I couldn't get the isFloat function to work so i added this (value % 1 !== 0) to check if it's a float
    if (!$.isNumeric(value) || value % 1 !== 0) {
      return false;
    } else { 
      return true;
    }
  },
  "your input must be an integer value"
);

$(document).ready(function () {
  //initialize form validation on the multiplication table generator form.
  $("form[name='Multiplication-Table-Form']").validate({
    rules: {
      MinColumn: {
        required: true,
        invalidOrFloat: true,
        range: [-50, 50],
      },
      MaxColumn: {
        required: true,
        invalidOrFloat: true,
        greaterThan: true,
        range: true,
        range: [-50, 50],
        greaterThan: $("#MinColumn"), // Targets input box 
      },
      MinRow: {
        required: true,
        invalidOrFloat: true,
        range: true,
        range: [-50, 50],
      },
      MaxRow: {
        required: true,
        invalidOrFloat: true,
        greaterThan: true,
        range: true,
        range: [-50, 50],
        greaterThan: $("#MinRow"), //  Targets input box 
      },
    },
    invalidHandler: function (event) {
      event.preventDefault(); // This will stop the form submit from refreshing the page
    },
    // The submit handler was in the rules block before, moved it out into the parent block
    //call to ReadInFourNumbers occurs here so it will only call that function when validation passes
    submitHandler: function (form, event) {
      ReadInFourNumbers();
      form.reset();
    },
  });
});
