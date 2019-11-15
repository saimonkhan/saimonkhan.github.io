/*
Yahtzee Project -- Software Engineering
Saimon Khan
This is the js used for my Yahtzee project. Everything is fully functional.
There are a number of global variables listed up top
There are functions which are called as a result of event listeners or Buttons
Please enjoy playing Yahtzee!
*/

var die_list = []; //list of dice values
var roll_button = document.getElementById("roll_button"); //establishes roll button
var mode = ["test"]; //testing mode
completed = []; //array of completed categories
roll_count = 0; //number of roles
turn_count = 0; //number of turns
totalUpper = 0; //upper score
totalLower = 0; //lower score
upperBonus = 0; //upper bonus
totalGrand = 0; //grand total

var userInfo = { //initializes object of user info for a session
  'name': 'Stranger',
  'dice': [],
  'ones': 0,
  'twos': 0,
  'threes': 0,
  'fours': 0,
  'fives': 0,
  'sixes': 0,
  'upper': 0,
  'upperBonus': 0,
  'upperTotal': 0,
  'threeKind': 0,
  'fourKind': 0,
  'fullHouse': 0,
  'smallStraight': 0,
  'largeStraight': 0,
  'yahtzee': 0,
  'chance': 0,
  'lowerTotal': 0,
  'grandTotal': 0,
  'completed' : [],
  'roll_count': roll_count,
  'turn_count': turn_count
}

categories = ['ones','twos','threes','fours','fives','sixes','threeKind','fourKind','fullHouse','smallStraight','largeStraight','yahtzee','chance']; //possible categories used below

function saveGame(){ //save game function
  var person = prompt("Please enter your name", "Stranger"); //prompts user for name
  var weird = ['<','>','/','&','%','$','~']; //weird character we don't want
  var weirdnot = true;
  for (var i=0; i<weird.length; i++){ //determines if weird characters are included
    if (person.includes(weird[i])){
      weirdnot = false;
    }
  }
  if (person!=null && weirdnot){ //if name is valid, then proceed to display name
    userInfo['name'] = person;
    console.log(userInfo['name']);
    document.getElementById('name').innerHTML = "Hello "+person;
    document.getElementById('wrong').innerHTML = 'Successfully saved game. Keep playing!';
  }
  else {
    document.getElementById('wrong').innerHTML = 'Invalid name entered. Please try again.';
  }
  //the follwing sets values of the object equal to real game values that have been determined
  userInfo['completed'] = completed;
  if (completed.includes('ones')){
    userInfo['ones'] = document.getElementById("aces_1").innerHTML;
  }
  else userInfo['ones'] = document.getElementById("aces_score_value").value;
  if (completed.includes('twos')){
    userInfo['twos'] = document.getElementById("twos_2").innerHTML;
  }
  else userInfo['twos'] = document.getElementById("twos_score_value").value;
  if (completed.includes('threes')){
    userInfo['threes'] = document.getElementById("threes_3").innerHTML;
  }
  else userInfo['threes'] = document.getElementById("threes_score_value").value;
  if (completed.includes('fours')){
    userInfo['fours'] = document.getElementById("fours_4").innerHTML;
  }
  else userInfo['fours'] = document.getElementById("fours_score_value").value;
  if (completed.includes('fives')){
    userInfo['fives'] = document.getElementById("fives_5").innerHTML;
  }
  else userInfo['fives'] = document.getElementById("fives_score_value").value;
  if (completed.includes('sixes')){
    userInfo['sixes'] = document.getElementById("sixes_6").innerHTML;
  }
  else userInfo['sixes'] = document.getElementById("sixes_score_value").value;
  if (completed.includes('threeKind')){
    userInfo['threeKind'] = document.getElementById("three_kind").innerHTML;
  }
  else userInfo['threeKind'] = document.getElementById("three_kind_score").value;
  if (completed.includes('fourKind')){
    userInfo['fourKind'] = document.getElementById("four_kind").innerHTML;
  }
  else userInfo['fourKind'] = document.getElementById("four_kind_score").value;
  if (completed.includes('fullHouse')){
    userInfo['fullHouse'] = document.getElementById("full_house").innerHTML;
  }
  else userInfo['fullHouse'] = document.getElementById("full_house_score").value;
  if (completed.includes('smallStraight')){
    userInfo['smallStraight'] = document.getElementById("small straight").innerHTML;
  }
  else userInfo['smallStraight'] = document.getElementById("small_straight_score").value;
  if (completed.includes('largeStraight')){
    userInfo['largeStraight'] = document.getElementById("large straight").innerHTML;
  }
  else userInfo['largeStraight'] = document.getElementById("large_straight_score").value;
  if (completed.includes('yahtzee')){
    userInfo['yahtzee'] = document.getElementById("yahtzee").innerHTML;
  }
  else userInfo['yahtzee'] = document.getElementById("yahtzee_score").value;
  if (completed.includes('chance')){
    userInfo['chance'] = document.getElementById("chance").innerHTML;
  }
  else userInfo['chance'] = document.getElementById("chance_score").value;
  console.log(Object.keys(userInfo).forEach(function(a){console.log(userInfo[a])}));
  userInfo['upper'] = totalUpper;
  userInfo['upperBonus'] = upperBonus;
  userInfo['upperTotal'] = totalUpper + upperBonus;
  userInfo['lowerTotal'] = totalLower;
  userInfo['grandTotal'] = totalGrand;
  userInfo['dice'] = die_list;
  userInfo['roll_count'] = roll_count;
  userInfo['turn_count'] = turn_count;
  if (roll_count == 0) { //if roll count is 0, ie no dice have been rolled, then the dice array will not have values so they are nulls
    userInfo['dice'] = ['null','null','null','null','null'];
  }
  console.log(userInfo['dice']);
  localStorage.setItem(person, JSON.stringify(userInfo)); //saves to local storage under name entered by user
}

