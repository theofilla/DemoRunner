import { _decorator, Component, Node, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObstaclesManager')
export class ObstaclesManager extends Component {

    @property({ type: [Node], visible: true })
    public obstacles: Node[] = [];

    @property({visible: true })
     minX = 0;
     @property({visible: true })
     maxX = 500;
    @property({visible: true })
     minY = 100 ;
    @property({visible: true })
     maxY = 155;

    start() {
       
    }

    public clearObstacles() {  
        this.node.removeAllChildren();
    }


    public spawnObstacle(level:number) {

        while(level > 0){
        this.spawn();
        level--;
        }
       
    }
    spawn()
    {
        let randomIndex = Math.floor(Math.random() * this.obstacles.length);
        let randomObstacle = this.obstacles[randomIndex];
        let obstacle = instantiate(randomObstacle);
        obstacle.parent = this.node;
        obstacle.setPosition(0, 0);
        let randomX = Math.random() * (this.maxX - this.minX) + this.minX;
        let randomY = Math.random() * (this.maxY - this.minY) + this.minY;
        obstacle.setPosition(randomX, randomY);
    }

    update(deltaTime: number) {
     
        
    }
}


