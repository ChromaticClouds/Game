export type PlayerState = "idle" | "run" | "jump" | "slide";

export interface PlayerAnimation {
  frames: HTMLImageElement[]; // 각 상태별 프레임 이미지 배열
  frameInterval: number; // ms 단위
}

export interface PlayerData {
  x: number;
  y: number;
  width: number;
  height: number;
  jumpPower: number;
  gravity: number;
  slideHeight: number;
  normalHeight: number;
  jumpHeight: number;
  animations: Record<PlayerState, PlayerAnimation>;
}

export const playerData = (canvas: HTMLCanvasElement): PlayerData => {
  return {
    x: 200,
    y: canvas.height - 70 * 3 - 100,
    width: 58 * 3,
    height: 66 * 3,
    normalHeight: 66 * 3,
    slideHeight: 34 * 3,
    jumpHeight: 59 * 3, // Adjusted jump image height
    jumpPower: 12,
    gravity: 0.2,
    animations: {
      idle: {
        frames: [
          "../assets/image/idle/idle1.png",
          "../assets/image/idle/idle2.png",
          "../assets/image/idle/idle3.png",
          "../assets/image/idle/idle4.png",
        ].map((src) => {
          const img = new Image();
          img.src = src;
          return img;
        }),
        frameInterval: 800,
      },
      run: {
        frames: [
          "../assets/image/run/run1.png",
          "../assets/image/run/run2.png",
          "../assets/image/run/run3.png",
          "../assets/image/run/run4.png",
          "../assets/image/run/run5.png",
          "../assets/image/run/run6.png",
        ].map((src) => {
          const img = new Image();
          img.src = src;
          return img;
        }),
        frameInterval: 150,
      },
      jump: {
        frames: ["../assets/image/jump/jump.png"].map((src) => {
          const img = new Image();
          img.src = src;
          return img;
        }),
        frameInterval: 200,
      },
      slide: {
        frames: [
          "../assets/image/slide/slide1.png",
          "../assets/image/slide/slide2.png",
        ].map((src) => {
          const img = new Image();
          img.src = src;
          return img;
        }),
        frameInterval: 200,
      },
    },
  };
};