function loadGame(){ //loads previous game
  //prompting name and JSON parsing it into an object after retreived
  var person = prompt("Please enter the name of the user under which the previous game was saved");
  var a = JSON.parse(localStorage.getItem(person));
  var weird = ['<','>','/','&','%','$','~']; //weird character we don't want
  var weirdnot = true;
  for (var i=0; i<weird.length; i++){ //determines if weird characters are included
    if (person.includes(weird[i])){
      weirdnot = false;
    }
  }
  if (weirdnot==false){ //if weird chars included, then error message
    document.getElementById('wrong').innerHTML = 'Invalid characters entered. Please try again.'
  }
  if (a == null){ //if a is null then there is nothing saved under that name so error
    document.getElementById('wrong').innerHTML = 'There is no file saved under this name. Please try again.';
  }
  else { //otherwise it loads the game
  document.getElementById('wrong').innerHTML = 'Nice! You have successfully loaded the game.';
  console.log(user.name);
  newGame(); //resets all fields
  //sets variables for this game equal to values from object with saved game info
  totalUpper = a['upper'];
  upperBonus = a['upperBonus'];
  totalLower = a['lowerTotal'];
  totalGrand = a['grandTotal'];
  die_list = a['dice'];
  updateScores(); //updates scores
  console.log(totalUpper);
  Object.keys(userInfo).forEach(function(a){console.log(userInfo[a]);});
  //only makes inputs into text with a number value IF the category was completed in the loaded game
  if (a.completed.includes('ones')){
    document.getElementById("aces_1").innerHTML = a['ones'];
  }
  if (a.completed.includes('twos')){
    document.getElementById("twos_2").innerHTML = a['twos'];
  }
  if (a.completed.includes('threes')){
    document.getElementById("threes_3").innerHTML = a['threes'];
  }
  if (a.completed.includes('fours')){
    document.getElementById("fours_4").innerHTML = a['fours'];
  }
  if (a.completed.includes('fives')){
    document.getElementById("fives_5").innerHTML = a['fives'];
  }
  if (a.completed.includes('sixes')){
    document.getElementById("sixes_6").innerHTML = a['sixes'];
  }
  if (a.completed.includes('threeKind')){
    document.getElementById("three_kind").innerHTML = a['threeKind'];
  }
  if (a.completed.includes('fourKind')){
    document.getElementById("four_kind").innerHTML = a['fourKind'];
  }
  if (a.completed.includes('fullHouse')){
    document.getElementById("full_house").innerHTML = a['fullHouse'];
  }
  if (a.completed.includes('smallStraight')){
    document.getElementById("small straight").innerHTML = a['smallStraight'];
  }
  if (a.completed.includes('largeStraight')){
    document.getElementById("large straight").innerHTML = a['largeStraight'];
  }
  if (a.completed.includes('yahtzee')){
    document.getElementById("yahtzee").innerHTML = a['yahtzee'];
  }
  if (a.completed.includes('chance')){
    document.getElementById("chance").innerHTML = a['chance'];
  }
  die_list = a['dice']; //value of dice
  if (die_list.includes('null')){ //if null in object, then makes it question marks
    for (var i=0; i<5; i++){
      document.getElementById('die_'+i).innerHTML = "<img src='images/question.png' width=40/>";
    }
  }
  else { //otherwise set dice to their values
    for (var i=0; i<5; i++){
      document.getElementById('die_'+i).innerHTML = dice_tags[die_list[i]-1];
    }
  }
  roll_count = a['roll_count']; //roll count
  turn_count = a['turn_count']; //set turn count
}
}

