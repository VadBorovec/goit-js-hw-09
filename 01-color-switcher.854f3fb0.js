!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",(function(){false;t.startBtn.disabled=!0,n=setInterval((function(){a(),t.body.style.background=a()}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.disabled=!1}));var n=null;function a(){return"linear-gradient(to right, #".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0),", #").concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0),")")}}();
//# sourceMappingURL=01-color-switcher.854f3fb0.js.map
