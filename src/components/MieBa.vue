<template>
    <div class="content-mieba">
        <div :id='idName' ref="toimage-mieba" >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import html2canvas from "html2canvas"
    import   chancerand   from "chance"
    export default {
        name: "MieBa",
        props:['isDestory','idName'],
        data:function () {
            return {
                page:'MieBa',
            }
        },
        watch:{
            isDestory(value) {
               if(value === false) this.toCanvans()
               else{
                   console.log(55)
                   const imageBox = document.querySelector('#'+this.idName);
                   Array.from(imageBox.querySelectorAll(":not(.dust)")).map(el => {
                       el.classList.remove("quickFade");
                       el.classList.add("slowShow");
                   });
               }
            },
        },
        methods:{
            animateTransform(elem, sx, sy, angle, duration) {
                elem.animate(
                    [
                        { transform: "rotate(0) translate(0, 0)" },
                        {
                            transform: "rotate(" + angle + "deg) translate(" + sx + "px," + sy + "px)"
                        }
                    ],
                    {
                        duration: duration,
                        easing: "ease-in",
                        fill:'forwards'//运动后终止状态
                    }
                );
            },

            newCanvasFromImageData(imageDataArray, w, h) {
                const canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;
                const tempCtx = canvas.getContext("2d");
                tempCtx.putImageData(new ImageData(imageDataArray, w, h), 0, 0);
                return canvas;
            },
            weightedRandomDistrib(peak, count) {
                const change = new chancerand();
                const prob = [],
                    seq = [];
                for (let i = 0; i < count; i++) {
                    prob.push(Math.pow(count - Math.abs(peak - i), 6));
                    seq.push(i);
                }
                return chance.weighted(seq, prob);
            },
            copyImage(){
                let  imageDom = document.querySelector('#'+this.idName);
                html2canvas(imageDom,{
                    allowTaint: 0,
                    useCORS: true,
                    backgroundColor: "transparent"
                }).then(imageBox => {
                    const ctx = imageBox.getContext('2d');
                    const imageData = ctx.getImageData(
                        0,
                        0,
                        imageBox.width,
                        imageBox.height
                    );

                    const pixelArr = imageData.data

                    let canvas = document.createElement('canvas')
                    canvas.width = imageBox.width
                    canvas.height = imageBox.height
                    let tempCtx = canvas.getContext("2d")
                    tempCtx.putImageData(new ImageData(pixelArr, canvas.width, canvas.height), 0, 0);
                    imageDom.append(canvas)
                })

            },
            toCanvans(){
                const change = new chancerand();
                const imageBox = document.querySelector('#'+this.idName);
                html2canvas(imageBox,{
                    allowTaint: 0,
                    useCORS: true,
                    backgroundColor: "transparent",
                    scale:1
                }).then(canvas => {

                    const ctx = canvas.getContext('2d');
                    const imageData = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                    const pixelArr = imageData.data
                    const data = pixelArr.slice(0).fill(0);
//创建透明图像数组的个数，不能太小也不能太大hh。
                    const canvasCount = 30
//将透明图像数组复制多个
                    const imageDataArray = Array.from({ length: canvasCount }, () =>
                        data.slice(0)
                    );
//将原图像上的像素信息随机分配进不同的透明图象上，位置保持不变
                    for (let i = 0; i < pixelArr.length; i += 4) {
                        const p = Math.floor(i / pixelArr.length * canvasCount);
                        const a = imageDataArray[this.weightedRandomDistrib(p, canvasCount)];
                        //将像素信息放入随机到的透明图像数组中覆盖
                        a[i] = pixelArr[i];
                        a[i + 1] = pixelArr[i + 1];
                        a[i + 2] = pixelArr[i + 2];
                        a[i + 3] = pixelArr[i + 3];
                    }
                    for (let i = 0; i < canvasCount; i++) {
                        const c = this.newCanvasFromImageData(
                            imageDataArray[i],
                            canvas.width,
                            canvas.height
                        );
                        imageBox.appendChild(c);
                        c.classList.add("dust")
                        setTimeout(() => {
                            this.animateTransform(
                                c,
                                200,
                                -100,
                                change.integer({ min: -25, max: 25 }),
                                2000
                            );
                            c.classList.add("dust");
                            setTimeout(() => {
                                c.remove();
                            }, 2050);
                        }, 70 * i);

                    }

                    Array.from(imageBox.querySelectorAll(":not(.dust)")).map(el => {
                        el.classList.add("quickFade");
                    });
                    console.log("over ...")
                })
            }
        },
        created() {

        }
    }
</script>

<style >

    .content-mieba {
        position: relative;
    }
    .dust {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        filter: blur(0.05em);
    }

    .quickFade {
        animation: fadeout 1.0s linear forwards;
    }

    .slowShow{
        opacity: 0;
        animation: showin 2.8s linear forwards;
    }

    @keyframes showin {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeout {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

</style>