function newGame(){ //resetting everything when restarting new game
  roll_count = 0; //all back to 0
  turn_count = 0;
  totalUpper = 0;
  totalLower = 0;
  upperBonus = 0;
  totalGrand = 0;
  //resetting the score columns to input boxes
  document.getElementById("aces_1").innerHTML = "<input type='number' id='aces_score_value'/>"
  document.getElementById("twos_2").innerHTML = "<input type='number' id='twos_score_value'/>"
  document.getElementById("threes_3").innerHTML = "<input type='number' id='threes_score_value'/>"
  document.getElementById("fours_4").innerHTML = "<input type='number' id='fours_score_value'/>"
  document.getElementById("fives_5").innerHTML = "<input type='number' id='fives_score_value'/>"
  document.getElementById("sixes_6").innerHTML = "<input type='number' id='sixes_score_value'/>"
  document.getElementById("three_kind").innerHTML = "<input type='number' id='three_kind_score'/>"
  document.getElementById("four_kind").innerHTML = "<input type='number' id='four_kind_score'/>"
  document.getElementById("full_house").innerHTML = "<input type='number' id='full_house_score'/>"
  document.getElementById("small straight").innerHTML = "<input type='number' id='small_straight_score'/>"
  document.getElementById("large straight").innerHTML = "<input type='number' id='large_straight_score'/>"
  document.getElementById("yahtzee").innerHTML = "<input type='number' id='yahtzee_score'/>"
  document.getElementById("chance").innerHTML = "<input type='number' id='chance_score'/>"
  for (var i=0; i<5; i++){ //resetting dice to question marks
    document.getElementById('die_'+i).innerHTML = "<img src='images/question.png' width=40/>";
  }
  //functions to re-add event listeners for each category
  updateScores();
  getAces();
  getTwos();
  getThrees();
  getFours();
  getFives();
  getSixes();
  getThreeKind();
  getFourKind();
  getFullHouse();
  getSmallStraight();
  getLargeStraight();
  getYahtzee();
  getChance();
}

var user = {
  total_rolls: 0,
  turn_rolls: 2,
  dice: [1,2,3,3,4],
  name: "Gohde"
}
localStorage.setItem(user.name,JSON.stringify(user));
var objectVersion = JSON.parse(localStorage.getItem("Gohde"));
//var stringVersion = localStorage.getItem("Gohde");
//console.log(stringVersion.dice);
console.log(objectVersion.dice);
//console.log(stringVersion);
console.log(objectVersion);



console.log(roll_button);

