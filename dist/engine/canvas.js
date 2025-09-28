export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
//# sourceMappingURL=canvas.js.map