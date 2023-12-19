(()=>{"use strict";const t=class{constructor(t,e){this._x=t,this._y=e}getX(){return this._x}getY(){return this._y}},e={b:"#0341AE",g:"#72CB3B",c:"#00FFFF",r:"#FF3213",o:"#FF971C",y:"#FFD500",v:"#800080"},s=class{_score;constructor(t=0){this._score=t}addScore(t){this._score+=t}getScore(){return this._score}reset(){this._score=0}};class i{static SIGNALS={leftKeyPressed:0,rightKeyPressed:1,upKeyPressed:2,downKeyPressed:3};_subscriptions={};constructor(){return i._instance?i._instance:i._instance=this}broadcast(t,e){const s=this._subscriptions[t]||[];for(const t of s)t(e)}clear(t){if(Array.isArray(t))for(const e of t)delete this._subscriptions[e];else this._subscriptions={}}subscribe(t,e){(this._subscriptions[t]||(this._subscriptions[t]=[])).push(e)}}const o=i,r="tetris_hs_key",n={LINE_PIECE:[["b"],["b"],["b"],["b"]],L_PIECE_LEFT:[[,"c"],[,"c"],["c","c"]],L_PIECE_RIGHT:[["o",null],["o",null],["o","o"]],SQUARE:[["y","y"],["y","y"]],SQUIGLY_LEFT:[[,"r","r"],["r","r"]],SQUIGLY_RIGHT:[["g","g",null],[,"g","g"]],T_PIECE:[["v","v","v"],[,"v"]]};new class{_block;_blockgravitationTimer;_board;_canvas;_gameLoopIntervalId;_keyboardInput;_signalBroadcaster;_sound;_rowsPlucked;_score;_settings;_speedDifficulty;_titleScreen;_pickANewBlock(){const{downKeyPressed:e,leftKeyPressed:s,rightKeyPressed:i,upKeyPressed:r}=o.SIGNALS;this._blockgravitationTimer&&this._blockgravitationTimer.dispose(),this._signalBroadcaster&&this._signalBroadcaster.clear([e,s,i,r]);const h=new class{_game;_height;_isDisposed;_position;_shape;_width;_newSafePosition(e,s){if(this.isDisposed()||this._game.getBoard().isLocked())return;const i=this._position.getX()+e,o=this._position.getY()+s,r=new t(i,o);return this._game.getBoard().spaceIsAvailable(this._shape,r)?r:void 0}_setShape(t){this._shape=t,this._height=t.length,this._width=t[0].length}constructor(e,s){this._game=s,this._setShape(e);const i=parseInt(this._game.getBoard().getWidth()/2-this._width/2);this._position=new t(i,0)}getShape(){return this._shape}getPosition(){return this._position}rotate(){const t=function(t){const e=t.length,s=t[0].length,i=[];for(let o=0;o<s;o++){i.push([]);for(let s=0;s<e;s++)i[o][e-s-1]=t[s][o]}return i}(this._shape);this._game.getBoard().spaceIsAvailable(t,this._position)&&(this._game.getSound().playSound("rotate-min"),this._setShape(t))}left(){this._position=this._newSafePosition(-1,0)||this._position}right(){this._position=this._newSafePosition(1,0)||this._position}down(){if(this.isDisposed())return;const t=this._newSafePosition(0,1);if(!t){const t=this._game.getBoard().landBlock(this);return t&&this._game.pluckRows(t),this._game.getSound().playSound("fall-min"),void this.dispose()}this._position=t}isDisposed(){return this._isDisposed}dispose(){delete this._game,delete this._height,delete this._position,delete this._shape,delete this._width,this._isDisposed=!0}}(function(){const t=Object.values(n);return t[Math.floor(function(t,e=0){return e+Math.random()*(t-e)}(t.length))]}(),this);if(this._board.spaceIsAvailable(h.getShape(),h.getPosition()))return this._blockgravitationTimer=new class{_name;_interval;constructor(t,e,s){this._name=t,this._interval=setInterval(s,1e3*e)}dispose(){clearInterval(this._interval),delete this._name,delete this._interval}}("Block down movement",1/this._speedDifficulty,h.down.bind(h)),this._signalBroadcaster.subscribe(e,h.down.bind(h)),this._signalBroadcaster.subscribe(s,h.left.bind(h)),this._signalBroadcaster.subscribe(i,h.right.bind(h)),this._signalBroadcaster.subscribe(r,h.rotate.bind(h)),h}constructor(t){this._titleScreen=new class{_highScore;_populateHighScores(t,s,i){const o=i||document.getElementById("high-score");if(!o||!Array.isArray(t)||!t.length)return;o.innerHTML="";const r=document.createElement("li");r.innerText="HI score:",r.style.marginBottom=0,r.style.textAlign="center",o.appendChild(r);for(let i=0;i<t.length;i++){const r=document.createElement("li");r.innerText=String(i+1).padStart(2," ")+String(t[i]).padStart(36,"."),r.style.color=s===i?e.g:"#FFFFFF",r.style.marginBottom="16px",o.appendChild(r)}return o}constructor(t){this._highScore=new class{_scoreList;_getSaved(){try{const t=localStorage.getItem(r);if(!t)throw new Error("No high score table in local storage. Initializing new.");return JSON.parse(t)}catch(t){return console.log(t.message),[1e3,900,800,700,600,500,400,300,200,100]}}_save(t){try{const e=JSON.stringify(t);localStorage.setItem(r,e)}catch(t){console.log(t)}}constructor(){this._scoreList=this._getSaved()}getScores(){return this._scoreList}update(t){const e=this._scoreList.findIndex((e=>null==e||e<t));if(-1!==e&&e<10)return this._scoreList.splice(e,0,t),this._scoreList=this._scoreList.slice(0,10),this._save(this._scoreList),e}};const s=document.createElement("div");s.id="title-screen",s.style.alignItems="center",s.style.background="#121212",s.style.color="#fff",s.style.display="flex",s.style.flexDirection="column",s.style.gap="2vh",s.style.height="100vh",s.style.justifyContent="center",s.style.left=0,s.style.position="fixed",s.style.top=0,s.style.width="100vw";const i=document.createElement("h1");i.textContent="TETRIS",i.style.fontFamily="sans-serif",i.style.fontSize="min(16vw,12vh)",i.style.fontWeight=900,i.style.margin=0;const o=document.createElement("ul");o.id="high-score",o.style.fontFamily="monospace",o.style.listStyle="none",o.style.margin=0,o.style.padding=0,o.style.textAlign="right",this._populateHighScores(this._highScore.getScores(),null,o);const n=document.createElement("button");n.style.background="#161616",n.style.border=`5px solid ${e.o}`,n.style.color=e.o,n.style.cursor="pointer",n.style.fontSize="18px",n.style.marginTop="1.5vh",n.style.padding="20px",n.textContent="START GAME",n.addEventListener("click",t.start.bind(t)),s.appendChild(i),s.appendChild(o),s.appendChild(n),document.body.appendChild(s)}hide(){document.getElementById("title-screen").style.display="none"}update(t){const e=document.getElementById("title-screen"),s=this._highScore.update(t);this._populateHighScores(this._highScore.getScores(),s),e.style.display="flex",e.style.opacity="0.94"}}(this),this._settings=t,this._canvas=new class{_blockPixelSize;_boardHeight;_boardWidth;_canvas;_height;_width;_getContext(){return this._canvas.getContext("2d")}constructor(t,e,s){this._canvas=document.getElementById(t),this._boardHeight=s,this._boardWidth=e,window.addEventListener("resize",this.resize.bind(this)),this.resize()}clear(){this._getContext().clearRect(0,0,this._width,this._height)}dispose(){window.removeEventListener("resize",this.resize.bind(this)),delete this._blockPixelSize,delete this._boardHeight,delete this._boardWidth,delete this._canvas,delete this._height,delete this._width}drawBoard(t){const s=this._blockPixelSize,i=this._getContext(),o=this._boardHeight,r=this._boardWidth;for(let n=0;n<o;n++)for(let o=0;o<r;o++){const r=t[n][o];if(!r)continue;const h=e[r],a=s*o+1,c=s*n+1;i.fillStyle=h,i.fillRect(a,c,s-1,s-1)}}drawBlock(t,s){const i=this._blockPixelSize,o=this._getContext(),r=t.length,n=t[0].length,h=i*s.getX(),a=i*s.getY();for(let s=0;s<r;s++)for(let r=0;r<n;r++){const n=t[s][r];if(!n)continue;const c=e[n],l=h+i*r+1,d=a+i*s+1;o.fillStyle=c,o.fillRect(l,d,i-1,i-1)}}drawScore(t){const s=this._getContext(),i=String(t),o=s.measureText(i);s.font="32px monospace",s.fillStyle=e.g,s.fillText(i,this._width-o.width-10,28)}resize(){const t=window.innerHeight,e=window.innerWidth,s=(t-60)/this._boardHeight,i=(e-60)/this._boardWidth;this._blockPixelSize=Math.min(s,i),this._height=this._blockPixelSize*this._boardHeight,this._width=Math.min(e,this._blockPixelSize*this._boardWidth);const o=this._getContext();o.canvas.width=this._width,o.canvas.height=this._height,this.clear()}}(this._settings.canvasId,this._settings.board.width,this._settings.board.height)}start(){this._titleScreen.hide(),this._board=new class{_board;_locked;_height;_width;constructor(t){this._board=[],this._width=t.getSettings().board.width,this._height=t.getSettings().board.height;for(let t=0;t<this._height;t++)this._board[t]=[]}clearBlocksIfRowComplete(t,e){const s=t.getY(),i=s+e;let o=0;for(let t=s;t<i;t++)this.rowIsComplete(t)&&(this.clearRow(t),o+=1);return o}clearRow(t){for(let e=t;e>0;e--)this._board[e]=this._board[e-1];this._board[0]=[]}dispose(){delete this._board,delete this._locked,delete this._height,delete this._width}getBoard(){return this._board}getHeight(){return this._height}getWidth(){return this._width}isLocked(){return this._locked}landBlock(t){if(this.isLocked())return;const e=t.getPosition(),s=t.getShape();if(this.spaceIsAvailable(s,e)){this._locked=!0;const t=s.length,i=s[0].length,o=e.getX(),r=e.getY(),n=o+i,h=r+t;for(let t=r;t<h;t++)for(let e=o;e<n;e++){const i=this._board[t][e],n=s[t-r][e-o];!i&&n&&(this._board[t][e]=n)}const a=this.clearBlocksIfRowComplete(e,t);return this._locked=!1,a}}rowIsComplete(t){for(let e=0;e<this._width;e++)if(!this._board[t][e])return!1;return!0}spaceIsAvailable(t,e){const s=t.length,i=t[0].length,o=e.getX(),r=e.getY(),n=o+i,h=r+s;if(o<0||r<0||h>this._height||n>this._width)return!1;for(let e=r;e<h;e++)for(let s=o;s<n;s++){const i=this._board[e][s],n=t[e-r][s-o];if(i&&n)return!1}return!0}}(this),this._keyboardInput=new class{_debug;_mappings;constructor(t=!1){this._debug=t,this._mappings={},window.addEventListener("keydown",this.keypressed.bind(this))}bind(t,e){const s=Array.isArray(t)?t:[t];for(const t of s)this._mappings[t]=e}clear(){this._mappings={}}dispose(){this.clear(),window.removeEventListener("keydown",this.keypressed.bind(this))}keypressed(t){for(const e in this._mappings)e===t.key&&this._mappings[e]();this._debug&&console.log(`${t.key} pressed.`)}},this._rowsPlucked=new s(0),this._score=new s(0),this._signalBroadcaster=new o,this._sound=new class{_format;_music;_path;_sound;_pathTo(t,e=this._format){if(t)return`${this._path}/${t}${e}`}_stop(t){if(t)try{if(!t.currentTime>0&&!t.paused&&!t.ended&&t.readyState>2)return;t.pause(),t.currentTime=0}catch(t){}}constructor(t=".mp3",e="./src/assets"){this._path=e,this._format=t}dispose(){this._stop(this._music),this._stop(this._sound),this._music=null,this._sound=null}playMusic(t,e=!1){this._stop(this._music),this._music=new Audio(this._pathTo(t)),e&&this._music.addEventListener("ended",(function(){this.currentTime=0,this.play()})),this._music.play()}playMusicList(t,e=!0){let s=0;const i=()=>{const o=t[s++];o?(this.playMusic(o),this._music.addEventListener("ended",i)):e&&this.playMusicList(t,!0)};i()}playSound(t){this._stop(this._sound),this._sound=new Audio(this._pathTo(t)),this._sound.play()}},this._speedDifficulty=this._settings.initialDifficulty,this._keyboardInput.bind(["a","A","ArrowLeft"],(()=>this._signalBroadcaster.broadcast(o.SIGNALS.leftKeyPressed))),this._keyboardInput.bind(["d","D","ArrowRight"],(()=>this._signalBroadcaster.broadcast(o.SIGNALS.rightKeyPressed))),this._keyboardInput.bind(["w","W","ArrowUp"],(()=>this._signalBroadcaster.broadcast(o.SIGNALS.upKeyPressed))),this._keyboardInput.bind(["s","S","ArrowDown"],(()=>this._signalBroadcaster.broadcast(o.SIGNALS.downKeyPressed))),this._sound.playMusicList(["theme-min","music-min"],!0),this._gameLoopIntervalId=setInterval(this.tick.bind(this),parseInt(1e3/this._settings.fps))}tick(){if(!this._board.isLocked()){if((this._block?.isDisposed()||null==this._block)&&(this._block=this._pickANewBlock(),!this._block))return this.gameOver();this._canvas.clear(),this._canvas.drawBoard(this._board.getBoard()),this._canvas.drawBlock(this._block.getShape(),this._block.getPosition()),this._canvas.drawScore(this._score.getScore())}}gameOver(){clearInterval(this._gameLoopIntervalId),this._blockgravitationTimer.dispose(),this._board.dispose(),this._keyboardInput.dispose(),this._signalBroadcaster.clear(),this._sound.playMusic("game-over-min"),this._titleScreen.update(this._score.getScore())}getBoard(){return this._board}getSettings(){return this._settings}getSignalBroadcaster(){return this._signalBroadcaster}getSound(){return this._sound}pluckRows(t){this._rowsPlucked.addScore(t),this._score.addScore(t*t*100);const e=this._rowsPlucked.getScore(),s=this._settings.difficultyIncreasesEvery;e%s==0&&(this._speedDifficulty+=e/s)}}({board:{width:10,height:20},canvasId:"canvas",difficultyIncreasesEvery:30,fps:60,initialDifficulty:2})})();