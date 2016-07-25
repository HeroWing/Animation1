cc.Class({
    extends: cc.Component,

    properties: {
        lifeBar: {
            type: cc.ProgressBar,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true; 
        
    },
    
                
    onCollisionEnter: function (other, self) {
        
        //got shot...
        if (other.tag == 33 && this.lifeBar.progress >= 0){
           this.lifeBar.progress -= 0.18;   
           
           if (this.lifeBar.progress <= 0){
               this.node.destroy();
           }
        }
        
        
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
