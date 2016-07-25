cc.Class({
    "extends": cc.Component,

    properties: {
        lifeBar: {
            type: cc.ProgressBar,
            "default": null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {

        //got shot...
        if (other.tag == 33 && this.lifeBar.progress >= 0) {
            this.lifeBar.progress -= 0.18;

            if (this.lifeBar.progress <= 0) {
                this.node.destroy();
            }
        }

        //console.log('onCollisionEnter');
    },

    onCollisionStay: function onCollisionStay(other, self) {
        //console.log('on collision stay');
    },

    onCollisionExit: function onCollisionExit(other, self) {
        //console.log('onCollisionExit');
    }
});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },