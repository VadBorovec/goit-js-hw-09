const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",(function(){false;e=setInterval((()=>{n(),t.body.style.backgroundColor=n()}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(e)}));let e=null;function n(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}
//# sourceMappingURL=01-color-switcher.62889920.js.map
