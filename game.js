function Bear(){
    this.dBear = 100;
    this.htmlELement = document.getElementById("Bear");
    this.id = this.htmlELement.id;
    this.x = this.htmlELement.offsetLeft;
    this.y = this.htmlELement.offsetTop;

    this.move = function(xDir, yDir){
        this.x += this.dBear*xDir;
        this.y += this.dBear*yDir;
        this.display();
    }

    this.display = function(){
        this.htmlELement.style.left = this.x+"px";
        this.htmlELement.style.top = this.y+"py"; 
        this.htmlELement.style.display = "block";
    }
}

function start(){
    bear = new Bear();

    document.addEventListener("keydown", moveBear, false);
}

function moveBear(e){
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;

    if(e.keyCode == KEYUP){
        bear.move(0,-1);
    }

    if(e.keyCode == KEYDOWN){
        bear.move(0,1);
    }

    if(e.keyCode == KEYLEFT){
        bear.move(-1,0);
    }

    if(e.keyCode == KEYRIGHT){
        bear.move(1,0);
    }
}