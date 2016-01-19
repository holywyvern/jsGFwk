var player = {
    id: 'player', visible: true, mouseClickId: -1,
    playerSpeed: 0.5,
    playerX: 100, playerY: 100, playerSize: 5,
    currentMouseX: 0, currentMouseY: 0,
    friction: 0.98, topSpeed: 5, speedX: 0, speedY: 0,
    
    keyboardHandler: function (delta) {
        var tempX = this.playerX,
            tempY = this.playerY;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            if (this.speedY > -this.topSpeed) {
                this.speedY -= this.playerSpeed;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            if (this.speedY < this.topSpeed) {
                this.speedY += this.playerSpeed;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            if (this.speedX > -this.topSpeed) {
                this.speedX -= this.playerSpeed;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            if (this.speedX < this.topSpeed) {
                this.speedX += this.playerSpeed;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.C]) {
            this.changeWeaponTimer.tick(delta);
        }
        
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        tempX += this.speedX;
        tempY += this.speedY;
        
        if (tempX > 0 && tempX < jsGFwk.settings.width - this.playerSize) {
            this.playerX = tempX;
        }
        
        if (tempY > 0 && tempY < jsGFwk.settings.height - this.playerSize) {
            this.playerY = tempY;
        }
    },
    
    init: function () {
        var self = this;  
        this.mouseMoveId = jsGFwk.IO.mouse.registerMove(function (coord) {			
            self.currentMouseX = coord.x;
            self.currentMouseY = coord.y;
		});
        
        this.changeWeaponTimer = new jsGFwk.Timer({
            action: function () {
                shots.switchShot();
                foreground.showMessage(shots.getShotName());
            }, tickTime: 0.5
        });
    },
    update: function (delta) {
        this.keyboardHandler(delta);
        shots.tick(delta);
    },
    draw: function (context) {
        context.beginPath();
        context.arc(this.playerX, this.playerY, this.playerSize, 0, 2 * Math.PI, false);
        context.fillStyle = 'gray';
        context.fill();
        context.closePath();
    }
};