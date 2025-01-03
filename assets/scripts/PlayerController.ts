
import { _decorator, BoxCollider2D, Collider, Input, input, EventKeyboard, EventTouch, KeyCode, Vec3, RigidBody, Component, RigidBody2D, Vec2, Label, director, ICollisionEvent, Contact2DType, dynamicAtlasManager } from 'cc';
import { ObstaclesManager } from './ObstaclesManager';
const { ccclass, property } = _decorator;

@ccclass
export default class PlayerControl extends Component {

    @property
    speed: number = 50; // Speed of the node movement

   
    minX: number = -450; // Minimum X boundary
    
    maxX: number = 500; // Maximum X boundary

    private _leftPressed: boolean = false;
    private _rightPressed: boolean = false;
    private _upPressed: boolean = false;
    private _downPressed: boolean = false;

    @property
    lives: number = 5;

    @property(Label)
    gameLabel: Label = null;

    @property(ObstaclesManager)
    obstacleMan: ObstaclesManager = null;
   
    minY: number = -900;
   
    maxY: number = 0;

    level  = 1;
    @property({type:Vec3,visible: true})
    originalPosition: Vec3 = new Vec3(-450,-180,0);
    gameInPlay: boolean = true;
  
    onLoad()
    {
        //this.originalPosition = this.node.position;
        this.scheduleOnce(()=>{
            this.gameLabel.node.active = false;
        }, 1);
    }
    
    
    start()
    {
        let collider = this.node.getComponent(BoxCollider2D);
        collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.startPlay(1);
    }

    enablePlayer()
    {
        // Listen for key down events
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        // Listen for key up events
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);   

    }

    startPlay(level: number)
    {
        this.obstacleMan.clearObstacles();
       
        this.gameInPlay = true;
        this.gameLabel.node.active = true;
        this.gameLabel.string = 'Level ' + level;
        this.scheduleOnce
        (()=>{
          this.gameLabel.node.active = false;
          this.obstacleMan.spawnObstacle(level);
          this.node.setPosition(this.originalPosition);
          this.enablePlayer();
        }, 1);
        
    }

    
    onCollisionEnter(event : ICollisionEvent)
    {
        // Access the other colliding object through 'event.otherCollider'
        console.log("Collision detected with:", event.otherCollider.node.name); 
        if(event.otherCollider.node.name == 'Obstacle'){
        this.lives--;
        this.node.position = this.originalPosition;
        if(this.lives <= 0)
        {
            this.gameLabel.node.active = true;
            this.gameLabel.string = 'Game Over';
            this.disablePlayer();
        }
        }
        // else if(event.otherCollider.node.name == 'Flag')
        // {
        //   this.nextLevel();
        // }
    }

    nextLevel()
    {
        if(this.gameInPlay ) return;
        this.level += 1;
        this.startPlay(this.level);
    }

    onDestroy() {
       this.disablePlayer();
    }

    disablePlayer()
    {
        // Unregister keyboard event listeners
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this._leftPressed = true;
                break;
            case KeyCode.ARROW_RIGHT:
                this._rightPressed = true;
                break;
            case KeyCode.ARROW_UP:
                this._upPressed = true;
                break;
            case KeyCode.ARROW_DOWN:
                this._downPressed = true;
                break;
            case KeyCode.SPACE:
                this._upPressed = true;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this._leftPressed = false;
                break;
            case KeyCode.ARROW_RIGHT:
                this._rightPressed = false;
                break;
            case KeyCode.ARROW_UP:
                this._upPressed = false;
                break;
            case KeyCode.SPACE:
                this._upPressed = false;
                break;
            case KeyCode.ARROW_DOWN:
                this._downPressed = false;
                break;
        }
    }


    
  
    update(dt: number) {
        let pos = this.node.position.x;
        if (this._leftPressed) {
            pos -= this.speed * dt;
            if (pos < this.minX) {
                pos = this.minX;
            }
            this.node.setPosition(new Vec3(pos, this.node.position.y, this.node.position.z));
        }

        if (this._rightPressed) {
            pos += this.speed * dt;
            if(pos >= this.maxX){
                this.node.setPosition(this.originalPosition)
            }
            else{
                this.node.setPosition(new Vec3(pos, this.node.position.y, this.node.position.z));
            }
        }

        
        if (this._upPressed) {
            if(this.node.position.y < this.maxY){
                pos = this.node.position.y;
                let origPos = pos;
                pos += this.speed * dt;
                this.node.setPosition(new Vec3(this.node.position.x, pos, this.node.position.z));
                this.node.getComponent(RigidBody2D).applyForceToCenter(new Vec2(0, pos), true);
                }
        }

        if (this._downPressed) {
            pos = this.node.position.y;
            pos -= this.speed * dt;
            //this.node.setPosition(new Vec3(this.node.position.x, pos, this.node.position.z));

        }

    }
}