roll_button.addEventListener('click',function(){ //event listener for clicking on button
  die_list = [];
  console.log("roll_button clicked");
  for(var i=0; i<5; i++){
    var keep = document.getElementById("die"+i);
    console.log(keep);
    //if die is not reserved and roll count and turn count are not too high then randomly generate a value for it
    if (document.getElementById("die_"+i).getAttribute('class')!='clicked' && roll_count<4 && turn_count!=11) {
      var diceValue = Math.floor(6*Math.random());
      document.getElementById("die_"+i).innerHTML=dice_tags[diceValue]
      die_list.push(diceValue+1);
      console.log(die_list);
  }
  //otherwise if it is reserved then just use reserved value
    else if (document.getElementById("die_"+i).getAttribute('class')=='clicked' && roll_count<4 && turn_count!=11){
      var p = document.getElementById("die_"+i).innerHTML;
      console.log(p);
      for (var j = 0; j<dice_tags2.length; j++){
        console.log(dice_tags2[j]);
        if (p==dice_tags2[j]){
          die_list.push(j+1);
          console.log(j+1);
        }
      }
    }
    else { //otherwise keep value in the array
      var p = document.getElementById("die_"+i).innerHTML;
      console.log(p);
      for (var j = 0; j<dice_tags2.length; j++){
        console.log(dice_tags2[j]);
        if (p==dice_tags2[j]){
          die_list.push(j+1);
          console.log(j+1);
        }
      }
    }
}
    if (roll_count>3){ //if reached max roll count then output error message
      document.getElementById('wrong').innerHTML = 'Maximum number of rolls reached this turn. Please enter a value.';
    }
    if (turn_count==11){ //really occurs after 12 turns, makes sure to stop the game
      document.getElementById('wrong').innerHTML = 'Maximum number of turns reached this game. Would you like to start a new game? Click on the \'New Game\' button';
    }
});

for (var i=0; i<5; i++){ //event listener for dice
  var die = document.getElementById("die_"+i);
  die.addEventListener('click',function(){
    //if statement to see if clicked already or not clicked yet and if it has question mark then can't reserve
    if (this.getAttribute("class")=="not_clicked" && !(this.innerHTML.includes('question'))){
      this.setAttribute("class","clicked"); //in css it will change to shaded since it's reserved
    }
    else {
      this.setAttribute("class","not_clicked");
    }
  })
}

var dice_tags = [ //array of dice tags to go through during for loops
  '<img src="images/one.svg" width=40/>',
  '<img src="images/two.svg" width=40/>',
  '<img src="images/three.svg" width=40/>',
  '<img src="images/four.svg" width=40/>',
  '<img src="images/five.svg" width=40/>',
  '<img src="images/six.svg" width=40/>'
]

var dice_tags2 = [ //array of dice tags
  '<img src="images/one.svg" width="40/">',
  '<img src="images/two.svg" width="40/">',
  '<img src="images/three.svg" width="40/">',
  '<img src="images/four.svg" width="40/">',
  '<img src="images/five.svg" width="40/">',
  '<img src="images/six.svg" width="40/">'
]


var diffCategories = ['aces','twos','threes','fours','fives','sixes'];
var upperScore = 0;
//var upperBonus = 0;
var lowerScore = 0;

function update(){ //update called when rolling dice
  roll_count++; //increment roll count by one
  console.log(roll_count);
}

function updateScores(){ //updating scores
  if (totalUpper>=63){ //bonus is 35 under correct circumstances
    upperBonus = 35;
    document.getElementById('upper_score_bonus').innerHTML = upperBonus;
  }
  //adjusts values of all score totals
  document.getElementById('upper_score').innerHTML = totalUpper;
  document.getElementById('upper_score_total').innerHTML = totalUpper+upperBonus;
  document.getElementById('upper_score_total1').innerHTML = totalUpper+upperBonus;
  document.getElementById('lower_score_total').innerHTML = totalLower;
  totalGrand = totalUpper + upperBonus + totalLower;
  document.getElementById('grand_total').innerHTML = totalGrand;
  for (var i=0; i<5; i++){
    var a = document.getElementById('die_'+i); //every dice is no longer reserved
    a.setAttribute('class','not_clicked');
  }
  turn_count++; //increments turn count by 1 bc called only when inputted score is valid
  roll_count = 0; //restart roll count
}

