/**
 * content：水印文本，用\n换行
 * font-size：字体大小
 * font-family：字体
 * font-style：字体风格
 * font-variant：字型
 * font-weight：字重
 * font-color：字体颜色
 * line-height：行高
 * height：高度
 * width：宽度
 * image：图片路径
 * image-height：图片高度
 * image-opacity：图片不透明度
 * image-width：图片宽度
 * rotate：旋转角度
 * text-align：文本对齐方式
 * x-gap：X轴间距
 * x-offset：X轴偏移
 * y-gap：Y轴间距
 * y-offset：Y轴偏移
 */

export class CanvasWay {
  constructor(watermark = {}) {
    this.watermark = {
      width: 32,
      height: 32,
      xGap: 10,
      yGap: 10,
      yOffset: 0,
      xOffset: 0,
      rotate: 0,
      textAlign: "left",
      imageOpacity: 1,
      fontSize: 14,
      fontStyle: "normal",
      fontVariant: "",
      fontWeight: 400,
      fontColor: "rgba(128, 128, 128, .3)",
      fontStretch: "",
      lineHeight: 30,
      ...watermark,
    };
    const { width, height } = watermark;
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
  }

  getRatio(context) {
    if (!context) {
      return 1;
    }
    const backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;
    return (window.devicePixelRatio || 1) / backingStore;
  }

  render() {
    var base64UrlRef;
    const {
      content,
      xGap,
      yGap,
      width,
      height,
      yOffset,
      xOffset,
      rotate,
      image,
      imageWidth,
      imageHeight,
      imageOpacity,
      fontColor,
      fontStyle,
      fontVariant,
      fontStretch,
      fontWeight,
      fontFamily,
      fontSize,
      textAlign,
      lineHeight,
    } = this.watermark;

    const ctx = this.canvas.getContext("2d");
    const ratio = this.getRatio(ctx);

    const canvasWidth = (xGap + width) * ratio;
    const canvasHeight = (yGap + height) * ratio;
    const canvasOffsetLeft = xOffset * ratio;
    const canvasOffsetTop = yOffset * ratio;
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    if (ctx) {
      ctx.translate(0, 0);
      // const markWidth = width * ratio;
      // const markHeight = height * ratio;
      ctx.rotate(rotate * (Math.PI / 180));
      if (image) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = image;
        img.onload = () => {
          ctx.globalAlpha = imageOpacity;
          ctx.drawImage(
            img,
            canvasOffsetLeft,
            canvasOffsetTop,
            (imageWidth || (imageHeight ? (img.width * imageHeight) / img.height : img.width)) * ratio,
            (imageHeight || (imageWidth ? (img.height * imageWidth) / img.width : img.height)) * ratio
          );
          base64UrlRef = this.canvas.toDataURL();
        };
      } else if (content) {
        ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${fontSize * ratio}px/${lineHeight * ratio}px ${fontFamily}`;
        ctx.fillStyle = fontColor;

        let maxWidth = 0;
        content
          .split("\n")
          .map((line) => {
            const width = ctx.measureText(line).width;
            maxWidth = Math.max(maxWidth, width);
            return { width, line };
          })
          .forEach(({ line, width }, index) => {
            const alignOffset = textAlign === "left" ? 0 : textAlign === "center" ? (maxWidth - width) / 2 : maxWidth - width;

            ctx.fillText(line, canvasOffsetLeft + alignOffset, canvasOffsetTop + lineHeight * ratio * (index + 1));
          });
        base64UrlRef = this.canvas.toDataURL();
      } else if (!content) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        base64UrlRef = this.canvas.toDataURL();
      }
    } else {
      alert("watermark", "Canvas is not supported in the browser.");
    }

    return base64UrlRef;

    ctx.clearRect(0, 0, width, height);

    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${font}`;
    /**
     * ctx.transform(a, b, c, d, e, f);
     * a:水平缩放
     * b:水平倾斜
     * c:垂直倾斜
     * d:垂直缩放
     * e:水平移动
     * f:垂直移动
     * ctx.createPattern:绘制重复的水印
     */
    ctx.transform(1, 0.5, -0.5, 1, 0, -height / 2);
    const waterMarkerWidth = ctx.measureText(txt).width;
    for (let i = 0; i < Math.ceil(height / y) * 2; i++) {
      for (let j = 0; j < Math.ceil(width / waterMarkerWidth) * 2; j++) {
        ctx.fillText(txt, j * (waterMarkerWidth + x), i * y);
      }
    }
    return this.canvas.toDataURL();
  }
}

export class SvgWay {
  constructor(watermark) {
    this.watermark = watermark;
  }

  render() {
    const { txt, x, y, width, height, color, font, fontSize, alpha, angle } = this.watermark;
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px">
                  <text x="${x}px" y="${y}px" dy="${fontSize}px"
                      text-anchor="start"
                      stroke="${color}"
                      stroke-opacity="${alpha}"
                      fill="none"
                      transform="rotate(${angle},${x} ${y})"
                      font-weight="100"
                      font-size="${fontSize}"
                      font-family="${font}"
                      >
                      ${txt}
                  </text>
              </svg>`;
    return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
  }
}
// base64转文件对象
export function dataURLtoBlob(dataurl, name) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], name, { type: mime });
}
