const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{fs.mkdirSync('frames',{recursive:true});const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.goto('file://'+path.resolve('escena-01.html')+'?render');await p.evaluate(()=>document.fonts.ready);
const N=24*30;for(let i=0;i<N;i++){await p.evaluate(t=>render(t),i/30);await p.screenshot({path:`frames/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:92})}
await b.close()})();
