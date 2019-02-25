import Vector from './lib/Vector';

/**
 * requestAnimationFrame
 */
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                // 60 fps
                window.setTimeout(callback, 1000 / 60);
            };
})();

// 角度換算弧度
function angleToRadian(angle) {
    return angle * Math.PI / 180;
}

// 弧度換算角度
function radianToAngle(radian) {
    return radian * 180 / Math.PI;
}

window.onload = function () {
    const canvas = document.getElementById('canvas'),
          bufferCvs = document.createElement('canvas'),
          time = document.getElementById('time'),
          BACKGROUND_COLOR = 'darkgreen';
    
    let ctx, bufferCtx, screenWidth, screenHeight, grad , center;

    // 固定save, beginPath, restore
    function draw (ctx, f) {
        ctx.save();
        ctx.beginPath();
        f(ctx);
        ctx.restore();
    }

    var drawLine = (ctx, pointA, pointB, style) => {
        style = style || {};
        draw(ctx, (ctx) => {
            ctx.strokeStyle = style.color || 'rgba(255,255,255, .1)';
            if(style.lineDash) //[5, 15]
                ctx.setLineDash(style.lineDash); 
            ctx.lineWidth = style.lineWidth || 1;
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);
            ctx.stroke();
        })
    }

    var fillCanvas = (ctx, color) => {
        draw(ctx, (ctx) => {
            ctx.fillStyle = color;
            ctx.fillRect(-center.x, -center.y, screenWidth, screenHeight);
        })
    }

    var resetBase = () => {
        ctx.restore();
        // 設定基底
        fillCanvas(ctx, BACKGROUND_COLOR);
        fillCanvas(ctx, grad);
        // 瞄準線
        drawLine(ctx, {x: -center.x, y: 0}, {x: center.x * 2, y: 0});
        drawLine(ctx, {x: 0, y: -center.y}, {x: 0, y: center.y *2});

        clear(bufferCtx);
        // 刻度
        draw(bufferCtx, function (ctx) {
            ctx.strokeStyle = ctx.fillStyle = '#fff';
            ctx.font = "15px Arial";
            for(let count=60, i=0, r=300; i<count;i++) {
                let deg = angleToRadian( i * (360 / count) );
                let scale = .01 + 
                        ((i % 5 == 0) ? .01 : 0) +
                        ((i % 15 == 0) ? .02 : 0),
                    basePoint = Vector(r * Math.cos(deg), r * Math.sin(deg));

                drawLine(
                    ctx, 
                    basePoint, 
                    Vector.scale(basePoint, 1 + scale)
                )
                ctx.stroke();
                
                // 每九十度顯示數字
                if(radianToAngle( deg ) % 90 == 0) {
                    let font = Vector.scale(basePoint, 1 - scale * 1.5);
                    ctx.fillText(`${radianToAngle( deg ) * 1 / 30 + 3}`, font.x - 15 / 2, font.y + 15 / 2);
                }
            }
        })

        ctx.drawImage(bufferCvs, -center.x, -center.y)
    }

    function resize(e) {
        screenWidth  = canvas.width  = window.innerWidth;
        screenHeight = canvas.height = window.innerHeight;
        bufferCvs.width  = screenWidth;
        bufferCvs.height = screenHeight;
        ctx = canvas.getContext('2d');
        bufferCtx = bufferCvs.getContext('2d');
        
        center = Vector(screenWidth * 0.5, screenHeight * 0.5);
        
        // 方便畫圖 -> 之後(0,0)為中心點
        ctx.translate(center.x, center.y);
        bufferCtx.translate(center.x, center.y);

        grad = ctx.createRadialGradient(0, 0, 0, 0, 0, center.length);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(1, 'rgba(0, 0, 0, .35)');
        
        // resetBase();
    }

    function clear(ctx) {
        ctx.clearRect(-center.x, -center.y, canvas.width, canvas.height)
    }

    window.addEventListener('resize', resize, false);
    resize(null);
    
    var loop = function(t) {
        resetBase();
        // 取得時間
        var now = new Date(),//now
            then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0),//midnight
            diffInMil = (now.getTime() - then.getTime()),// difference in milliseconds
            h = (diffInMil/(1000*60*60)),//hours
            m = (h*60),//minutes
            s = (m*60);//seconds

        // 畫出波動狀圓形外圍
        draw(ctx, function (ctx) {
            for(let count=360, i=0, r=250; i<=count;i++) {
                //Math.cos -> 波動型狀 -> 要是2PI的倍數(一個週期)否則週期不完整
                let nowR = r + 3*Math.cos(2 * Math.PI * ( i / 10 + t/500 ) );
                let deg = angleToRadian( i * (360 / count) );
                ctx.lineTo(
                    nowR * Math.cos(deg),
                    nowR * Math.sin(deg)
                );
            }
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        });

        // 秒針
        let sDeg = angleToRadian( -90 + (s * 6) ),
            sR = 300;
        drawLine(ctx, Vector(0, 0), {
            x: sR * Math.cos(sDeg),
            y: sR * Math.sin(sDeg)
        }, {
            color: '#fff'
        })

        // 分針
        let mDeg = angleToRadian( -90 + (m * 6) ),
            mR = 200;
        drawLine(ctx, Vector(0, 0), {
            x: mR * Math.cos(mDeg),
            y: mR * Math.sin(mDeg)
        }, {
            color: '#fff',
            lineWidth: 2
        })

        // 時針
        let hDeg = angleToRadian( -90 + (h * 30) ),
            hR = 150;
        drawLine(ctx, Vector(0, 0), {
            x: hR * Math.cos(hDeg),
            y: hR * Math.sin(hDeg)
        }, {
            color: '#fff',
            lineWidth: 4
        })

        time.innerText = `+00:${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        // ctx.drawImage(bufferCvs, -center.x, -center.y);
        window.requestAnimationFrame(loop)
    };
    
    loop();
};