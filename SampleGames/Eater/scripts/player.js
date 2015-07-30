var Player = {
    id: 'player',
    visible: true,
    init: function init() {
        this.x = 10;
        this.y = 10;
        this.width = 19;
        this.height = 28;
        this.isVisible = true;
        this.speed = 5;
        this.speedX = 5;
        this.speedY = 5;
        this.topSpeed = 30;
        this.isBlocked = false;
        this.friction = 0.98;
        
        if (levels[gameConst.currentLevel].enableFriction) {
            this.speedX = 0;
            this.speedY = 0;
            this.handleKeyboard = this.handleKeyboardWithFriction;
            this.handlePad = this.handlePadWithFriction;
        } else {
            this.handleKeyboard = this.handleKeyboardWithoutFriction;
            this.handlePad = this.handlePadWithoutFriction;
        }
        
        jsGFwk.Sprites.eater.reset();
        
        this.walkingTimer = new jsGFwk.Timer({
			action: function () {
                jsGFwk.Sprites.eater.next();
			},
            tickTime: 0.2
		});
    },
    
    handleKeyboardWithFriction: function handleKeyboardWithFriction() {
        var movement = { x: 0, y: 0 };
        movement.x = this.x;
        movement.y = this.y;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            if (this.speedX < this.topSpeed) {
                this.speedX++;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            if (this.speedX > -this.topSpeed) {
                this.speedX--;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            if (this.speedY < this.topSpeed) {
                this.speedY++;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            if (this.speedY > -this.topSpeed) {
                this.speedY--;
            }
        }
        
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        movement.x += this.speedX;
        movement.y += this.speedY;
        
        return movement;
    },
    handleKeyboardWithoutFriction: function handleKeyboardWithoutFriction() {
        var movement = { x: 0, y: 0 };
        movement.x = this.x;
        movement.y = this.y;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            movement.x += this.speed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            movement.x -= this.speed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            movement.y += this.speed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            movement.y -= this.speed;
        }
        
        return movement;
    },

    handlePadWithFriction: function handlePadWithFriction(movement) {
        if (jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0] !== undefined) {
            var axisX = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].axes[0].toFixed(2);
            var axisY = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].axes[1].toFixed(2);
            
            if (axisX > 0) {
                if (this.speedX < this.topSpeed) {
                    this.speedX++;
                }
            } else if (axisX < 0) {
                if (this.speedX > -this.topSpeed) {
                    this.speedX--;
                }
            }
            
            if (axisY > 0) {
                if (this.speedY < this.topSpeed) {
                    this.speedY++;
                }
            } else if (axisY < 0) {
                if (this.speedY > -this.topSpeed) {
                    this.speedY--;
                }
            }
        }
        
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        movement.x += this.speedX;
        movement.y += this.speedY;
        
        return movement;
    },
    handlePadWithoutFriction: function handlePadWithoutFriction(movement) {
        if (jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0] !== undefined) {
            var axisX = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].axes[0].toFixed(2);
            var axisY = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].axes[1].toFixed(2);
            
            if (axisX > 0) {
                movement.x += this.speed;
            } else if (axisX < 0) {
                movement.x -= this.speed;
            }
            
            if (axisY > 0) {
                movement.y += this.speed;
            } else if (axisY < 0) {
                movement.y -= this.speed;
            }
        }
        
        return movement;
    },
    
    handleKeyboard: function handleKeyboard() {},
    handlePad: function handlePad(movement) {},
    checkMovement: function checkMovement(moveto) {
        if (moveto.x > 0 && moveto.x < gameConst.maxPlayerXReach()) {
            this.x = moveto.x;
        }
            
        if (moveto.y > 0 && moveto.y < gameConst.maxPlayerYReach()) {
            this.y = moveto.y;
        }
    },
    
    update: function update(delta) {
        if (!this.isBlocked) {
            this.walkingTimer.tick(delta);
            var moveto = this.handleKeyboard();
            moveto = this.handlePad(moveto);            
            this.checkMovement(moveto);
        }
    },
    draw: function draw(ctx) {
        this.isVisible && ctx.drawImage(jsGFwk.Sprites.eater.sprite.image, this.x, this.y);
    }
};