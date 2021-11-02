document.addEventListener("DOMContentLoaded", ()=>{

	const score = document.querySelector(".js-score");
	const infoGame = document.querySelector(".js-info_button");
	const startButton = document.querySelector(".js-start_button");

	const astronaftArr = [
		 "./png/astronaft_1.png",
		 "./png/astronaft_2.png",
		 "./png/astronaft_3.png",
		 "./png/astronaft_4.png",
		 "./png/astronaft_5.png",
		 "./png/astronaft_6.png",
	];

	const scoreCounter = (function () {
		let startSense = 0;
		return {
		    indexCounter: document.querySelector(".numberCounter"),
		    insert() {
		    	this.indexCounter.innerHTML = startSense
		    },
		    increace() {   
		    	startSense += 10;
		    	this.insert();
	    	}, 
		}
	})(); 

	const portalArr = document.querySelectorAll(".portal__item");
	class astronaftElement {
		constructor (container) {
			this.element = new Image();
			this.element.src = astronaftArr[Math.floor(astronaftArr.length * Math.random())];
			this.element.innerHTML = " ";
			this.element.classList.add("astronaft__item");
			container.appendChild (this.element);
			const astronaftElementClick = (event) => {
				event.stopPropagation();

				this.element.removeEventListener("click", astronaftElementClick);
				scoreCounter.increace();
				this.deletAstronaft();
			}
			this.element.addEventListener ("click", astronaftElementClick);
			this.timer = setTimeout (this.deletAstronaft.bind(this), 3000);
			this.cleanTimer();
		}
		deletAstronaft () {
			this.element.remove();
			this.element.removeEventListener("click", this.astronaftElementClick);
			missClick();
		}
		cleanTimer () {
			clearTimeout(this.timer);
		}
	}

	const astronaftController = {
		create() {
    		const astronaft = new astronaftElement (portalArr[Math.floor(portalArr.length * Math.random())]);
  		},
  		createIteration () {
  			this.creationInterval = setInterval(() => {
				astronaftController.create();
			} , 3500);
			this.timer = setTimeout(() => { clearInterval(this.creationInterval);}, 40000);
  		},
  		clean() {
  			clearInterval(this.creationInterval);
  			clearTimeout(this.timer);
  		},
	}

	startButton.addEventListener ("click", (event) => {
		astronaftController.createIteration ();
		event.stopPropagation();
		//startButton.style.display = "none";
		//scoreIndex.setStartVal();
		//healthIndex.setStartVal();
		//background.addEventListener("click", missClick);
	})
});