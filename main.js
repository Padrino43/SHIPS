console.log("%cCześć! Bardzo dziękujemy za granie w naszą grę. " +
	"Mamy nadzieję, że będziesz się dobrze bawić. Ahoy kapitanie!",
	"font-weight: bold; font-family: Tahoma, Helvetica, Arial, sans-serif;", "");
//Zmienne nickowe
var playerCaptain1;
var playerCaptain2;
var enemyCaptain1;
var enemyCaptain2;
//Zmienne odpowiedzialne za dobranie walki
var year=1940;
var pl1=true,pl2=true,en1=true,en2=true;
var uk=true,ger=true,us=true,jp=true;
var diff, alliance;
//Zmienne odpowiedzialne za walkę
var playerMap = Array(10);
var enemyMap = Array(10);
var arrows='lr';
var myHp=950,enHp=950;
var buildShip=0;
var isBuildTime=true;
var buildingValue=19;
var yourTurn=true,isSunk=true,hitX,hitY;
//Statki
myShips={
				'dj': 0,
				'dd': 0,
				'sc': 0,
				'tj': 0,
				'td': 0,
				'p': 0
}
enShips={
				'dj': 2,
				'dd': 2,
				'sc': 4,
				'tj': 3,
				'td': 3,
				'p': 5
}

// KONFIGURACJA DŹWIĘKU
var soundSetting = true;
var musicSetting = true;
var horn = new Audio("src/sound/naprzod.mp3");
var toot = new Audio("src/sound/map.mp3");
var background = new Audio("src/sound/background.mp3");
var son = new Audio("src/sound/sound_on.wav");
var soff = new Audio("src/sound/sound_off.wav");
var win = new Audio("src/sound/win.wav");
var lose = new Audio("src/sound/lose.mp3");
var shot_h = new Audio("src/sound/shot_hit.mp3");
var shot_m = new Audio("src/sound/shot_miss.mp3");
var ssunk = new Audio("src/sound/soil.wav");
var sbutton = new Audio("src/sound/sound_on.wav");
horn.volume = 0.04;
toot.volume = 0.1;
shot_h.volume = 0.2;
shot_m.volume = 0.2;
ssunk.volume = 0.2;
background.volume = 0.1;
sbutton.volume = 0.4;
son.volume = 0.4;
soff.volume = 0.4;
//Zapętlony dźwięk w tle
if (typeof background.loop == 'boolean')
{
  background.loop = true;
}
else
{
  background.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
}
if (typeof win.loop == 'boolean')
{
  win.loop = true;
}
else
{
  win.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
}
//Wyłączanie/Włączanie Dźwieków
function Sound() {
  if(soundSetting == false){
    soundSetting = true;
		son.play();
    document.getElementById("sound").innerHTML = '<img src="src/img/s_on.png">';
    horn.volume = 0.04;
    toot.volume = 0.1;
		shot_h.volume = 0.2;
		shot_m.volume = 0.2;
		ssunk.volume = 0.2;
		sbutton.volume= 0.4;
  }
  else {
    soundSetting = false;
		soff.play();
    document.getElementById("sound").innerHTML = '<img src="src/img/s_off.png">';
    horn.volume = 0;
    toot.volume = 0;
		shot_h.volume = 0;
		shot_m.volume = 0;
		ssunk.volume = 0;
		sbutton.volume = 0;
  }
}
//Wyłączanie/Włączanie Muzyki
function Music()
{
	if(musicSetting == false) {
    musicSetting = true;
		son.play();
    document.getElementById("music").innerHTML = '<img src ="src/img/music.png">';
	  background.volume = 0.1;
		win.volume = 1;
		lose.volume= 1;
  }
  else{
    musicSetting = false;
		soff.play();
  	document.getElementById("music").innerHTML = '<img src ="src/img/musicoff.png">';
  	background.volume = 0;
		win.volume = 0;
		lose.volume= 0;
  }
}
// KONFIGURACJA DŹWIĘKU - KONIEC

