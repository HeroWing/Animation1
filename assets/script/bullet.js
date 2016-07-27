cc.Class({
    extends: cc.Component,

    properties: {
        speed: 300,
        
        dest: cc.v2(0, 0),
        
        hero: {
            default: null,
            type: cc.Node,
        },
                    
        arrow_hit: {
        default: null,
        url: cc.AudioClip
        },
        
        
    },

    fireToDest: function(d){
        this.dest = d;
        
        var destance = Math.sqrt((d.x - this.node.position.x) * (d.x - this.node.position.x) +
                                  (d.y - this.node.position.y) * (d.y - this.node.position.y));
        this.node.runAction(cc.moveTo(destance/this.speed,d));
    },

    // use this for initialization
    onLoad: function () {

    },

    //子弹碰到敌方建筑，销毁并开火（待改进）
    onCollisionEnter: function (other, self) {
        if (other.tag == 1 || other.tag == 2 || other.tag == 3 || other.tag == 4){
           cc.audioEngine.playEffect(this.arrow_hit, false);
           this.node.destroy();
           
           //不是打到墙。。。
           if (other.tag != 4){
               this.hero.getComponent('myHero').refire();
           }
           
        }
    },
    
    
    onCollisionStay: function (other) {
        //console.log('on collision stay');
    },
    
    onCollisionExit: function () {
       //console.log('onCollisionExit');
    },
    
    // called every frame, uncomment this function to activate update callback
    //子弹发射（待改进）
    update: function (dt) {

        //this.node.y += this.speed * dt * this.k;
    },
});
