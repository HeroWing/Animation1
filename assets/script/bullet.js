cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100,
        
        hero: {
            default: null,
            type: cc.Node,
        },
    },
        

    // use this for initialization
    onLoad: function () {

    },

    //自带碰到敌方建筑，销毁并开火（待改进）
    onCollisionEnter: function (other, self) {
        if (other.tag == 1 || other.tag == 2 || other.tag == 3 || other.tag == 4){
           this.hero.getComponent('myHero').refire();
           this.node.destroy();
           
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
        this.node.y += this.speed * dt;
    },
});