function errorMessage(){ //called to show the value was invalid with a message
  document.getElementById('wrong').innerHTML = 'Value entered is invalid. Please try again. Good luck!';
}

function deleteErrorMessage(){ //deletes error message
  document.getElementById('wrong').innerHTML = 'Great job! Keep going!';
}

//for upper event listeners:
//check if value makes sense with dice rolled, but allow less than ideal scores to be entered ie if value mod name of that category == 0 and less than sum of that number die then the value is allowed
//0 is a valid input
//if correct, then change input box to text with the value, update scores, remove error, and add to completed category
//if not correct, then error message


//aces event listener
function getAces(){
var aces = document.getElementById("aces_score_value");
aces.addEventListener('mouseout',function(){
  console.log('ones');
  var correct = true;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  if (value==false){
    console.log('WRONG');
    correct = false;
  }
  if (value>5 || value<0){
    console.log('WRONG');
    correct = false;
  }
  var counter = 0;
  for (var i=0; i<6; i++){
    if (die_list[i]==1){
      counter++;
    }
  }
  if (counter<value){
    console.log('WRONG');
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('aces_1');
    elem.innerHTML = value;
    console.log('Works');
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalUpper+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('ones');
  }
  else errorMessage();
});
}

//twos event listener
function getTwos(){
var twos = document.getElementById("twos_score_value");
twos.addEventListener('mouseout',function(){
  console.log('twos');
  var correct = true;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  if (value==false){
    console.log('WRONG');
    correct = false;
  }
  if (value%2!=0){
    console.log('WRONG');
    correct = false;
  }
  if (value>10 || value<0){
    console.log('WRONG');
    correct = false;
  }
  var counter = 0;
  for (var i=0; i<6; i++){
    if (die_list[i]==2){
      counter++;
    }
  }
  if ((counter*2)<value){
    console.log('WRONG');
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('twos_2');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalUpper+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('twos');
  }
  else errorMessage();
});
}

//threes event listener
function getThrees(){
var threes = document.getElementById("threes_score_value");
threes.addEventListener('mouseout',function(){
  console.log('threes');
  var correct = true;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  if (value==false){
    console.log('WRONG');
    correct = false;
  }
  if (value%3!=0){
    console.log('WRONG');
    correct = false;
  }
  if (value>15 || value<0){
    console.log('WRONG');
    correct = false;
  }
  var counter = 0;
  for (var i=0; i<6; i++){
    if (die_list[i]==3){
      counter++;
    }
  }
  if ((counter*3)<value){
    console.log('WRONG');
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('threes_3');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalUpper+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('threes');
  }
  else errorMessage();
});
}

//fours event listener
function getFours(){
var fours = document.getElementById("fours_score_value");
fours.addEventListener('mouseout',function(){
  console.log('fours');
  var correct = true;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  if (value==false){
    console.log('WRONG');
    correct = false;
  }
  if (value%4!=0){
    console.log('WRONG');
    correct = false;
  }
  if (value>20 || value<0){
    console.log('WRONG');
    correct = false;
  }
  var counter = 0;
  for (var i=0; i<6; i++){
    if (die_list[i]==4){
      counter++;
    }
  }
  if ((counter*4)<value){
    console.log('WRONG');
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('fours_4');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalUpper+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('fours');
  }
  else errorMessage();
});
}

//fives event listener
function getFives(){
var fives = document.getElementById("fives_score_value");
fives.addEventListener('mouseout',function(){
  console.log('fives');
  var correct = true;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  if (value==false){
    console.log('WRONG');
    correct = false;
  }
  if (value%5!=0){
    console.log('WRONG');
    correct = false;
  }
  if (value>25 || value<0){
    console.log('WRONG');
    correct = false;
  }
  var counter = 0;
  for (var i=0; i<6; i++){
    if (die_list[i]==5){
      counter++;
    }
  }
  if ((counter*5)<value){
    console.log('WRONG');
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('fives_5');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalUpper+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('fives');
  }
  else errorMessage();
});
}

