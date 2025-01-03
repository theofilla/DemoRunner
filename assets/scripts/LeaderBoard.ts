import { _decorator, Component, LabelComponent, Layout, LayoutComponent, Node } from 'cc';
//import { readFileSync } from 'fs';
const { ccclass, property } = _decorator;

@ccclass('LeaderBoard')
export class LeaderBoard extends Component {
    private inputData: any;

      @property({ type:Node, visible: true })
    public layout: Node = null;


    start() {
        this.loadInputData();
        this.populateLeaderBoard();
    }

     populateLeaderBoard()
    {
        for (let i = 0; i < this.inputData.length; i++) {
            const item = this.inputData[i];
            const row = new Node();
            row.parent = this.layout;
            row.addComponent(LayoutComponent);
            let rowLayout = row.getComponent(LayoutComponent);
            rowLayout.type = Layout.Type.HORIZONTAL;
            rowLayout.resizeMode = LayoutComponent.ResizeMode.CONTAINER;
            rowLayout.paddingLeft = 2;
            rowLayout.paddingRight = 2;
            rowLayout.spacingX = 5;
            const labelRank = new Node();
            labelRank.parent = row;
            labelRank.addComponent(LabelComponent);
            labelRank.getComponent(LabelComponent).string = item.rank.toString();

            const labelName = new Node();
            labelName.parent = row;
            labelName.addComponent(LabelComponent);
            labelName.getComponent(LabelComponent).string = item.name;

            const labelAmount= new Node();
            labelAmount.parent = row;
            labelAmount.addComponent(LabelComponent);
            labelAmount.getComponent(LabelComponent).string = item.amount_in_dollars.toString();
        }
    }

    loadInputData() {
        try {
           // const data = readFileSync('assets/scripts/inputs.json', 'utf8');
           
         const  data = [
            {
                "rank": 1,
                "name": "M Reddy",
                "amount_in_dollars": 1000
            },
            {
                "rank": 2,
                "name": "Theo Paul",
                "amount_in_dollars": 950
            },
            {
                "rank": 3,
                "name": "Alice Johnson",
                "amount_in_dollars": 900
            }
        ]
          // this.inputData = JSON.parse(data);
            this.inputData = data;
            console.log(this.inputData);
        } catch (err) {
            console.error('Error reading inputs.json:', err);
        }
    }

    update(deltaTime: number) {
        
    }
}


