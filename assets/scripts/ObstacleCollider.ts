import { _decorator, BoxCollider2D, ICollisionEvent, PolygonCollider2D } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class Obstacle extends PolygonCollider2D { 

    start()
    {
        //this.on('onCollisionEnter', this.onCollision, this);
        this.enabled = true;
        this.on('OnCollisionEnter', this.onCollision, this);
    }

    onLoad() {
    }

    onCollision(event: ICollisionEvent): void {
        console.log('on collision enter');  
    }


   
}