//sixes event listener
function getSixes(){
var sixes = document.getElementById("sixes_score_value");
sixes.addEventListener('mouseout',function(){
  console.log('sixes');
  var correct = true;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  if (value==false){
    console.log('WRONG');
    correct = false;
  }
  if (value%6!=0){
    console.log('WRONG');
    correct = false;
  }
  if (value>30 || value<0){
    console.log('WRONG');
    correct = false;
  }
  var counter = 0;
  for (var i=0; i<6; i++){
    if (die_list[i]==6){
      counter++;
    }
  }
  if ((counter*6)<value){
    console.log('WRONG');
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('sixes_6');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalUpper+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('sixes');
  }
  else errorMessage();
});
}


//three of a kind event listener
function getThreeKind(){
var three_kind = document.getElementById("three_kind_score");
three_kind.addEventListener('mouseout',function(){
  console.log('three of a kind');
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  if (value>30){
    console.log('WRONG');
  }
  var correct = false;
  for (var i=0; i<6; i++){ //if 3 are the same then break and correct is true
    var counter = 0;
    for (var j=0; j<6; j++){
      if (die_list[i]==die_list[j]){
        counter++;
      }
      if (counter == 3){
        correct = true;
        break;
      }
    }
    if (counter == 3){
      break;
    }
  }
  console.log(counter);
  dicesum = die_list.reduce(function(a,b){return a+b},0);
  console.log(die_list.reduce(function(a,b){return a+b},0));
  if (value != dicesum){ //check against dicevalue total
    correct = false;
  }
  if (value == false){
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('three_kind');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalLower+=parseInt(value);
    updateScores
    deleteErrorMessage();
    completed.push('threeKind');
  }
  else errorMessage();
})
}

//four of a kind event listener
//same as three of a kind but checks for 4 that are the same in the for loop
function getFourKind(){
var four_kind = document.getElementById("four_kind_score");
four_kind.addEventListener('mouseout',function(){
  console.log('four of a kind');
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  if (value>30){
    console.log('WRONG');
  }
  var correct = false;
  for (var i=0; i<6; i++){
    var counter = 0;
    for (var j=0; j<6; j++){
      if (die_list[i]==die_list[j]){
        counter++;
      }
      if (counter == 4){
        correct = true;
        break;
      }
    }
    if (counter == 4){
      break;
    }
  }
  dicesum = die_list.reduce(function(a,b){return a+b},0);
  console.log(die_list.reduce(function(a,b){return a+b},0));
  if (value != dicesum){
    correct = false;
  }
  if (value == false){
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('four_kind');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalLower+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('fourKind');
  }
  else errorMessage();
})
}

//small straight event listener
//check that there are 4 consecutive values in array dice
//check inputted value is 30
//score update and error messages same as before
function getSmallStraight(){
var small_straight = document.getElementById("small_straight_score");
small_straight.addEventListener('mouseout',function(){
  console.log('small straight');
  var correct = false;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  var correct_answer1 = [1,2,3,4];
  var correct_answer2 = [2,3,4,5];
  var correct_answer3 = [3,4,5,6];
  if (die_list.includes(1) && die_list.includes(2) && die_list.includes(3) && die_list.includes(4)){
    correct = true;
  }
  else if (die_list.includes(2) && die_list.includes(3) && die_list.includes(4) && die_list.includes(5)){
    correct = true;
  }
  else if (die_list.includes(3) && die_list.includes(4) && die_list.includes(5) && die_list.includes(6)){
    correct = true;
  }
  else {
    correct = false;
  }
  if (value!=30){
    correct = false;
    console.log('WRONG');
  }
  if (correct == false){
    console.log('WRONG');
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('small straight');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalLower+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('smallStraight');
  }
  else errorMessage();
})
}

