document.addEventListener("DOMContentLoaded", ()=>{

	const score = document.querySelector(".js-score");
	const infoGame = document.querySelector(".js-info_button");
	const startButton = document.querySelector(".js-start_button");
	const infoBackground = document.querySelector(".article__fon-message");

	let giveInfo = function () {
		infoBackground.classList.toggle("hidden");
	};

	infoGame.addEventListener("click", giveInfo);
	infoBackground.addEventListener("click", giveInfo);

	const astronautArr = [
		 "./png/astronaut_1.png",
		 "./png/astronaut_2.png",
		 "./png/astronaut_3.png",
		 "./png/astronaut_4.png",
		 "./png/astronaut_5.png",
		 "./png/astronaut_6.png",
	];

	const START_VALUE = 2000;

	const scoreCounter = (function () {
		let value = 0;
		return {
		    indexCounter: document.querySelector(".numberCounter"),
		    insert() {
		    	this.indexCounter.innerHTML = value
		    },
		    increace() {   
		    	value += 10;
		    	this.insert();
	    	},
	    	getValue() {
	    		return value; 
	    	},
		}
	})(); 

	console.log(scoreCounter, "score");
	console.log(scoreCounter.getValue(), "value");
	const delay = () => START_VALUE - Math.floor(scoreCounter.getValue()/50)*300;

	console.log(delay);

	const portalArr = document.querySelectorAll(".portal__item");

	class astronautElement {
		constructor (container) {
			this.element = new Image();
			this.element.src = astronautArr[Math.floor(astronautArr.length * Math.random())];
			this.element.innerHTML = " ";
			this.element.classList.add("astronaut__item");
			container.appendChild (this.element);
			const astronautElementClick = (event) => {
				event.stopPropagation();
				scoreCounter.increace();
				this.deleteAstronaut();
				this.cleanTimer();
				this.element.removeEventListener("click", astronautElementClick);
			}
			this.element.addEventListener ("click", astronautElementClick);
			this.timer = setTimeout (this.deleteAstronaut.bind(this), delay()+100);
			console.log(delay());
		}
		deleteAstronaut () {
			this.element.remove();
			this.element.removeEventListener("click", this.astronautElementClick);
		}
		cleanTimer () {
			clearTimeout(this.timer);
		}
	}

	const astronautController = {
		create() {
    		const astronaut = new astronautElement (portalArr[Math.floor(portalArr.length * Math.random())]);
  		},
  		createIteration () {
  			this.creationInterval = setInterval(() => {
				astronautController.create();
			} , delay());
			this.timer = setTimeout(() => { clearInterval(this.creationInterval);}, 60000);
  		},
  		clean() {
  			clearInterval(this.creationInterval);
  			clearTimeout(this.timer);
  		},
	}

	startButton.addEventListener ("click", (event) => {
		astronautController.createIteration ();
		event.stopPropagation();
	})
});