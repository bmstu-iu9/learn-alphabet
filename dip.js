var RU = [];
var KO = [];
var NU = [];

const TRANSLIT = [
	{ ru: "A", ko: ["ㅏ"] },
	{ ru: "Ё", ko: ["ㅕ", "ㅛ"] },
];


RU[0] = "А";
RU[1] = "Б";
RU[2] = "В";
RU[3] = "Г";
RU[4] = "Д";
RU[5] = "Е";
RU[6] = "Ё";
RU[7] = "ЁЁ";
RU[8] = "Ж";
RU[9] = "З";
RU[10] = "И";
RU[11] = "Й";
RU[12] = "К";
RU[13] = "Л";
RU[14] = "М";
RU[15] = "Н";
RU[16] = "НН";
RU[17] = "О";
RU[18] = "ОО";
RU[19] = "П";
RU[20] = "Р";
RU[21] = "С";
RU[22] = "Т";
RU[23] = "У";
RU[24] = "Ф";
RU[25] = "Х";
RU[26] = "Ц";
RU[27] = "Ч";
RU[28] = "Ш";
RU[29] = "Щ";
RU[30] = "Ъ";
RU[31] = "Ы";
RU[32] = "Ь";
RU[33] = "Э";
RU[34] = "Ю";
RU[35] = "Я";
RU[36] = "ЯЯ";
RU[37] = "ВЕ";
RU[38] = "ВЁ";
RU[39] = "ВИ";
RU[40] = "ВО";
RU[41] = "ВА";
RU[42] = "ЫЙ";

KO[0] = "ㅏ";
KO[1] = "0";
KO[2] = "0";
KO[3] = "0";
KO[4] = "0";
KO[5] = "ㅔ";
KO[6] = "ㅕ";
KO[7] = "ㅛ";
KO[8] = "0";
KO[9] = "0";
KO[10] = "ㅣ";
KO[11] = "ㅖ";
KO[12] = "ㄱ";
KO[13] = "0";
KO[14] = "ㅁ";
KO[15] = "ㄴ";
KO[16] = "ㅇ";
KO[17] = "ㅓ";
KO[18] = "ㅗ";
KO[19] = "ㅂ";
KO[20] = "ㄹ";
KO[21] = "ㅅ";
KO[22] = "ㄷ";
KO[23] = "ㅜ";
KO[24] = "0";
KO[25] = "ㅎ";
KO[26] = "0";
KO[27] = "ㅈ";
KO[28] = "0";
KO[29] = "0";
KO[30] = "0";
KO[31] = "ㅡ";
KO[32] = "0";
KO[33] = "ㅐ";
KO[34] = "ㅠ";
KO[35] = "ㅑ";
KO[36] = "ㅒ";
KO[37] = "ㅚ";
KO[38] = "ㅞ";
KO[39] = "ㅟ";
KO[40] = "ㅝ";
KO[41] = "ㅘ";
KO[42] = "ㅢ";

var sphrase;
var sphrase2;


function readFile(object) 
{
	var file = object.files[0];
	var reader = new FileReader();

	var result = document.getElementById("result");
	var tbl = document.getElementById("tbl");
	var trans = document.getElementById("trans");
	var element;
	var i;
	var j;
	// var num = 0;
	
	var searching;
	var foundPos;
	var pos;
	var tblcont;


	reader.onload = function() 
	{
		// reader.addEventListener("loadend", function());
		sphrase = reader.result;
		document.getElementById('out').innerHTML =
			sphrase.replace(new RegExp('\n', 'g'), "<br>");
	}
	reader.readAsText(file);


	


    window.setTimeout(function()
    {
    	sphrase2 = sphrase;
		sphrase = sphrase.toUpperCase();
		
		for(j=0; j<RU.length; j++)
		{
			NU[j] = 0;
			searching = true;
			pos = 0;
			while(searching)
			{
				foundPos = sphrase.indexOf(RU[j], pos);
				// foundPos = sphrase.indexOf("А", pos);
				if(foundPos == -1)
				{
					searching = false;
				}
				else
				{					
					NU[j]++;
					pos = foundPos + 1; // продолжаем со следующей позиции
				}
				// alert(foundPos + "[" + j + "]");
				// return;
			}
		}
		tblcont = "<tr>";
		tblcont += "<th>Русский</th>";
		tblcont += "<th>Количество</th>";
		tblcont += "<th>Корейский</th>";
		tblcont += "</tr>";

		for(i=0; i<RU.length; i++)
		{
			tblcont += "<tr>";
			tblcont += "<td>" + RU[i] + "</td>";
			tblcont += "<td>" + NU[i] + "</td>";
			if(KO[i] == 0)
			{
				tblcont += "<td></td>";
			}
			else
			{
				tblcont += "<td>" + KO[i] + "</td>";
			}
			tblcont += "</tr>";
		}		

		tbl.innerHTML = tblcont;

		trans.innerHTML = "<button onclick='translit()'>Транслитерировать</button>";
	}, 400);
} 


function translit()
{
	var transtext = document.getElementById("transtext");
	var parts = RU.length;
	var psize = 0;
	var part;
	var i;
	var st;

	psize = parseInt(sphrase.length/parts);

	for(i=0; i<parts; i++)
	{
		transtext.innerHTML += "<hr>";
		if(KO[i] == 0)
		{
			transtext.innerHTML += "<span>Символ <strong>" + RU[i] + "</strong> - корейский эквивалент отсутствует</span><br><br>";
		}
		else
		{
			transtext.innerHTML += "<span>Символ <strong>" + RU[i] + "</strong> заменен на " + KO[i] + "</span><br><br>";
		}

		if(i == (parts-1))
		{
			part = sphrase2.substring(i*psize);
		}
		else
		{
			part = sphrase2.substring(i*psize, (i+1)*psize);
		}

		for (let k = 0; k <= i; ++k)
		{
			if(KO[k] != 0)
			{
				let res = "";
				for (let j = 0; j < part.length; /* пусто */)
				{
					if (part.substring(j, j + RU[k].length).toUpperCase() == RU[k])
					{
						res += "<span style='color:#f00'><strong>" + KO[k] + "</strong></span>";
						j += RU[k].length;
					}
					else
					{
						res += part[j];
						j += 1;
					}
				}
				part = res;
			}
		}

		
		transtext.innerHTML += part;
	}




	// transtext.innerHTML = parts + " " + sphrase.length + " " + psize;

}
