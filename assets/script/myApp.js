cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node,
        },
        
        dir:0,
    },

   
   autoChangeDir: function(){
        this.dir++;
        if(this.dir > 7) this.dir=0;
        this.hero.getComponent('myHero').changeDirection(this.dir);

   },
   

    onLoad: function () {
        let self = this;
        
         
    
        self.node.on('mouseup', function(event){
        
           self.hero.getComponent('myHero').collision = false; 
           self.hero.getComponent('myHero').moveToPoint(event.getLocationX(), event.getLocationY());
        
            //self.hero.getComponent('myHero').node.y= event.getLocationY();
            
            
           // console.log(event.getLocationX() + ' ' + event.getLocationY());
           
            var visibleSize = cc.director.getVisibleSize();
            
            var Xindex = Math.floor(event.getLocationX()*3/visibleSize.width);
            var Yindex = 2 - Math.floor(event.getLocationY()*3/visibleSize.height);
            
            var dir = Xindex + Yindex;
            
            if(Xindex == 1 && Yindex == 1) return;
            
            if(Xindex < Yindex){
                dir = 8 - dir;
            }
            
            self.hero.getComponent('myHero').changeDirection(dir);
            
            var customEvent = new cc.Event.EventCustom();
            
            for(var item in customEvent){
                console.log(item + ' ' + customEvent[item]);
            }
        });
        //cc.repeatForever(this.autoChangeDir());
//        this.schedule(function(){        this.dir++;
//        if(this.dir > 7) this.dir=0;
//        this.hero.getComponent('myHero').changeDirection(this.dir);
//       },1);
        //this.schedule(this.autoChangeDir(),1); 
    

        
    },
    
    

    
    
    update: function (dt) {
        //console.log('dt is' + dt);
        
        /*
        this.dir++;
        if(this.dir > 7) this.dir=0;

        this.hero.getComponent('myHero').changeDirection(this.dir);
          */  
        
    },

});
