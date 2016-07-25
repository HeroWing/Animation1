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
     
     //没有碰撞，可以移动
     if (!this.collision)
          this.node.runAction( cc.moveTo(1,cc.p(x, y)));
          
    //this.fire(this.loc);

   },

    onLoad: function () {
         cc.director.getCollisionManager().enabled = true;  
    },
    
    //开火，动态生成子弹
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
        
        //tag 11表示人物本身，33为子弹，除了碰到自己的子弹外，碰撞变量置为true，停止运动
        if (self.tag == 11 && other.tag != 33){
          this.collision = true;
          this.node.stopAllActions();
        } 
        
        //tag 22为攻击范围检测，1,2,3代表敌方建筑,满足开火条件
        if ((self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3))){
            this.reachedTarget = true;
            var stopLoc = cc.v2(this.node.x, this.node.y);
            this.fire(stopLoc);
        }
    },
    
    onCollisionStay: function (other, self) {
        
        //人物碰到除自己子弹外的物体，往相应反方向退一格，以避免碰撞后慢慢穿越物体。
        if (self.tag == 11 && other.tag != 33){
          this.collision = true;
        
          var otherAabb = other.world.aabb;
          var selfAabb = self.world.aabb.clone();
          var preAabb = self.world.preAabb;
        
          //selfAabb.x = preAabb.x;
          //selfAabb.y = preAabb.y;
        
          //selfAabb.x = self.world.aabb.x;
          if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            //左右碰撞，往x方向退格
            if (selfAabb.xMax > otherAabb.xMax) {
                this.node.x += 1;
            }
            else if (selfAabb.xMin < otherAabb.xMin) {
                this.node.x -= 1;
            }

          }
          
          //上下碰撞，y方向退格
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
        }
        
        //碰到敌方建筑，开火条件依然满足
        if ((self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3))){
          this.reachedTarget = true;
      }
    },
    
    onCollisionExit: function (other, self) {
      //碰撞结束，变量置为false，人物可以继续移动
      if (self.tag == 11 && other.tag != 33){
       this.collision = false;
      } 
      
      //离开攻击范围,变量置为false,结束攻击
      if ((self.tag == 22 && (other.tag == 1 || other.tag == 2 || other.tag == 3))){
        this.reachedTarget = false;
      }
    },

   //动画完成后的回调
   OnAnimitionEnd: function(){
       
       console.log('OnAnimitionEnd');
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
