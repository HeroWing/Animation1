require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ColliderListener":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2b036fblJlOP7duKmsNBMvi', 'ColliderListener');
// script\ColliderListener.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other) {
        console.log('onCollisionEnter');
    },

    onCollisionStay: function onCollisionStay(other) {
        console.log('on collision stay');
    },

    onCollisionExit: function onCollisionExit() {
        console.log('onCollisionExit');
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"myApp":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b6154hikatLCLj6RGQ/tqOv', 'myApp');
// script\myApp.js

cc.Class({
    'extends': cc.Component,

    properties: {
        hero: {
            'default': null,
            type: cc.Node
        },

        dir: 0
    },

    autoChangeDir: function autoChangeDir() {
        this.dir++;
        if (this.dir > 7) this.dir = 0;
        this.hero.getComponent('myHero').changeDirection(this.dir);
    },

    onLoad: function onLoad() {
        var self = this;

        self.node.on('mouseup', function (event) {

            self.hero.getComponent('myHero').collision = false;
            self.hero.getComponent('myHero').moveToPoint(event.getLocationX(), event.getLocationY());

            //self.hero.getComponent('myHero').node.y= event.getLocationY();

            // console.log(event.getLocationX() + ' ' + event.getLocationY());

            var visibleSize = cc.director.getVisibleSize();

            var Xindex = Math.floor(event.getLocationX() * 3 / visibleSize.width);
            var Yindex = 2 - Math.floor(event.getLocationY() * 3 / visibleSize.height);

            var dir = Xindex + Yindex;

            if (Xindex == 1 && Yindex == 1) return;

            if (Xindex < Yindex) {
                dir = 8 - dir;
            }

            self.hero.getComponent('myHero').changeDirection(dir);

            var customEvent = new cc.Event.EventCustom();

            for (var item in customEvent) {
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

    update: function update(dt) {
        //console.log('dt is' + dt);

        /*
        this.dir++;
        if(this.dir > 7) this.dir=0;
          this.hero.getComponent('myHero').changeDirection(this.dir);
          */

    }

});

cc._RFpop();
},{}],"myHero":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7ca27vQcdtMc4HtI1wyQeFI', 'myHero');
// script\myHero.js

cc.Class({
    'extends': cc.Component,

    properties: {

        AnimName: '',

        loc: cc.v2(0, 0),

        collision: false

    },

    changeDirection: function changeDirection(dir) {
        this.getComponent(cc.Animation).play(this.AnimName + dir);
    },

    moveToPoint: function moveToPoint(x, y) {
        this.loc.x = x;
        this.loc.y = y;

        //cc.moveTo(1,cc.p(x, y));
        if (!this.collision) this.node.runAction(cc.moveTo(1, cc.p(x, y)));
    },

    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.collision = true;
        this.node.stopAllActions();
    },

    onCollisionStay: function onCollisionStay(other, self) {
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
            } else if (selfAabb.xMin < otherAabb.xMin) {
                this.node.x -= 1;
            }
        }

        selfAabb.y = self.world.aabb.y;
        if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (selfAabb.yMax > otherAabb.yMax) {
                this.node.y += 1;
            } else if (selfAabb.yMin < otherAabb.yMin) {
                this.node.y -= 1;
            }
        }
        //this.node.y -= 1;
        //this.node.stopAllActions();
    },

    onCollisionExit: function onCollisionExit() {
        this.collision = false;
    },

    update: function update(dt) {
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
    }

});