//Wybór sojuszu
function Alliance(number)
{
	sbutton.play();
  rnd1 = Math.floor(Math.random()*5);
  rnd2 = Math.floor(Math.random()*5);
  var gercaptains=[
   "Kpt. Erich Raeder",
   "Kpt. Karl Donitz",
   "Kpt. Hans von Friedeburg",
   "Kpt. Walter Warzecha",
   "Kpt. Walther Brauchitsch"
  ];
  var jpcaptains=[
   "海軍元帥 Isoroku Yamamoto",
   "海軍元帥 Gensui-kaigun-taisho",
   "海軍元帥 Chuichi Nagumo",
   "海軍元帥 Osami Nagano",
   "海軍元帥 ChleieWoude Yakotako"
  ];
  var ukcaptains=[
   "Cpt. Percy Noble",
   "Cpt. Andrew Cunningham",
   "Cpt. Dudley Pound",
   "Cpt Roger Backhouse",
   "Cpt. Louis Mountbatten"
 ];
 var uscaptains=[
   "Cpt. Ernest J. King",
   "Cpt. Chester Nimitz",
   "Cpt. Douglas MacArthur",
   "Cpt. Frank J Fletcher",
   "Cpt. Omar Bradley"
 ];
  if(number==1){
    document.getElementById("cpt1").innerHTML = "Kapitan brytyjski: " +  '<input type="text" id="captains1" class="cptnick" placeholder="Podaj nazwę kapitana" >';
    document.getElementById("cpt2").innerHTML = "Kapitan amerykański: " + '<input type="text" id="captains2" class="cptnick" placeholder="Podaj nazwę kapitana" >';
    document.getElementById("captains1").value = ukcaptains[rnd1];
    document.getElementById("captains2").value = uscaptains[rnd2];
    enemyCaptain1 = gercaptains[rnd1];
    enemyCaptain2 = jpcaptains[rnd2];
  }
  else if(number==2){
      document.getElementById("cpt1").innerHTML = "Kapitan niemiecki: " +  '<input type="text" id="captains1" class="cptnick" placeholder="Podaj nazwę kapitana" >';
      document.getElementById("cpt2").innerHTML = "Kapitan japoński: " + '<input type="text" id="captains2" class="cptnick" placeholder="Podaj nazwę kapitana" >';
      document.getElementById("captains1").value = gercaptains[rnd1];
      document.getElementById("captains2").value = jpcaptains[rnd2];
      enemyCaptain1 = ukcaptains[rnd1];
      enemyCaptain2 = uscaptains[rnd2];
  }
}
//Wczytanie ustawień użytkownika
function GetValues()
{
	if(playerCaptain1==''|| playerCaptain2=='')
	{
		alert("Podaj nazwę kapitanów");
		return;
	}
	sbutton.play();
	playerCaptain1 = document.getElementById('captains1').value;
	playerCaptain2 = document.getElementById('captains2').value;
	diff = document.getElementsByName('diff');
	alliance = document.getElementsByName('cho');// = false
	if(diff[0].checked)
	{
	 diff = 'l';
	}
	else if(diff[1].checked)
	{
	diff = 'w';
	}
	if(alliance[0].checked)
	{
		alliance = 'a';
	}
	else if(alliance[1].checked)
	{
		alliance = 'o';
	}
	Map();
}
//Prezentacja walki
function Map() {

		toot.play();
		if(year==1940)
		{
			document.getElementById('container').innerHTML= '<div id="year">1940</div>';
			if(alliance=='a'){
		document.getElementById('container').innerHTML+='<div class="warsite">'+
		        '<img class="sitee" src="src/img/brytania.png"><br>'+
		        '<label for="alliance">Wielka Brytania</label>'+
		     ' </div>'+
		     ' <div id="warversus">'+
		       ' <img src="src/img/vs.png">'+
		    '  </div>'+
		     ' <div class="warsite">'+
		        '<img class="sitee" style="width:55%;" src="src/img/osi.jpg"><br>'+
		     '   <label for="osi">Niemcy</label>'+
		      '</div>';
				}
				else{
					document.getElementById('container').innerHTML+=' <div class="warsite">'+
														'<img class="sitee" style="width:55%;" src="src/img/osi.jpg"><br>'+
												 '   <label for="osi">Niemcy</label>'+
													'</div>'+
													' <div id="warversus">'+
														' <img src="src/img/vs.png">'+
												 '  </div>'+
					'<div class="warsite">'+
									'<img class="sitee" src="src/img/brytania.png"><br>'+
									'<label for="alliance">Wielka Brytania</label>'+
							 ' </div>';

				}
				document.getElementById('container').innerHTML+='<div class="cl"></div>';
		document.getElementById('container').innerHTML+= '<div id="battlemap"><img src="src/img/battleone.png"</div>';
	}
	else if(year==1942)
	{
		document.getElementById('container').innerHTML= '<div id="year">1942</div>';
		if(alliance=='a')
		{
	document.getElementById('container').innerHTML+=' <div class="warsite">'+
						'<img class="sitee" style="width:65%;" src="src/img/usa.png"><br>'+
				 '   <label for="osi">Stany Zjednoczone</label>'+
					'</div>'+
					' <div id="warversus">'+
						' <img src="src/img/vs.png">'+
				 '  </div>'+
	'<div class="warsite">'+
					'<img class="sitee" src="src/img/japan.png"><br>'+
					'<label for="alliance">Japonia</label>'+
			 ' </div>';
			}
			else
			{
				document.getElementById('container').innerHTML+='<div class="warsite">'+
								'<img class="sitee" src="src/img/japan.png"><br>'+
								'<label for="alliance">Japonia</label>'+
						 ' </div>'+
						 ' <div id="warversus">'+
							 ' <img src="src/img/vs.png">'+
						'  </div>'+
						 ' <div class="warsite">'+
								'<img class="sitee" style="width:65%;" src="src/img/usa.png"><br>'+
						 '   <label for="osi">Stany Zjednoczone</label>'+
							'</div>';
			}
			document.getElementById('container').innerHTML+='<div class="cl"></div>';
	document.getElementById('container').innerHTML+= '<div id="battlemap"><img src="src/img/battletwo.jpg"</div>';
}
else if(year==1945 && uk==true && jp==true)
{
	document.getElementById('container').innerHTML= '<div id="year">1945</div>';

	if(alliance=='a')
	{
document.getElementById('container').innerHTML+='<div class="warsite">'+
				'<img class="sitee" src="src/img/brytania.png"><br>'+
				'<label for="alliance">Wielka Brytania</label>'+
		 ' </div>'+
		 ' <div id="warversus">'+
			 ' <img src="src/img/vs.png">'+
		'  </div>'+
		 ' <div class="warsite">'+
				'<img class="sitee" src="src/img/japan.png"><br>'+
		 '   <label for="osi">Japonia</label>'+
			'</div>'+
			'<div class="cl"></div>';
		}
		else {
			document.getElementById('container').innerHTML+=' <div class="warsite">'+
										'<img class="sitee" src="src/img/japan.png"><br>'+
								 '   <label for="osi">Japonia</label>'+
									'</div>'+
					 ' <div id="warversus">'+
						 ' <img src="src/img/vs.png">'+
					'  </div>'+
					'<div class="warsite">'+
									'<img class="sitee" src="src/img/brytania.png"><br>'+
									'<label for="alliance">Wielka Brytania</label>'+
							 ' </div>'+
						'<div class="cl"></div>';
		}
document.getElementById('container').innerHTML+= '<div id="battlemap"><img src="src/img/battlethreeukjp.png"</div>';
}
else if(year==1945 && ger==true && us==true)
{
	document.getElementById('container').innerHTML= '<div id="year">1945</div>';
	if(alliance=='a')
	{
document.getElementById('container').innerHTML+='<div class="warsite">'+
				'<img class="sitee" style="width:65%;" src="src/img/usa.png"><br>'+
				'<label for="alliance">Stany Zjednoczone</label>'+
		 ' </div>'+
		 ' <div id="warversus">'+
			 ' <img src="src/img/vs.png">'+
		'  </div>'+
		 ' <div class="warsite">'+
				'<img class="sitee" style="width:55%;"src="src/img/osi.jpg"><br>'+
		 '   <label for="osi">Niemcy</label>'+
			'</div>'+
			'<div class="cl"></div>';
		}
		else {
			document.getElementById('container').innerHTML+=' <div class="warsite">'+
										'<img class="sitee" style="width:55%;"src="src/img/osi.jpg"><br>'+
								 '   <label for="osi">Niemcy</label>'+
									'</div>'+
					 ' <div id="warversus">'+
						 ' <img src="src/img/vs.png">'+
					'  </div>'+
					'<div class="warsite">'+
									'<img class="sitee" style="width:65%;" src="src/img/usa.png"><br>'+
									'<label for="alliance">Stany Zjednoczone</label>'+
							 ' </div>'+
						'<div class="cl"></div>';
		}
document.getElementById('container').innerHTML+= '<div id="battlemap"><img src="src/img/battlethreeusager.jpg"</div>';
}
		document.getElementById('container').innerHTML+= '<p onclick="Start()">Do boju! </p>';
	}