//large straight event listener
//check that there are 5 consecutive values in array dice
//check inputted value is 40
//score update and error messages same as before
function getLargeStraight(){
var large_straight = document.getElementById("large_straight_score");
large_straight.addEventListener('mouseout',function(){
  console.log('large straight');
  var correct = false;
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  var correct_answer1 = [1,2,3,4,5];
  var correct_answer2 = [2,3,4,5,6];
  if (die_list.includes(1) && die_list.includes(2) && die_list.includes(3) && die_list.includes(4) && die_list.includes(5)){
    correct = true;
  }
  else if (die_list.includes(2) && die_list.includes(3) && die_list.includes(4) && die_list.includes(5) && die_list.includes(6)){
    correct = true;
  }
  else {
    correct = false;
  }
  if (value!=40){
    correct = false;
    console.log('WRONG');
  }
  if (correct == false){
    console.log('WRONG');
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('large straight');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalLower+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('largeStraight');
  }
  else errorMessage();
})
}

//full house event listener
//checks value inputted is 25
//same process as for three of a kind except checks for 3 same and 2 same in order to be valid
//score update and errors same as before
function getFullHouse(){
var full_house = document.getElementById("full_house_score");
console.log(full_house);
full_house.addEventListener('mouseout',function(){
  console.log('full house');
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  var correct1 = false;
  var correct2 = false;
  var answer1 = 0;
  var answer2 = 0;
  for (var i=0; i<5; i++){
    var counter = 0;
    for (var j=0; j<5; j++){
      if (die_list[i]==die_list[j]){
        counter++;
      }
      if (counter == 3){
        correct1 = true;
        answer1 = die_list[i];
        break;
      }
    }
    if (counter == 3){
      break;
    }
  }
  for (var m=0; m<5; m++){
    var counter2 = 0;
    for (var n=0; n<5; n++){
      if (die_list[m]==die_list[n] && (die_list[m]!=answer1)){
        counter2++;
      }
      if (counter2 == 2){
        correct2 = true;
        answer2 = die_list[m];
        break;
      }
    }
    if (counter2 == 2){
      break;
    }
  }
  if (value != 25){
    correct1 = false;
  }
  if (value === '0'){
    correct1 = true;
    correct2 = true;
  }
  if (correct1 == true && correct2 == true){
    var elem = document.getElementById('full_house');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalLower+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('fullHouse');
  }
  else errorMessage();
})
}

//yahtzee event listener
//checks that there are 5 in a row -- same logic as the straights
//checks that the score is 50
//score update and error messages are same as before
function getYahtzee(){
var yahtzee = document.getElementById("yahtzee_score");
yahtzee.addEventListener('mouseout',function(){
  console.log('yahtzee');
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  var correct = false;
  for (var i=0; i<6; i++){
    var counter = 0;
    for (var j=0; j<6; j++){
      if (die_list[i]==die_list[j]){
        counter++;
      }
      if (counter == 5){
        correct = true;
        break;
      }
    }
    if (counter == 5){
      break;
    }
  }
  if (value != 50){
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('yahtzee');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalLower+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('yahtzee');
  }
  else errorMessage();
})
}

//chance event listener
//checks that value entered matches value of dice
//same score update and error messages
function getChance(){
var chance = document.getElementById("chance_score");
chance.addEventListener('mouseout',function(){
  console.log('chance');
  var category_score = this.parentNode.id.charAt(this.parentNode.id.length-1);
  var value = this.value;
  console.log(category_score+": "+value);
  var correct = false;
  dicesum = die_list.reduce(function(a,b){return a+b},0);
  console.log(die_list.reduce(function(a,b){return a+b},0));
  if (value == dicesum){
    correct = true;
  }
  if (value == false){
    correct = false;
  }
  if (value === '0'){
    correct = true;
  }
  if (correct == true){
    var elem = document.getElementById('chance');
    elem.innerHTML = value;
    for (var k=0; k<5; k++){
      document.getElementById('die_'+k).innerHTML = '<img src="images/question.png" width=40/>';
    }
    totalLower+=parseInt(value);
    updateScores();
    deleteErrorMessage();
    completed.push('chance');
  }
  else errorMessage();
})
}


getAces();
getTwos();
getThrees();
getFours();
getFives();
getSixes();
getThreeKind();
getFourKind();
getFullHouse();
getSmallStraight();
getLargeStraight();
getYahtzee();
getChance();
