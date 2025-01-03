import { _decorator, BoxCollider, Component, ICollisionEvent, PolygonCollider2D } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class Object extends Component {

    start()
    {
           
        let collider = this.getComponent(PolygonCollider2D);
        if (collider) {
            collider.on('onCollisionEnter', this.onCollision, this);
            collider.on('onCollisionStay', this.onCollision, this);
            collider.on('onCollisionExit', this.onCollision, this);
        }

    }

    onLoad() {
        
     
    }

    onCollision(event: ICollisionEvent): void {
        console.log('on collision enter');  
        

    }
}