cc._RFpop();
},{}]},{},["ColliderListener","myHero","myApp"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0xlb24vQXBwRGF0YS9Mb2NhbC9Db2Nvc0NyZWF0b3IvYXBwLTEuMS4xL3Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdC9Db2xsaWRlckxpc3RlbmVyLmpzIiwiYXNzZXRzL3NjcmlwdC9teUFwcC5qcyIsImFzc2V0cy9zY3JpcHQvbXlIZXJvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcyYjAzNmZibEpsT1A3ZHVLbXNOQk12aScsICdDb2xsaWRlckxpc3RlbmVyJyk7XG4vLyBzY3JpcHRcXENvbGxpZGVyTGlzdGVuZXIuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnb25Db2xsaXNpb25FbnRlcicpO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnb24gY29sbGlzaW9uIHN0YXknKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbiBvbkNvbGxpc2lvbkV4aXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkNvbGxpc2lvbkV4aXQnKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdiNjE1NGhpa2F0TENMajZSR1EvdHFPdicsICdteUFwcCcpO1xuLy8gc2NyaXB0XFxteUFwcC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGhlcm86IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBkaXI6IDBcbiAgICB9LFxuXG4gICAgYXV0b0NoYW5nZURpcjogZnVuY3Rpb24gYXV0b0NoYW5nZURpcigpIHtcbiAgICAgICAgdGhpcy5kaXIrKztcbiAgICAgICAgaWYgKHRoaXMuZGlyID4gNykgdGhpcy5kaXIgPSAwO1xuICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHNlbGYubm9kZS5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICBzZWxmLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLm1vdmVUb1BvaW50KGV2ZW50LmdldExvY2F0aW9uWCgpLCBldmVudC5nZXRMb2NhdGlvblkoKSk7XG5cbiAgICAgICAgICAgIC8vc2VsZi5oZXJvLmdldENvbXBvbmVudCgnbXlIZXJvJykubm9kZS55PSBldmVudC5nZXRMb2NhdGlvblkoKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQuZ2V0TG9jYXRpb25YKCkgKyAnICcgKyBldmVudC5nZXRMb2NhdGlvblkoKSk7XG5cbiAgICAgICAgICAgIHZhciB2aXNpYmxlU2l6ZSA9IGNjLmRpcmVjdG9yLmdldFZpc2libGVTaXplKCk7XG5cbiAgICAgICAgICAgIHZhciBYaW5kZXggPSBNYXRoLmZsb29yKGV2ZW50LmdldExvY2F0aW9uWCgpICogMyAvIHZpc2libGVTaXplLndpZHRoKTtcbiAgICAgICAgICAgIHZhciBZaW5kZXggPSAyIC0gTWF0aC5mbG9vcihldmVudC5nZXRMb2NhdGlvblkoKSAqIDMgLyB2aXNpYmxlU2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgICAgICB2YXIgZGlyID0gWGluZGV4ICsgWWluZGV4O1xuXG4gICAgICAgICAgICBpZiAoWGluZGV4ID09IDEgJiYgWWluZGV4ID09IDEpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKFhpbmRleCA8IFlpbmRleCkge1xuICAgICAgICAgICAgICAgIGRpciA9IDggLSBkaXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbihkaXIpO1xuXG4gICAgICAgICAgICB2YXIgY3VzdG9tRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBjdXN0b21FdmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0gKyAnICcgKyBjdXN0b21FdmVudFtpdGVtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL2NjLnJlcGVhdEZvcmV2ZXIodGhpcy5hdXRvQ2hhbmdlRGlyKCkpO1xuICAgICAgICAvLyAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbigpeyAgICAgICAgdGhpcy5kaXIrKztcbiAgICAgICAgLy8gICAgICAgIGlmKHRoaXMuZGlyID4gNykgdGhpcy5kaXI9MDtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuaGVyby5nZXRDb21wb25lbnQoJ215SGVybycpLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcik7XG4gICAgICAgIC8vICAgICAgIH0sMSk7XG4gICAgICAgIC8vdGhpcy5zY2hlZHVsZSh0aGlzLmF1dG9DaGFuZ2VEaXIoKSwxKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZHQgaXMnICsgZHQpO1xuXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5kaXIrKztcclxuICAgICAgICBpZih0aGlzLmRpciA+IDcpIHRoaXMuZGlyPTA7XHJcbiAgICAgICAgICB0aGlzLmhlcm8uZ2V0Q29tcG9uZW50KCdteUhlcm8nKS5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXIpO1xyXG4gICAgICAgICAgKi9cblxuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3Y2EyN3ZRY2R0TWM0SHRJMXd5UWVGSScsICdteUhlcm8nKTtcbi8vIHNjcmlwdFxcbXlIZXJvLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBBbmltTmFtZTogJycsXG5cbiAgICAgICAgbG9jOiBjYy52MigwLCAwKSxcblxuICAgICAgICBjb2xsaXNpb246IGZhbHNlXG5cbiAgICB9LFxuXG4gICAgY2hhbmdlRGlyZWN0aW9uOiBmdW5jdGlvbiBjaGFuZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSh0aGlzLkFuaW1OYW1lICsgZGlyKTtcbiAgICB9LFxuXG4gICAgbW92ZVRvUG9pbnQ6IGZ1bmN0aW9uIG1vdmVUb1BvaW50KHgsIHkpIHtcbiAgICAgICAgdGhpcy5sb2MueCA9IHg7XG4gICAgICAgIHRoaXMubG9jLnkgPSB5O1xuXG4gICAgICAgIC8vY2MubW92ZVRvKDEsY2MucCh4LCB5KSk7XG4gICAgICAgIGlmICghdGhpcy5jb2xsaXNpb24pIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDEsIGNjLnAoeCwgeSkpKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlciwgc2VsZikge1xuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IHRydWU7XG5cbiAgICAgICAgdmFyIG90aGVyQWFiYiA9IG90aGVyLndvcmxkLmFhYmI7XG4gICAgICAgIHZhciBzZWxmQWFiYiA9IHNlbGYud29ybGQuYWFiYi5jbG9uZSgpO1xuICAgICAgICB2YXIgcHJlQWFiYiA9IHNlbGYud29ybGQucHJlQWFiYjtcblxuICAgICAgICAvL3NlbGZBYWJiLnggPSBwcmVBYWJiLng7XG4gICAgICAgIC8vc2VsZkFhYmIueSA9IHByZUFhYmIueTtcblxuICAgICAgICAvL3NlbGZBYWJiLnggPSBzZWxmLndvcmxkLmFhYmIueDtcbiAgICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChzZWxmQWFiYiwgb3RoZXJBYWJiKSkge1xuICAgICAgICAgICAgaWYgKHNlbGZBYWJiLnhNYXggPiBvdGhlckFhYmIueE1heCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGZBYWJiLnhNaW4gPCBvdGhlckFhYmIueE1pbikge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmQWFiYi55ID0gc2VsZi53b3JsZC5hYWJiLnk7XG4gICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3Qoc2VsZkFhYmIsIG90aGVyQWFiYikpIHtcbiAgICAgICAgICAgIGlmIChzZWxmQWFiYi55TWF4ID4gb3RoZXJBYWJiLnlNYXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxmQWFiYi55TWluIDwgb3RoZXJBYWJiLnlNaW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vdGhpcy5ub2RlLnkgLT0gMTtcbiAgICAgICAgLy90aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbiBvbkNvbGxpc2lvbkV4aXQoKSB7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIC8qICAgICAgIFxyXG4gICAgICAgICAgICAgICBpZiAoIXRoaXMuY29sbGlzaW9uKXtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMubm9kZS54KSAhPSBNYXRoLmZsb29yKHRoaXMubG9jLngpKXtcclxuICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYy54IC0gdGhpcy5ub2RlLnggPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueC0tO1xyXG4gICAgICAgICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLngrKztcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd4PScgKyB0aGlzLm5vZGUueCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMubm9kZS55KSAhPSBNYXRoLmZsb29yKHRoaXMubG9jLnkpKXtcclxuICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYy55IC0gdGhpcy5ub2RlLnkgPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueS0tO1xyXG4gICAgICAgICAgICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkrKztcclxuICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd5PScgKyB0aGlzLm5vZGUueSk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICovXG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7Il19