function Start()
{
	sbutton.play();
	horn.play();
	setTimeout(function(){
		background.currentTime = 0;
		background.play();
	}, 4000);
	if(year==1940)
{
	if(alliance=='a'){
document.getElementById('container').innerHTML='<div class="battleflag">'+
				'<img class="sitee" src="src/img/brytania.png"><br>'+
				'<label for="alliance">Wielka Brytania</label>'+
		 ' </div>'+
		 ' <div id="battleversus">'+
			 ' <img src="src/img/vs.png">'+
		'  </div>'+
		 ' <div class="battleflag">'+
				'<img class="sitee" style="width:55%;" src="src/img/osi.jpg"><br>'+
		 '   <label for="osi">Niemcy</label>'+
			'</div>'+
			'<div class="cl"></div>';
		}
		else if(alliance=='o')
		{
			document.getElementById('container').innerHTML=' <div class="battleflag">'+
										'<img class="sitee" style="width:55%;" src="src/img/osi.jpg"><br>'+
								 '   <label for="osi">Niemcy</label>'+
									'</div>'+

					 ' <div id="battleversus">'+
						 ' <img src="src/img/vs.png">'+
					'  </div>'+
					'<div class="battleflag">'+
									'<img class="sitee" src="src/img/brytania.png"><br>'+
									'<label for="alliance">Wielka Brytania</label>'+
							 ' </div>'+
						'<div class="cl"></div>';
		}
}
if(year==1942)
{
if(alliance=='a'){
	document.getElementById('container').innerHTML=' <div class="battleflag">'+
						'<img class="sitee" style="width:55%;" src="src/img/usa.png"><br>'+
				 '   <label for="osi">Stany Zjednoczone</label>'+
					'</div>'+
					' <div id="battleversus">'+
						' <img src="src/img/vs.png">'+
				 '  </div>'+
	'<div class="battleflag">'+
					'<img class="sitee" src="src/img/japan.png"><br>'+
					'<label for="alliance">Japonia</label>'+
			 ' </div>'+
		'<div class="cl"></div>';
	}
	else if(alliance=='o')
	{
		document.getElementById('container').innerHTML='<div class="battleflag">'+
						'<img class="sitee" src="src/img/japan.png"><br>'+
						'<label for="alliance">Japonia</label>'+
				 ' </div>'+
				 ' <div id="battleversus">'+
					 ' <img src="src/img/vs.png">'+
				'  </div>'+
				 ' <div class="battleflag">'+
						'<img class="sitee" style="width:65%;" src="src/img/usa.png"><br>'+
				 '   <label for="osi">Stany Zjednoczone</label>'+
					'</div>'+
			 '<div class="cl"></div>';
	}
}
else if(year==1945 && uk==true && jp==true)
{
	if(alliance=='a')
	{
document.getElementById('container').innerHTML='<div class="battleflag">'+
				'<img class="sitee" src="src/img/brytania.png"><br>'+
				'<label for="alliance">Wielka Brytania</label>'+
		 ' </div>'+
		 ' <div id="battleversus">'+
			 ' <img src="src/img/vs.png">'+
		'  </div>'+
		 ' <div class="battleflag">'+
				'<img class="sitee" src="src/img/japan.png"><br>'+
		 '   <label for="osi">Japonia</label>'+
			'</div>'+
	 '<div class="cl"></div>';
		}
		else {
			document.getElementById('container').innerHTML=' <div class="battleflag">'+
										'<img class="sitee" src="src/img/japan.png"><br>'+
								 '   <label for="osi">Japonia</label>'+
									'</div>'+
					 ' <div id="battleversus">'+
						 ' <img src="src/img/vs.png">'+
					'  </div>'+
					'<div class="battleflag">'+
									'<img class="sitee" src="src/img/brytania.png"><br>'+
									'<label for="alliance">Wielka Brytania</label>'+
							 ' </div>'+
						'<div class="cl"></div>';
		}
}
else if(year==1945 && ger==true && us==true)
{
	if(alliance=='a')
	{
document.getElementById('container').innerHTML='<div class="battleflag">'+
				'<img class="sitee" style="width:65%;" src="src/img/usa.png"><br>'+
				'<label for="alliance">Stany Zjednoczone</label>'+
		 ' </div>'+
		 ' <div id="battleversus">'+
			 ' <img src="src/img/vs.png">'+
		'  </div>'+
		 ' <div class="battleflag">'+
				'<img class="sitee" style="width:55%;"src="src/img/osi.jpg"><br>'+
		 '   <label for="osi">Niemcy</label>'+
			'</div>'+
	 '<div class="cl"></div>';
		}
		else {
			document.getElementById('container').innerHTML=' <div class="battleflag">'+
										'<img class="sitee" style="width:55%;"src="src/img/osi.jpg"><br>'+
								 '   <label for="osi">Niemcy</label>'+
									'</div>'+
					 ' <div id="battleversus">'+
						 ' <img src="src/img/vs.png">'+
					'  </div>'+
					'<div class="battleflag">'+
									'<img class="sitee" style="width:65%;" src="src/img/usa.png"><br>'+
									'<label for="alliance">Stany Zjednoczone</label>'+
							 ' </div>'+
						'<div class="cl"></div>';
		}
	}
  document.getElementById("container").classList.add('containerg');
//  setTimeout(function(){
  document.getElementById("container").innerHTML += '<div id="p1"></div><div id="stats"></div><div id="p2"></div><div class="cl"> </div>';
//}, 1300);
Round();
}
//Rozpoczęcie pierwszej fazy rundy
function Round()
{
			setTimeout(function(){
	for(let i=0;i<10;i++)
	{
		playerMap[i] = Array(10);
		enemyMap[i] = Array(10);
	}
	myHp=950,enHp=950;
	isBuildTime=true;
	buildingValue=19;
	if(year==1940)
	{
	document.getElementById('stats').innerHTML = '<div id="statNames"><span class="myName">'+playerCaptain1+'</span><br> VS <br> <span class="enemyName">'+enemyCaptain1+'</span></div>';
	}
	else if(year==1942)
	{
		document.getElementById('stats').innerHTML = '<div id="statNames"><span class="myName">'+playerCaptain2+'</span><br> VS <br><span class="enemyName">'+enemyCaptain2+'</span></div>';
	}
	else
	{
		if((alliance=='a'&&uk==false)||(alliance=='o'&&ger==false))
		{
		document.getElementById('stats').innerHTML = '<div id="statNames"><span class="myName">'+playerCaptain2+'</span><br> VS <br><span class="enemyName">'+enemyCaptain1+'</span></div>';
		}
		else if((alliance=='a'&&us==false)||(alliance=='o'&&jp==false))
		{
			document.getElementById('stats').innerHTML = '<div id="statNames"><span class="myName">'+playerCaptain1+'</span><br> VS <br><span class="enemyName">'+enemyCaptain2+'</span></div>';
		}
	}
  	document.getElementById('stats').innerHTML += '<div id="statShips"></div>';
		document.getElementById('stats').innerHTML += '<div id="statButtons"></div>'
		document.getElementById('statShips').innerHTML = '<div id="Durability"> Wytrzymałość <br> <span class="myName">'+myHp+'</span> VS  <span class="enemyName">'+enHp+'</span></div>';
		document.getElementById('statShips').innerHTML += '<div class="ships" id="5" onclick="Choose(5)">5</div>';
		document.getElementById('statShips').innerHTML += '<div class="ships" id="4" onclick="Choose(4)">4</div>';
		document.getElementById('statShips').innerHTML += '<div class="ships" id="3.1" onclick="Choose(31)">3</div>';
		document.getElementById('statShips').innerHTML += '<div class="ships" id="3.2" onclick="Choose(32)">3</div>';
		document.getElementById('statShips').innerHTML += '<div class="ships" id="2.1" onclick="Choose(21)">2</div>';
		document.getElementById('statShips').innerHTML += '<div class="ships" id="2.2" onclick="Choose(22)">2</div>';
		document.getElementById('statButtons').innerHTML = '<img id="arrow" onclick="Arrow()" src="src/img/updown.png"/>';
		document.getElementById('statButtons').innerHTML += '<img id="clear" onclick="Clean()" src="src/img/X.png"/>';
		document.getElementById('statButtons').innerHTML += '<img id="dice" onclick="Randomize()" src="src/img/dice.png"/> ';
		document.getElementById('statButtons').innerHTML += '<img id="check" onclick="CheckEngine()" src="src/img/check.png"/> ';
	Clean();
	document.getElementById('p1').style.backgroundColor = "white";
	document.getElementById('p2').style.backgroundColor = "white";

	Arrow();
}, 2000);
}
//Strzał gracza
function Shot(x,y)
{
	if(yourTurn==false||isBuildTime||document.getElementById('ex'+x+'y'+y).classList == 'square hit' || document.getElementById('ex'+x+'y'+y).classList == 'square miss' || enHp==0 || myHp==0 || document.getElementById('ex'+x+'y'+y).classList == 'square hit sunk' ||  document.getElementById('ex'+x+'y'+y).classList == 'square sunk hit')
	{
		return;
	}
	if(enemyMap[x][y]!=false)
	{
	['dj','dd','tj','td','sc','p'].forEach((item, index) => {
			if(enemyMap[x][y]==item) {
				enShips[item]--;
				if(enShips[item]==0)
				{
					console.log("Zatopiony!");
					ssunk.play();
					for(let i=0;i<10;i++)
					{
						for(let j=0;j<10;j++)
						{
							if(enemyMap[i][j]==[item])
							{
							document.getElementById('ex'+i+'y'+j).classList.add('sunk');
							for(let k=-1;k<=1;k=k+2)
							{
								if((k+i) < 10 && (k+i) > -1)
								{
									if(enemyMap[i+k][j]==false){
										document.getElementById('ex'+(k+i)+'y'+j).classList.add('miss');
									}
								}
								if((k+j) < 10 && (k+j) > -1)
								{
									if(enemyMap[i][j+k]==false){
										document.getElementById('ex'+i+'y'+(j+k)).classList.add('miss');
									}
							}
						}
						if(i+1<10&&j+1<10)
						{
							if(enemyMap[i+1][j+1]==false){
								document.getElementById('ex'+(i+1)+'y'+(j+1)).classList.add('miss');
							}
						}
						if(i-1>-1&&j-1>-1)
						{
							if(enemyMap[i-1][j-1]==false){
								document.getElementById('ex'+(i-1)+'y'+(j-1)).classList.add('miss');
							}
						}
						if(i+1<10&&j-1>-1)
						{
							if(enemyMap[i+1][j-1]==false){
								document.getElementById('ex'+(i+1)+'y'+(j-1)).classList.add('miss');
							}
						}
						if(i-1>-1&&j+1<10)
						{
							if(enemyMap[i-1][j+1]==false){
								document.getElementById('ex'+(i-1)+'y'+(j+1)).classList.add('miss');
							}
						}

					}
						}
					}
				}
			}
	});
	document.getElementById('ex'+x+'y'+y).classList.add('hit');
	shot_h.play();
	console.log("Trafienie!");
	enHp-=50;
	document.getElementById('statShips').innerHTML = '<div id="Durability"> Wytrzymałość <br> <span class="myName">'+myHp+'</span> VS  <span class="enemyName">'+enHp+'</span></div>';
if(enHp==0)
{
	var isWin=true;
	EndOfRound(isWin);
	return;
}
	}
	else {
		shot_m.play();
		document.getElementById('ex'+x+'y'+y).classList.add('miss');
		console.log("Chybienie!");
		if(enHp!=0)
		{
			document.getElementById('statButtons').innerHTML = '<span class="enemyName"> Tura przeciwnika! </span>';
			yourTurn=false;
			EnemyShot();
		}
	}
}
//Strzał przeciwnika
function EnemyShot()
{
	var random1, random2;
	if(diff=='l'||isSunk==true)
	{
		do{
			random1 = Math.floor(Math.random()*10);
			random2 = Math.floor(Math.random()*10);
		}while(document.getElementById('x'+random1+'y'+random2).classList == 'square hit' || document.getElementById('x'+random1+'y'+random2).classList == 'square miss' || document.getElementById('x'+random1+'y'+random2).classList == 'square myships sunk hit'  || document.getElementById('x'+random1+'y'+random2).classList == 'square myships sunk'  || document.getElementById('x'+random1+'y'+random2).classList == 'square myships hit sunk');
}
else if(diff=='w'&&isSunk==false)
{
var	randomT;
do{
	do{
randomT = Math.floor(Math.random()*4);
switch(randomT)
{
	case 0: {random1=hitX-1;random2=hitY; break;}
	case 1: {random1=hitX+1;random2=hitY; break;}
	case 2: {random1=hitX;random2=hitY-1; break;}
	case 3: {random1=hitX;random2=hitY+1; break;}
}

}while(random1 < 0 || random1 > 9 || random2 < 0 || random2 > 9);
}while(playerMap[random1][random2]==false);
}
 setTimeout(function(){
	if(playerMap[random1][random2]!=false)
		{
			console.log("Trafienie!");

		['dj','dd','tj','td','sc','p'].forEach((item, index) => {
				if(playerMap[random1][random2]==item) {
					myShips[item]--;
					if(myShips[item]<=0)
					{
						console.log("Zatopiony!");
						isSunk=true;
						for(let i=0;i<10;i++)
						{
							for(let j=0;j<10;j++)
							{
								if(playerMap[i][j]==[item])
								{
								if(document.getElementById('x'+i+'y'+j).classList == 'square myships')
								{
									document.getElementById('x'+i+'y'+j).classList.add('hit');
								}
								document.getElementById('x'+i+'y'+j).classList.add('sunk');
								for(let k=-1;k<=1;k=k+2)
								{
									if((k+i) < 10 && (k+i) > -1)
									{
										if(playerMap[i+k][j]==false){
											document.getElementById('x'+(k+i)+'y'+j).classList.add('miss');
										}
									}
									if((k+j) < 10 && (k+j) > -1)
									{
										if(playerMap[i][j+k]==false){
											document.getElementById('x'+i+'y'+(j+k)).classList.add('miss');
										}
								}
							}
							if(i+1<10&&j+1<10)
							{
								if(playerMap[i+1][j+1]==false){
									document.getElementById('x'+(i+1)+'y'+(j+1)).classList.add('miss');
								}
							}
							if(i-1>-1&&j-1>-1)
							{
								if(playerMap[i-1][j-1]==false){
									document.getElementById('x'+(i-1)+'y'+(j-1)).classList.add('miss');
								}
							}
							if(i+1<10&&j-1>-1)
							{
								if(playerMap[i+1][j-1]==false){
									document.getElementById('x'+(i+1)+'y'+(j-1)).classList.add('miss');
								}
							}
							if(i-1>-1&&j+1<10)
							{
								if(playerMap[i-1][j+1]==false){
									document.getElementById('x'+(i-1)+'y'+(j+1)).classList.add('miss');
								}
							}
					}
				}
			}
		}
					else {
						isSunk=false;
					}
				}
		});
		document.getElementById('x'+random1+'y'+random2).classList.add('hit');
		shot_h.play();
    hitX=random1; hitY=random2;
		myHp-=50;
		if(myHp!=0)
		{
			EnemyShot();
		}
		else {
			var isWin=false;
			EndOfRound(isWin);
			return;
		}
		document.getElementById('statShips').innerHTML = '<div id="Durability"> Wytrzymałość <br> <span class="myName">'+myHp+'</span> VS  <span class="enemyName">'+enHp+'</span></div>';
		}
		else {
			shot_m.play();
			document.getElementById('x'+random1+'y'+random2).classList.add('miss');
			console.log("Chybienie!");
			document.getElementById('statButtons').innerHTML = '<span class="myName"> Twoja tura! </span>';
				yourTurn=true;
		}
	}, 500);
}
function Choose(choose)
{
 if(myShips['p']==0){document.getElementById('5').style.backgroundColor = "blue";}
 if(myShips['sc']==0){document.getElementById('4').style.backgroundColor = "blue";}
 if(myShips['tj']==0){document.getElementById('3.1').style.backgroundColor = "blue";}
 if(myShips['td']==0){document.getElementById('3.2').style.backgroundColor = "blue";}
 if(myShips['dj']==0){document.getElementById('2.1').style.backgroundColor = "blue";}
 if(myShips['dd']==0){document.getElementById('2.2').style.backgroundColor = "blue";}
	switch(choose)
	{
		case 5: { if(myShips['p']==0){document.getElementById('5').style.backgroundColor = "green"; buildShip=5;} break;}
		case 4: { if(myShips['sc']==0){document.getElementById('4').style.backgroundColor = "green"; buildShip=4;} break;}
		case 31: { if(myShips['tj']==0){document.getElementById('3.1').style.backgroundColor = "green"; buildShip=31;}  break;}
		case 32: { if(myShips['td']==0){document.getElementById('3.2').style.backgroundColor = "green"; buildShip=32;} break;}
		case 21: { if(myShips['dj']==0){document.getElementById('2.1').style.backgroundColor = "green"; buildShip=21;}  break;}
		case 22: { if(myShips['dd']==0){document.getElementById('2.2').style.backgroundColor = "green"; buildShip=22;} break;}
	}
}
//Budowanie
function Build(x,y)
{
	if(isBuildTime==false || playerMap[x][y]==true || buildingValue==0)
	{
		return;
	}
if(buildShip==5&&arrows=='up')
{
	if(y>=2&&y<=7)
	{
		if(FreeSpace(x,y,3))
		{
			myShips['p']=5;
			playerMap[x][y-1]='p';
			playerMap[x][y-2]='p';
			playerMap[x][y]='p';
			playerMap[x][y+1]='p';
			playerMap[x][y+2]='p';
			buildingValue-=5;
			document.getElementById('x'+x+'y'+(y-2)).classList.add('myships');
			document.getElementById('x'+x+'y'+(y-1)).classList.add('myships');
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+(y+1)).classList.add('myships');
			document.getElementById('x'+x+'y'+(y+2)).classList.add('myships');
			document.getElementById('5').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==5&&arrows=='lr')
{
	if(x>=2&&x<=7)
	{
		if(FreeSpace(x,y,3))
		{
			myShips['p']=5;
			playerMap[x-2][y]='p';
			playerMap[x-1][y]='p';
			playerMap[x][y]='p';
			playerMap[x+1][y]='p';
			playerMap[x+2][y]='p';
			buildingValue-=5;
			document.getElementById('x'+(x-2)+'y'+y).classList.add('myships');
			document.getElementById('x'+(x-1)+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+(x+1)+'y'+y).classList.add('myships');
			document.getElementById('x'+(x+2)+'y'+y).classList.add('myships');
			document.getElementById('5').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==31&&arrows=='up')
{
	if(y>=1&&y<=8)
	{
		if(FreeSpace(x,y,2))
		{
			myShips['tj']=3;
			playerMap[x][y-1]='tj';
			playerMap[x][y]='tj';
			playerMap[x][y+1]='tj';
			buildingValue-=3;
			document.getElementById('x'+x+'y'+(y-1)).classList.add('myships');
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+(y+1)).classList.add('myships');
			document.getElementById('3.1').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==31&&arrows=='lr')
{
	if(x>=1&&x<=8)
	{
		if(FreeSpace(x,y,2))
		{
			myShips['tj']=3;
			playerMap[x-1][y]='tj';
			playerMap[x][y]='tj';
			playerMap[x+1][y]='tj';
			buildingValue-=3;
			document.getElementById('x'+(x-1)+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+(x+1)+'y'+y).classList.add('myships');
			document.getElementById('3.1').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==32&&arrows=='up')
{
	if(y>=1&&y<=8)
	{
		if(FreeSpace(x,y,2))
		{
			myShips['td']=3;
			playerMap[x][y-1]='td';
			playerMap[x][y]='td';
			playerMap[x][y+1]='td';
			buildingValue-=3;
			document.getElementById('x'+x+'y'+(y-1)).classList.add('myships');
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+(y+1)).classList.add('myships');
			document.getElementById('3.2').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==32&&arrows=='lr')
{
	if(x>=1&&x<=8)
	{
		if(FreeSpace(x,y,2))
		{
			myShips['td']=3;
			playerMap[x-1][y]='td';
			playerMap[x][y]='td';
			playerMap[x+1][y]='td';
			buildingValue-=3;
			document.getElementById('x'+(x-1)+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+(x+1)+'y'+y).classList.add('myships');
			document.getElementById('3.2').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==4&&arrows=='up')
{
	if(y>=1&&y<=7)
	{
		if(FreeSpace(x,y,2))
		{
			myShips['sc']=4;
			playerMap[x][y-1]='sc';
			playerMap[x][y]='sc';
			playerMap[x][y+1]='sc';
			playerMap[x][y+2]='sc';
			buildingValue-=4;
			document.getElementById('x'+x+'y'+(y-1)).classList.add('myships');
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+(y+1)).classList.add('myships');
			document.getElementById('x'+x+'y'+(y+2)).classList.add('myships');
			document.getElementById('4').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==4&&arrows=='lr')
{
	if(x>=1&&x<=7)
	{
		if(FreeSpace(x,y,2))
		{
			myShips['sc']=4;
			playerMap[x-1][y]='sc';
			playerMap[x][y]='sc';
			playerMap[x+1][y]='sc';
			playerMap[x+2][y]='sc';
			buildingValue-=4;
			document.getElementById('x'+(x-1)+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+(x+1)+'y'+y).classList.add('myships');
			document.getElementById('x'+(x+2)+'y'+y).classList.add('myships');
			document.getElementById('4').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==21&&arrows=='up')
{
	if(y>=0&&y<=8)
	{
		if(FreeSpace(x,y,1))
		{
			myShips['dj']=2;
			playerMap[x][y]='dj';
			playerMap[x][y+1]='dj';
			buildingValue-=2;
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+(y+1)).classList.add('myships');
			document.getElementById('2.1').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==21&&arrows=='lr')
{
	if(x>=0&&x<=8)
	{
		if(FreeSpace(x,y,1))
		{
			myShips['dj']=2;
			playerMap[x][y]='dj';
			playerMap[x+1][y]='dj';
			buildingValue-=2;
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+(x+1)+'y'+y).classList.add('myships');
			document.getElementById('2.1').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==22&&arrows=='up')
{
	if(y>=0&&y<=8)
	{
		if(FreeSpace(x,y,1))
		{
			myShips['dd']=2;
			playerMap[x][y]='dd';
			playerMap[x][y+1]='dd';
			buildingValue-=2;
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+x+'y'+(y+1)).classList.add('myships');
			document.getElementById('2.2').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
else if(buildShip==22&&arrows=='lr')
{
	if(x>=0&&x<=8)
	{
		if(FreeSpace(x,y,1))
		{
			myShips['dd']=2;
			playerMap[x][y]='dd';
			playerMap[x+1][y]='dd';
			buildingValue-=2;
			document.getElementById('x'+x+'y'+y).classList.add('myships');
			document.getElementById('x'+(x+1)+'y'+y).classList.add('myships');
			document.getElementById('2.2').style.backgroundColor = "gray"; buildShip=0;

		}
	}
}
}
//Sprawdza czy miejsce wokół statku jest wolne
function FreeSpace(x,y,length)
{
	if(arrows=='up')
	{
	for(let i=x-1;i<=x+1;i++)
		{
			for(let j=y-length;j<=y+length;j++)
			{
				if(i<0||i>9||j<0||j>9)
				{
					continue;
				}
				else if(playerMap[i][j]!=false)
				{
					return false;
				}
	//			document.getElementById('x'+i+'y'+j).style.backgroundColor = "green";
			}
		}
	}
	else
	{
	for(let i=y-1;i<=y+1;i++)
		{
			for(let j=x-length;j<=x+length;j++)
			{
				if(i<0||i>9||j<0||j>9)
				{
					continue;
				}
				else if(playerMap[j][i]!=false)
				{
					return false;
				}
			//	document.getElementById('x'+j+'y'+i).style.backgroundColor = "green";

			}
		}
	}
	if(!(buildShip==4&&x==7&&arrows=='lr'||buildShip==4&&y==7&&arrows=='up'||(buildShip==21||buildShip==22)&&y==8&&arrows=='up'||(buildShip==21||buildShip==22)&&x==8&&arrows=='lr'))
	{
	if( (buildShip==4&&(!((arrows=='up'&&playerMap[x-1][y+3]==false&&playerMap[x][y+3]==false&&playerMap[x+1][y+3]==false) || (arrows=='lr'&&playerMap[x+3][y-1]==false&&playerMap[x+3][y]==false&&playerMap[x+3][y+1]==false))))||((buildShip==21||buildShip==22)&&(!((arrows=='up'&&playerMap[x-1][y+2]==false&&playerMap[x][y+2]==false&&playerMap[x+1][y+2]==false) || (arrows=='lr'&&playerMap[x+2][y-1]==false&&playerMap[x+2][y]==false&&playerMap[x+2][y+1]==false)))))
	{
		return false;
	}
}
return true;
}
//Kierunek budowania
function Arrow()
{
	sbutton.play();
	if(arrows=='up')
	{
		document.getElementById('arrow').src = 'src/img/lr.png';
		arrows='lr';
		for(let y=0;y<10;y++)
		{
			for(let x=0;x<10;x++){
		document.getElementById('x'+x+'y'+y+'').style.cursor = "w-resize";
	}
	}
}
	else
		{
			document.getElementById('arrow').src = 'src/img/updown.png';
			arrows='up';
			for(let y=0;y<10;y++)
			{
				for(let x=0;x<10;x++){
			document.getElementById('x'+x+'y'+y+'').style.cursor = "s-resize";
		}
		}
		}
}
//Czyszczenie planszy
function Clean()
{
	sbutton.play();
myShips={
					'dj': 0,
					'dd': 0,
					'sc': 0,
					'tj': 0,
					'td': 0,
					'p': 0
	}
document.getElementById('5').style.backgroundColor = "blue";
document.getElementById('4').style.backgroundColor = "blue";
document.getElementById('3.1').style.backgroundColor = "blue";
document.getElementById('3.2').style.backgroundColor = "blue";
document.getElementById('2.1').style.backgroundColor = "blue";
document.getElementById('2.2').style.backgroundColor = "blue";
	document.getElementById('p1').innerHTML = '';
	document.getElementById('p2').innerHTML = '';
	buildShip=0;
	buildingValue=19;
	for(let y=0;y<10;y++)
	{
		for(let x=0;x<10;x++)
		{
			document.getElementById('p1').innerHTML += '<div class="square" onclick="Build('+x+','+y+')" id=x'+x+'y'+y+'></div>';
			document.getElementById('p2').innerHTML += '<div class="square" onclick="Shot('+x+','+y+')" id=ex'+x+'y'+y+'></div>';
			playerMap[y][x]=false;
			enemyMap[y][x]=false;
		}
	}
}
//Losowanie planszy gracza
function Randomize()
{
	Clean();
	buildingValue=0;
	myShips={
					'dj': 2,
					'dd': 2,
					'sc': 4,
					'tj': 3,
					'td': 3,
					'p': 5
	}
	document.getElementById('5').style.backgroundColor = "gray";
	document.getElementById('4').style.backgroundColor = "gray";
	document.getElementById('3.1').style.backgroundColor = "gray";
	document.getElementById('3.2').style.backgroundColor = "gray";
	document.getElementById('2.1').style.backgroundColor = "gray";
	document.getElementById('2.2').style.backgroundColor = "gray";
	var random = Math.floor(Math.random()*9);
	if(random==0)
	{
		playerMap[0][4]='tj';
		playerMap[0][5]='tj';
		playerMap[0][3]='tj';
		playerMap[1][1]='sc';
		playerMap[1][7]='dj';
		playerMap[1][8]='dj';
		playerMap[2][1]='sc';
		playerMap[3][1]='sc';
		playerMap[3][4]='td';
		playerMap[4][1]='sc';
		playerMap[4][4]='td';
		playerMap[4][6]='p';
		playerMap[5][4]='td';
		playerMap[5][6]='p';
		playerMap[6][6]='p';
		playerMap[7][6]='p';
		playerMap[8][1]='dd';
		playerMap[8][2]='dd';
		playerMap[8][6]='p';
		document.getElementById('x0y3').classList.add('myships');
		document.getElementById('x0y4').classList.add('myships');
		document.getElementById('x0y5').classList.add('myships');
		document.getElementById('x1y1').classList.add('myships');
		document.getElementById('x1y7').classList.add('myships');
		document.getElementById('x1y8').classList.add('myships');
		document.getElementById('x2y1').classList.add('myships');
		document.getElementById('x3y1').classList.add('myships');
		document.getElementById('x3y4').classList.add('myships');
		document.getElementById('x4y1').classList.add('myships');
		document.getElementById('x4y4').classList.add('myships');
		document.getElementById('x4y6').classList.add('myships');
		document.getElementById('x5y4').classList.add('myships');
		document.getElementById('x5y6').classList.add('myships');
		document.getElementById('x6y6').classList.add('myships');
		document.getElementById('x7y6').classList.add('myships');
		document.getElementById('x8y1').classList.add('myships');
		document.getElementById('x8y2').classList.add('myships');
		document.getElementById('x8y6').classList.add('myships');
	}
	else if(random==1)
	{
		playerMap[0][9]='sc';
		playerMap[1][1]='dj';
		playerMap[1][2]='dj';
		playerMap[1][5]='dd';
		playerMap[1][6]='dd';
		playerMap[1][9]='sc';
		playerMap[2][9]='sc';
		playerMap[3][9]='sc';
		playerMap[4][1]='p';
		playerMap[4][2]='p';
		playerMap[4][3]='p';
		playerMap[4][4]='p';
		playerMap[4][5]='p';
		playerMap[6][1]='tj';
		playerMap[7][1]='tj';
		playerMap[7][6]='td';
		playerMap[7][7]='td';
		playerMap[7][8]='td';
		playerMap[8][1]='tj';
		document.getElementById('x0y9').classList.add('myships');
		document.getElementById('x1y1').classList.add('myships');
		document.getElementById('x1y2').classList.add('myships');
		document.getElementById('x1y5').classList.add('myships');
		document.getElementById('x1y6').classList.add('myships');
		document.getElementById('x1y9').classList.add('myships');
		document.getElementById('x2y9').classList.add('myships');
		document.getElementById('x3y9').classList.add('myships');
		document.getElementById('x4y1').classList.add('myships');
		document.getElementById('x4y2').classList.add('myships');
		document.getElementById('x4y3').classList.add('myships');
		document.getElementById('x4y4').classList.add('myships');
		document.getElementById('x4y5').classList.add('myships');
		document.getElementById('x6y1').classList.add('myships');
		document.getElementById('x7y1').classList.add('myships');
		document.getElementById('x7y6').classList.add('myships');
		document.getElementById('x7y7').classList.add('myships');
		document.getElementById('x7y8').classList.add('myships');
		document.getElementById('x8y1').classList.add('myships');
	}
	else if(random==2)
	{
		playerMap[0][0]='dj';
		playerMap[0][1]='dj';
		playerMap[2][9]='sc';
		playerMap[3][1]='tj';
		playerMap[3][4]='td';
		playerMap[3][9]='sc';
		playerMap[4][1]='tj';
		playerMap[4][4]='td';
		playerMap[4][9]='sc';
		playerMap[5][1]='tj';
		playerMap[5][4]='td';
		playerMap[5][9]='sc';
		playerMap[8][2]='dd';
		playerMap[8][3]='dd';
		playerMap[8][5]='p';
		playerMap[8][6]='p';
		playerMap[8][7]='p';
		playerMap[8][8]='p';
		playerMap[8][9]='p';
		document.getElementById('x0y0').classList.add('myships');
		document.getElementById('x0y1').classList.add('myships');
		document.getElementById('x2y9').classList.add('myships');
		document.getElementById('x3y1').classList.add('myships');
		document.getElementById('x3y4').classList.add('myships');
		document.getElementById('x3y9').classList.add('myships');
		document.getElementById('x4y1').classList.add('myships');
		document.getElementById('x4y4').classList.add('myships');
		document.getElementById('x4y9').classList.add('myships');
		document.getElementById('x5y1').classList.add('myships');
		document.getElementById('x5y4').classList.add('myships');
		document.getElementById('x5y9').classList.add('myships');
		document.getElementById('x8y2').classList.add('myships');
		document.getElementById('x8y3').classList.add('myships');
		document.getElementById('x8y5').classList.add('myships');
		document.getElementById('x8y6').classList.add('myships');
		document.getElementById('x8y7').classList.add('myships');
		document.getElementById('x8y8').classList.add('myships');
		document.getElementById('x8y9').classList.add('myships');
	}
	else if(random==3)
	{
		playerMap[0][7]='dj';
		playerMap[0][8]='dj';
		playerMap[3][5]='tj';
		playerMap[3][8]='sc';
		playerMap[4][2]='dd';
		playerMap[4][3]='dd';
		playerMap[4][5]='tj';
		playerMap[4][8]='sc';
		playerMap[5][0]='td';
		playerMap[5][5]='tj';
		playerMap[5][8]='sc';
		playerMap[6][0]='td';
		playerMap[6][8]='sc';
		playerMap[7][0]='td';
		playerMap[9][3]='p';
		playerMap[9][4]='p';
		playerMap[9][5]='p';
		playerMap[9][6]='p';
		playerMap[9][7]='p';
		document.getElementById('x0y7').classList.add('myships');
		document.getElementById('x0y8').classList.add('myships');
		document.getElementById('x3y5').classList.add('myships');
		document.getElementById('x3y8').classList.add('myships');
		document.getElementById('x4y2').classList.add('myships');
		document.getElementById('x4y3').classList.add('myships');
		document.getElementById('x4y5').classList.add('myships');
		document.getElementById('x4y8').classList.add('myships');
		document.getElementById('x5y0').classList.add('myships');
		document.getElementById('x5y5').classList.add('myships');
		document.getElementById('x5y8').classList.add('myships');
		document.getElementById('x6y0').classList.add('myships');
		document.getElementById('x6y8').classList.add('myships');
		document.getElementById('x7y0').classList.add('myships');
		document.getElementById('x9y3').classList.add('myships');
		document.getElementById('x9y4').classList.add('myships');
		document.getElementById('x9y5').classList.add('myships');
		document.getElementById('x9y6').classList.add('myships');
		document.getElementById('x9y7').classList.add('myships');
	}
	else if(random==4)
	{
		playerMap[0][1]='dj';
		playerMap[0][2]='dj';
		playerMap[0][6]='dd';
		playerMap[0][7]='dd';
		playerMap[2][4]='p';
		playerMap[3][4]='p';
		playerMap[4][1]='tj';
		playerMap[4][4]='p';
		playerMap[4][9]='td';
		playerMap[5][1]='tj';
		playerMap[5][4]='p';
		playerMap[5][9]='td';
		playerMap[6][1]='tj';
		playerMap[6][4]='p';
		playerMap[6][9]='td';
		playerMap[9][2]='sc';
		playerMap[9][3]='sc';
		playerMap[9][4]='sc';
		playerMap[9][5]='sc';
		document.getElementById('x0y1').classList.add('myships');
		document.getElementById('x0y2').classList.add('myships');
		document.getElementById('x0y6').classList.add('myships');
		document.getElementById('x0y7').classList.add('myships');
		document.getElementById('x2y4').classList.add('myships');
		document.getElementById('x3y4').classList.add('myships');
		document.getElementById('x4y1').classList.add('myships');
		document.getElementById('x4y4').classList.add('myships');
		document.getElementById('x4y9').classList.add('myships');
		document.getElementById('x5y1').classList.add('myships');
		document.getElementById('x5y4').classList.add('myships');
		document.getElementById('x5y9').classList.add('myships');
		document.getElementById('x6y1').classList.add('myships');
		document.getElementById('x6y4').classList.add('myships');
		document.getElementById('x6y9').classList.add('myships');
		document.getElementById('x9y2').classList.add('myships');
		document.getElementById('x9y3').classList.add('myships');
		document.getElementById('x9y4').classList.add('myships');
		document.getElementById('x9y5').classList.add('myships');
	}
	else if(random==5)
	{
		playerMap[1][3]='dj';
		playerMap[1][8]='p';
		playerMap[2][3]='dj';
		playerMap[2][8]='p';
		playerMap[3][8]='p';
		playerMap[4][4]='tj';
		playerMap[4][5]='tj';
		playerMap[4][6]='tj';
		playerMap[4][8]='p';
		playerMap[5][0]='dd';
		playerMap[5][1]='dd';
		playerMap[5][8]='p';
		playerMap[7][5]='td';
		playerMap[8][0]='sc';
		playerMap[8][1]='sc';
		playerMap[8][2]='sc';
		playerMap[8][3]='sc';
		playerMap[8][5]='td';
		playerMap[9][5]='td';
		document.getElementById('x1y3').classList.add('myships');
		document.getElementById('x1y8').classList.add('myships');
		document.getElementById('x2y3').classList.add('myships');
		document.getElementById('x2y8').classList.add('myships');
		document.getElementById('x3y8').classList.add('myships');
		document.getElementById('x4y4').classList.add('myships');
		document.getElementById('x4y5').classList.add('myships');
		document.getElementById('x4y6').classList.add('myships');
		document.getElementById('x4y8').classList.add('myships');
		document.getElementById('x5y0').classList.add('myships');
		document.getElementById('x5y1').classList.add('myships');
		document.getElementById('x5y8').classList.add('myships');
		document.getElementById('x7y5').classList.add('myships');
		document.getElementById('x8y0').classList.add('myships');
		document.getElementById('x8y1').classList.add('myships');
		document.getElementById('x8y2').classList.add('myships');
		document.getElementById('x8y3').classList.add('myships');
		document.getElementById('x8y5').classList.add('myships');
		document.getElementById('x9y5').classList.add('myships');
	}
	else if(random==6)
	{
		playerMap[1][2]='tj';
		playerMap[1][3]='tj';
		playerMap[1][4]='tj';
		playerMap[1][6]='dj';
		playerMap[1][7]='dj';
		playerMap[4][1]='p';
		playerMap[4][5]='sc';
		playerMap[4][6]='sc';
		playerMap[4][7]='sc';
		playerMap[4][8]='sc';
		playerMap[5][1]='p';
		playerMap[6][1]='p';
		playerMap[6][3]='td';
		playerMap[7][1]='p';
		playerMap[7][3]='td';
		playerMap[7][6]='dd';
		playerMap[8][1]='p';
		playerMap[8][3]='td';
		playerMap[8][6]='dd';
		document.getElementById('x1y2').classList.add('myships');
		document.getElementById('x1y3').classList.add('myships');
		document.getElementById('x1y4').classList.add('myships');
		document.getElementById('x1y6').classList.add('myships');
		document.getElementById('x1y7').classList.add('myships');
		document.getElementById('x4y1').classList.add('myships');
		document.getElementById('x4y5').classList.add('myships');
		document.getElementById('x4y6').classList.add('myships');
		document.getElementById('x4y7').classList.add('myships');
		document.getElementById('x4y8').classList.add('myships');
		document.getElementById('x5y1').classList.add('myships');
		document.getElementById('x6y1').classList.add('myships');
		document.getElementById('x6y3').classList.add('myships');
		document.getElementById('x7y1').classList.add('myships');
		document.getElementById('x7y3').classList.add('myships');
		document.getElementById('x7y6').classList.add('myships');
		document.getElementById('x8y1').classList.add('myships');
		document.getElementById('x8y3').classList.add('myships');
		document.getElementById('x8y6').classList.add('myships');
	}
	else if(random==7)
		{
			playerMap[0][8]='dj';
			playerMap[0][9]='dj';
			playerMap[1][1]='p';
			playerMap[1][3]='tj';
			playerMap[1][4]='tj';
			playerMap[1][5]='tj';
			playerMap[2][1]='p';
			playerMap[3][1]='p';
			playerMap[4][1]='p';
			playerMap[4][3]='sc';
			playerMap[5][1]='p';
			playerMap[5][3]='sc';
			playerMap[6][3]='sc';
			playerMap[7][3]='sc';
			playerMap[8][6]='td';
			playerMap[8][7]='td';
			playerMap[8][8]='td';
			playerMap[9][0]='dd';
			playerMap[9][1]='dd';
			document.getElementById('x0y8').classList.add('myships');
			document.getElementById('x0y9').classList.add('myships');
			document.getElementById('x1y1').classList.add('myships');
			document.getElementById('x1y3').classList.add('myships');
			document.getElementById('x1y4').classList.add('myships');
			document.getElementById('x1y5').classList.add('myships');
			document.getElementById('x2y1').classList.add('myships');
			document.getElementById('x3y1').classList.add('myships');
			document.getElementById('x4y1').classList.add('myships');
			document.getElementById('x4y3').classList.add('myships');
			document.getElementById('x5y1').classList.add('myships');
			document.getElementById('x5y3').classList.add('myships');
			document.getElementById('x6y3').classList.add('myships');
			document.getElementById('x7y3').classList.add('myships');
			document.getElementById('x8y6').classList.add('myships');
			document.getElementById('x8y7').classList.add('myships');
			document.getElementById('x8y8').classList.add('myships');
			document.getElementById('x9y0').classList.add('myships');
			document.getElementById('x9y1').classList.add('myships');
		}
		else if(random==8)
				{
					playerMap[1][2]='tj';
					playerMap[1][5]='dj';
					playerMap[1][8]='sc';
					playerMap[2][0]='dd';
					playerMap[2][2]='tj';
					playerMap[2][5]='dj';
					playerMap[2][8]='sc';
					playerMap[3][0]='dd';
					playerMap[3][2]='tj';
					playerMap[3][8]='sc';
					playerMap[4][8]='sc';
					playerMap[6][2]='td';
					playerMap[7][2]='td';
					playerMap[8][2]='td';
					playerMap[8][5]='p';
					playerMap[8][6]='p';
					playerMap[8][7]='p';
					playerMap[8][8]='p';
					playerMap[8][9]='p';
					document.getElementById('x1y2').classList.add('myships');
					document.getElementById('x1y5').classList.add('myships');
					document.getElementById('x1y8').classList.add('myships');
					document.getElementById('x2y0').classList.add('myships');
					document.getElementById('x2y2').classList.add('myships');
					document.getElementById('x2y5').classList.add('myships');
					document.getElementById('x2y8').classList.add('myships');
					document.getElementById('x3y0').classList.add('myships');
					document.getElementById('x3y2').classList.add('myships');
					document.getElementById('x3y8').classList.add('myships');
					document.getElementById('x4y8').classList.add('myships');
					document.getElementById('x6y2').classList.add('myships');
					document.getElementById('x7y2').classList.add('myships');
					document.getElementById('x8y2').classList.add('myships');
					document.getElementById('x8y5').classList.add('myships');
					document.getElementById('x8y6').classList.add('myships');
					document.getElementById('x8y7').classList.add('myships');
					document.getElementById('x8y8').classList.add('myships');
					document.getElementById('x8y9').classList.add('myships');
				}
}
//Losowanie planszy przeciwnika oraz rozpoczęcie gry
function CheckEngine()
{
	if(buildingValue!=0)
	{
		alert("Nie wybrano wszystkich statków");
		return;
	}
		enShips={
						'dj': 2,
						'dd': 2,
						'sc': 4,
						'tj': 3,
						'td': 3,
						'p': 5
		}
	document.getElementById('statButtons').innerHTML = '<span class="myName"> Twoja tura! </span>';
	document.getElementById('statShips').innerHTML = '<div id="Durability"> Wytrzymałość <br> <span class="myName">'+myHp+'</span> VS  <span class="enemyName">'+enHp+'</span></div>';
	sbutton.play();
	isBuildTime=false;
	yourTurn=true;
	var random=Math.floor(Math.random()*9);
	if(random==0)
	{
		enemyMap[0][3]='tj';
		enemyMap[0][4]='tj';
		enemyMap[0][5]='tj';
		enemyMap[1][1]='sc';
		enemyMap[1][7]='dj';
		enemyMap[1][8]='dj';
		enemyMap[2][1]='sc';
		enemyMap[3][1]='sc';
		enemyMap[3][4]='td';
		enemyMap[4][1]='sc';
		enemyMap[4][4]='td';
		enemyMap[4][6]='p';
		enemyMap[5][4]='td';
		enemyMap[5][6]='p';
		enemyMap[6][6]='p';
		enemyMap[7][6]='p';
		enemyMap[8][1]='dd';
		enemyMap[8][2]='dd';
		enemyMap[8][6]='p';
	}
	else if(random==1)
	{
		enemyMap[0][9]='sc';
		enemyMap[1][1]='dj';
		enemyMap[1][2]='dj';
		enemyMap[1][5]='dd';
		enemyMap[1][6]='dd';
		enemyMap[1][9]='sc';
		enemyMap[2][9]='sc';
		enemyMap[3][9]='sc';
		enemyMap[4][1]='p';
		enemyMap[4][2]='p';
		enemyMap[4][3]='p';
		enemyMap[4][4]='p';
		enemyMap[4][5]='p';
		enemyMap[6][1]='tj';
		enemyMap[7][1]='tj';
		enemyMap[7][6]='td';
		enemyMap[7][7]='td';
		enemyMap[7][8]='td';
		enemyMap[8][1]='tj';
	}
	else if(random==2)
	{
		enemyMap[0][0]='dj';
		enemyMap[0][1]='dj';
		enemyMap[2][9]='sc';
		enemyMap[3][1]='tj';
		enemyMap[3][4]='td';
		enemyMap[3][9]='sc';
		enemyMap[4][1]='tj';
		enemyMap[4][4]='td';
		enemyMap[4][9]='sc';
		enemyMap[5][1]='tj';
		enemyMap[5][4]='td';
		enemyMap[5][9]='sc';
		enemyMap[8][2]='dd';
		enemyMap[8][3]='dd';
		enemyMap[8][5]='p';
		enemyMap[8][6]='p';
		enemyMap[8][7]='p';
		enemyMap[8][8]='p';
		enemyMap[8][9]='p';
	}
	else if(random==3)
	{
		enemyMap[0][7]='dj';
		enemyMap[0][8]='dj';
		enemyMap[3][5]='tj';
		enemyMap[3][8]='sc';
		enemyMap[4][2]='dd';
		enemyMap[4][3]='dd';
		enemyMap[4][5]='tj';
		enemyMap[4][8]='sc';
		enemyMap[5][0]='td';
		enemyMap[5][5]='tj';
		enemyMap[5][8]='sc';
		enemyMap[6][0]='td';
		enemyMap[6][8]='sc';
		enemyMap[7][0]='td';
		enemyMap[9][3]='p';
		enemyMap[9][4]='p';
		enemyMap[9][5]='p';
		enemyMap[9][6]='p';
		enemyMap[9][7]='p';
	}
	else if(random==4)
	{
		enemyMap[0][1]='dj';
		enemyMap[0][2]='dj';
		enemyMap[0][6]='dd';
		enemyMap[0][7]='dd';
		enemyMap[2][4]='p';
		enemyMap[3][4]='p';
		enemyMap[4][1]='tj';
		enemyMap[4][4]='p';
		enemyMap[4][9]='td';
		enemyMap[5][1]='tj';
		enemyMap[5][4]='p';
		enemyMap[5][9]='td';
		enemyMap[6][1]='tj';
		enemyMap[6][4]='p';
		enemyMap[6][9]='td';
		enemyMap[9][2]='sc';
		enemyMap[9][3]='sc';
		enemyMap[9][4]='sc';
		enemyMap[9][5]='sc';
	}
	else if(random==5)
	{
		enemyMap[1][3]='dj';
		enemyMap[1][8]='p';
		enemyMap[2][3]='dj';
		enemyMap[2][8]='p';
		enemyMap[3][8]='p';
		enemyMap[4][4]='tj';
		enemyMap[4][5]='tj';
		enemyMap[4][6]='tj';
		enemyMap[4][8]='p';
		enemyMap[5][0]='dd';
		enemyMap[5][1]='dd';
		enemyMap[5][8]='p';
		enemyMap[7][5]='td';
		enemyMap[8][0]='sc';
		enemyMap[8][1]='sc';
		enemyMap[8][2]='sc';
		enemyMap[8][3]='sc';
		enemyMap[8][5]='td';
		enemyMap[9][5]='td';
	}
	else if(random==6)
	{
		enemyMap[1][2]='tj';
		enemyMap[1][3]='tj';
		enemyMap[1][4]='tj';
		enemyMap[1][6]='dj';
		enemyMap[1][7]='dj';
		enemyMap[4][1]='p';
		enemyMap[4][5]='sc';
		enemyMap[4][6]='sc';
		enemyMap[4][7]='sc';
		enemyMap[4][8]='sc';
		enemyMap[5][1]='p';
		enemyMap[6][1]='p';
		enemyMap[6][3]='td';
		enemyMap[7][1]='p';
		enemyMap[7][3]='td';
		enemyMap[7][6]='dd';
		enemyMap[8][1]='p';
		enemyMap[8][3]='td';
		enemyMap[8][6]='dd';
	}
	else if(random==7)
		{
			enemyMap[0][8]='dj';
			enemyMap[0][9]='dj';
			enemyMap[1][1]='p';
			enemyMap[1][3]='tj';
			enemyMap[1][4]='tj';
			enemyMap[1][5]='tj';
			enemyMap[2][1]='p';
			enemyMap[3][1]='p';
			enemyMap[4][1]='p';
			enemyMap[4][3]='sc';
			enemyMap[5][1]='p';
			enemyMap[5][3]='sc';
			enemyMap[6][3]='sc';
			enemyMap[7][3]='sc';
			enemyMap[8][6]='td';
			enemyMap[8][7]='td';
			enemyMap[8][8]='td';
			enemyMap[9][0]='dd';
			enemyMap[9][1]='dd';
		}
		else if(random==8)
				{
					enemyMap[1][2]='tj';
					enemyMap[1][5]='dj';
					enemyMap[1][8]='sc';
					enemyMap[2][0]='dd';
					enemyMap[2][2]='tj';
					enemyMap[2][5]='dj';
					enemyMap[2][8]='sc';
					enemyMap[3][0]='dd';
					enemyMap[3][2]='tj';
					enemyMap[3][8]='sc';
					enemyMap[4][8]='sc';
					enemyMap[6][2]='td';
					enemyMap[7][2]='td';
					enemyMap[8][2]='td';
					enemyMap[8][5]='p';
					enemyMap[8][6]='p';
					enemyMap[8][7]='p';
					enemyMap[8][8]='p';
					enemyMap[8][9]='p';
				}
}
//Koniec rundy
function EndOfRound(isWin)
{
	background.pause();
	document.getElementById("container").classList.remove('containerg');
		if(year==1940)
		{
			if((isWin==false&&alliance=='a')||(isWin==true&&alliance=='o'))
			{
					uk=false;
			}
			else
			{
				ger=false;
			}
			year=1942;
			Map();
		}
		else if(year==1942)
		{
			if((isWin==false&&alliance=='a')||(isWin==true&&alliance=='o'))
			{
					us=false;
			}
			else
			{
				jp=false;
			}
			if(uk==true&&us==true)
			{
				document.getElementById('container').innerHTML= '<h1>Zwycięstwo Aliantów!</h1>';
				document.getElementById('container').innerHTML+= '<div id="battlemap"><img src="src/img/pokoj.png"</div>';
				document.getElementById('container').innerHTML+= '<h3>Siły państw osi zostały zniszczone, a po niedługim czasie skapitulowały, wkrótce odbędzie się konferencja pokojowa która ustali nowy porządek świata.	 </h3>';
			}
			else if(ger==true&&jp==true)
			{
				document.getElementById('container').innerHTML= '<h1>Zwycięstwo państw osi!</h1>';
				document.getElementById('container').innerHTML+= '<div id="battlemap"><img src="src/img/pokoj.png"</div>';
				document.getElementById('container').innerHTML+= '<h3>Alianci przegrywając na morzu zostali odizolowani od dostaw zaopatrzenia, a po niedługim czasie zmuszeni do kapitulacji. Państwa osi przejęły kolonie stając się potęgą militarną.</h3>';
			}
			else{
			year=1945;
			Map();
			}
		}
		else if(year==1945)
		{
		if(alliance=='a'&&isWin||alliance=='o'&&isWin==false)
		{
			document.getElementById('container').innerHTML= '<h1>Zwycięstwo Aliantów!</h1>';
			document.getElementById('container').innerHTML+= '<div id="battlemap"><img src="src/img/pokoj.png"</div>';
			document.getElementById('container').innerHTML+= '<h3>Siły państw osi zostały zniszczone, a po niedługim czasie skapitulowały, wkrótce odbędzie się konferencja pokojowa która ustali nowy porządek świata.	 </h3>';
		}
		else if(alliance=='o'&&isWin||alliance=='a'&&isWin==false)
		{
			document.getElementById('container').innerHTML= '<h1>Zwycięstwo państw osi!</h1>';
			document.getElementById('container').innerHTML+= '<div id="battlemap"><img src="src/img/pokoj.png"</div>';
			document.getElementById('container').innerHTML+= '<h3>Alianci przegrywając na morzu zostali odizolowani od dostaw zaopatrzenia, a po niedługim czasie zmuszeni do kapitulacji. Państwa osi przejęły kolonie stając się potęgą militarną.</h3>';
		}
	}
}
