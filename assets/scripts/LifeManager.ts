import { _decorator, Component, Node, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LifeManager')
export class LifeManager extends Component {

    @property
    lives: number = 5;
    @property({type:Node,visible: true})
    life: Node = null;
    resetLives()
    {
        this.lives = 5;
        for(let i = 0; i < this.lives; i++)
        {
            let node = instantiate(this.life);
            node.active = true;
            this.node.addChild(node);
        }
    }

    loseLife()
    {
        this.lives--;
        this.node.children[this.lives].destroy();
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


