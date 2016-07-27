cc.Class({
    extends: cc.Component,

    properties: {

        
    },

    //此脚本加载在大地图上,检测碰撞,暂时未作任何操作
    
    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true; 
        cc.director.getCollisionManager().enabledDebugDraw = true;
        
    },
    
                
    onCollisionEnter: function (other, self) {
        
        //got shot...
        
        
        //console.log('onCollisionEnter');
    },
    
    onCollisionStay: function (other, self) {
        //console.log('on collision stay');
    },
    
    onCollisionExit: function (other, self) {
       //console.log('onCollisionExit');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
