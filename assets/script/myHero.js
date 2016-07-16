cc.Class({
    extends: cc.Component,

    properties: {
       
        AnimName : '',
        
        loc: cc.v2(0, 0),
        
        collision : false,
        
        reachedTarget : false,
        
        bullet: {
            default: null,
            type: cc.Node
        }
        
    },
    
    changeDirection: function(dir){
        this.getComponent(cc.Animation).play(this.AnimName + dir);
        
    },

   moveToPoint(x,y){
     this.loc.x = x;
     this.loc.y = y;
     
     //cc.moveTo(1,cc.p(x, y));
     if (!this.collision)
          this.node.runAction( cc.moveTo(1,cc.p(x, y)));
          
    //this.fire(this.loc);

   },

    onLoad: function () {
         cc.director.getCollisionManager().enabled = true;  
    },
    
    fire: function(loc){
         var scene = cc.director.getScene();  
         var touchLoc = loc;
         var bullet = cc.instantiate(this.bullet);
         //bullet.hero = this;
         bullet.position = touchLoc;
         bullet.active = true;
         scene.addChild(bullet);
    },
    
    refire: function(){
        if (this.reachedTarget){
          var stopLoc = cc.v2(this.node.x, this.node.y);
          this.fire(stopLoc);
        }
    },
    
    onCollisionEnter: function (other, self) {
        //console.log('onCollisionEnter ' + self.tag);
        
        if (self.tag == 11){
          this.collision = true;
          this.node.stopAllActions();
        } else if ((self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3))){
            this.reachedTarget = true;
            var stopLoc = cc.v2(this.node.x, this.node.y);
            this.fire(stopLoc);
        }
    },
    
    onCollisionStay: function (other, self) {
        
        if (self.tag == 1){
          this.collision = true;
        
          var otherAabb = other.world.aabb;
          var selfAabb = self.world.aabb.clone();
          var preAabb = self.world.preAabb;
        
          //selfAabb.x = preAabb.x;
          //selfAabb.y = preAabb.y;
        
          //selfAabb.x = self.world.aabb.x;
          if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (selfAabb.xMax > otherAabb.xMax) {
                this.node.x += 1;
            }
            else if (selfAabb.xMin < otherAabb.xMin) {
                this.node.x -= 1;
            }

          }

          selfAabb.y = self.world.aabb.y;
          if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (selfAabb.yMax > otherAabb.yMax) {
                this.node.y += 1;

            }
            else if (selfAabb.yMin < otherAabb.yMin) {
                this.node.y -= 1;
            }

          }    
          //this.node.y -= 1;
          //this.node.stopAllActions();
        }else if ((self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3))){
          this.reachedTarget = true;
      }
    },
    
    onCollisionExit: function (other, self) {
      if (self.tag == 1){
       this.collision = false;
      } else if ((self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3))){
        this.reachedTarget = false;
      }
    },

    
    update: function (dt) {
 /*       
        if (!this.collision){
         if (Math.floor(this.node.x) != Math.floor(this.loc.x)){
            if (this.loc.x - this.node.x < 0)
              this.node.x--;
            else 
              this.node.x++;
              
           // console.log('x=' + this.node.x);
         }
        
          if (Math.floor(this.node.y) != Math.floor(this.loc.y)){
            if (this.loc.y - this.node.y < 0)
              this.node.y--;
            else 
              this.node.y++;
              
           // console.log('y=' + this.node.y);
          }
        }
        */
    },

});
