import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { howler } from 'howler';
import './main.html';


Session.set("btnStatus", {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false});
Session.set("playSounds", []);
//Session.set("selections", {0: "Unison", 1: "Minor 2nd", 2: "Major 2nd", 3: "Minor 3rd", 4: "Major 3rd", 5: "Perfect 4th", 6: "Augmented 4th / Diminished 5th", 7: "Perfect 5th", 8: "Minor 6th", 9: "Major 6th", 10: "Minor 7th", 11: "Major 7th", 12: "Perfect 8th"});


//CONSTRUCT THE SOUND BANK
		var piano = new Howl({
  		src: ['cinterval.wav'],
  		sprite: {
  			1: [0, 600], 2: [600, 1200], 3: [1800, 1100], 4: [2800, 1100], 5: [3800, 1100], 6: [4800, 1100], 7: [5800, 1100], 8: [6800, 1100], 9: [7800, 1100], 10: [8800, 1100], 11: [9800, 1100], 12: [10800, 1100], 13: [11800, 1100], 14: [12800, 1100], 15: [13800, 1100], 16: [14800, 1100], 17: [15800, 1100], 18: [16800, 1100], 19: [17800, 1100], 20: [18800, 1100], 21: [19800, 1100], 22: [20800, 1100], 23: [21800, 1100], 24: [22800, 1100], 25: [23800, 1100], 26: [24800, 1100], 27: [25800, 1100], 28: [26800, 1100], 29: [27800, 1100], 30: [28800, 1100], 31: [29800, 1100], 32: [30800, 1100], 33: [31800, 1100], 34: [32800, 1100], 35: [33800, 1100], 36: [34800, 1100], 37: [35800, 1100], 38: [36800, 1100], 39: [37800, 1100], 40: [38800, 1100], 41: [39800, 1100], 42: [40800, 1100], 43: [41800, 1100], 44: [42800, 1100], 45: [43800, 1100], 46: [44800, 1100], 47: [45800, 1100], 48: [46800, 1100], 49: [47800, 1100], 50: [48800, 1100], 51: [49800, 1100], 52: [50800, 1100], 53: [51800, 1100], 54: [52800, 1100], 55: [53800, 1100], 56: [54800, 1100], 57: [55800, 1100], 58: [56800, 1100], 59: [57800, 1100], 60: [58800, 1100], 61: [59800, 1100]
   		}
		});


Tracker.autorun(function(){

	//If button status changes
	var btnStatus = Session.get("btnStatus"); //If btnStatus changes
	var choices = []; // lists all available options		

		for(var key in btnStatus) //for all elements in btnStatus
		{
			if(btnStatus[key]) //if any of them are true (selected)
			{
				choices.push(key); //add it to the array list of potential choices
			}
		}	

	var addtoPlay = Session.get("playSounds"); // Bring in session playSounds for updating
		addtoPlay = choices; // update with the new list of potential choices
		Session.set("playSounds", addtoPlay); //set addtoPlay as the new Session playSounds
});


Template.display.events({


	'click [name="start"]':function(event, template){
		console.log("you clicked me! do you want me to play?");
		var playList = Session.get("playSounds");

		template.$("#startBtn").css("visibility","hidden");
		template.$("")

		console.log("Length of playlist:  " + playList.length + playList[0]);


		var soundA = Math.floor(Math.random() * 49);
		soundA = soundA.toString();
		console.log(soundA);


		
			piano.play(soundA);
			piano.once('end', function(){
				piano.play("30");

	
				
			});
		
		
		template.$("#choiceA").css("visibility","visible");
		template.$("#choiceB").css("visibility", "visible");
		template.$("[name='selectable']").css("visibility", "hidden");
		template.$("#setupBtn").css("visibility", "visible");


	

		//var theChoice = Math.floor(Math.random() * choices.length);
		//theChoice = theChoice.toString();


	},

	'click [id="setupBtn"]': function(event, template){
		console.log('you clicked the setup btn!!');

		template.$("#setupBtn").css("visibility", "hidden");
		template.$("#startBtn").css("visibility", "visible");
		template.$("[name='selectable']").css("visibility", "visible");
		template.$("#choiceA").css("visibility","hidden");
		template.$("#choiceB").css("visibility", "hidden");

	},

	'click [name="soundA"]': function(event, template){
		event.preventDefault();

		console.log('you clicked me!');
		piano.play('6');
	},

	'click [name="soundB"]': function(event, template){
		event.preventDefault();

		console.log('you clicked me 2!');
		piano.play('12');
	},

	'click [name="selectable"]':function(event, template){
		event.preventDefault();
		
		var btnStatus = Session.get("btnStatus"); //Pull in current btnStatus session
		var selected = event.target.id; //Get the current button ID
		var changeThis = "#" + selected.toString(); //variable will be used to store the change being made


		btnStatus[selected] = !btnStatus[selected]; //make the current button status opposite

		if(btnStatus[selected]) //if the current button's new state is true
		{
			template.$(changeThis).css("background-color","orange");
			//template.$(changeThis).removeClass("btn btn-default");	
	 		//  template.$(changeThis).addClass("active"); //highlight the button
		}
		else// if not true
		{
			template.$(changeThis).css("background-color","white");
			//template.$(changeThis).removeClass("active"); //remove the highlight
			//template.$(changeThis).addClass("btn btn-default");
		}

		Session.set("btnStatus", btnStatus); //set the btnStatus session with the new status
	}
});

Template.display.helpers({


});