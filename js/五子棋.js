/*
* @Author: UEK-2016
* @Date:   2017-10-27 08:59:30
* @Last Modified by:   UEK-2016
* @Last Modified time: 2017-11-09 09:20:13
*/
let start=document.querySelector("#start");
let box=document.querySelector(".box");
let qizi=document.querySelector("#qizi");
let cobj=qizi.getContext("2d");
	let isai=false;
	let ai=document.querySelector("#ai");
	ai.onfocus=function(){
		isai=true;
	}
	start.onclick=function(){
		box.classList.add("show");
		start.style.display="none";
	};
	let w=30;
	// 画线
	function gezi(){
		cobj.clearRect(0, 0, 460, 460);
		cobj.strokeStyle="#000";
	    cobj.lineWidth=1;
	    cobj.beginPath();
	    for(let i=0;i<15;i++){
	    	cobj.moveTo(20+i*w, 20);
	    	cobj.lineTo(20+i*w, 440);
	    	cobj.moveTo(20, 20+i*w);
	    	cobj.lineTo(440, 20+i*w);
	    }
	    // cobj.rect(20, 20, 439, 439);
	    cobj.stroke();
	    // 画红点
	    dian(3,3);
	    dian(7,7);
	    dian(11,3);
	    dian(3,11);
	    dian(11,11);
	    function dian(x,y){
	    	cobj.save();
	    	cobj.translate(x*w+20, y*w+20);
	    	cobj.beginPath();
	    	cobj.fillStyle="red";
	    	cobj.arc(0, 0,6,0,2*Math.PI,true);
	    	cobj.fill();
	    	cobj.restore();
	    };
	   
	};
	gezi();
	// 黑白子
	let pos={};
	let blank={};
	function chess(x,y,color){
		cobj.save();
		cobj.translate(x*w+20, y*w+20);
		cobj.fillStyle=color;
		cobj.beginPath();
		cobj.arc(0,0,10,0,2*Math.PI,true);
		cobj.fill();
		cobj.restore();
		pos[j(x,y)]=color;
		delete blank[j(x,y)]
	}
	 for(let i=0;i<15;i++){
		    for(let k=0;k<15;k++){
		        blank[j(i,k)]=true;
			}
		}

	let flag=true;
	
	// 点击下子
	qizi.onclick=function(e){
		let x=Math.round((e.offsetX-20)/w);
		let y=Math.round((e.offsetY-20)/w);
		if(pos[j(x,y)]){
			return;
		}
		if(flag){
			chess(x,y,"black");
			if(check(x,y,"black")===5){
				over("黑");
			}
			if(isai){
				let p=getpos();
				chess(p.x,p.y,"white");
				if(check(p.x,p.y,"white")===5){
					over("白");
				}
				return;
			}
		}else{
			chess(x,y,"white");
			if(check(x,y,"white")===5){
				over("白");
			}
		}
		flag=!flag;
	};
	function getpos(){
		let max1=0;
	    let pos1={};
	    for(let i in blank){
	        let x=parseInt(i.split("_")[0]);
	        let y=parseInt(i.split("_")[1]);
	        let length=check(x,y,"black");
	        if(length>max1){
	            max1=length;
	            pos1={x,y};
	        }
	    }
	    let max2=0;
	    let pos2={};
	    for(let i in blank){
	        let x=parseInt(i.split("_")[0]);
	        let y=parseInt(i.split("_")[1]);
	        let length=check(x,y,"white");
	        if(length>max2){
	            max2=length;
	            pos2={x,y};
	        };
	    };
	     if(max1>max2){
	        return pos1;
	    }else {
	        return pos2;
	    };
	};
	function j(x,y){
		return x+"_"+y;
	}
	// 判断获胜
	function check(x,y,color){
		let row=1;
		let i=1;
		while(pos[j(x-i,y)]===color){
			row++;
			i++;
		}
		i=1;
		while(pos[j(x+i,y)]===color){
			row++;
			i++;
		}
		let col=1;
		i=1;
		while(pos[j(x,y+i)]===color){
			col++;
			i++;
		}
		i=1;
		while(pos[j(x,y-i)]===color){
			col++;
			i++;
		}
		let x1=1;
		i=1;
		while(pos[j(x+i,y+i)]===color){
			x1++;
			i++;
		}
		i=1;
		while(pos[j(x-i,y-i)]===color){
			x1++;
			i++;
		}
		let x2=1;
		i=1;
		while(pos[j(x-i,y+i)]===color){
			x2++;
			i++;
		}
		i=1;
		while(pos[j(x+i,y-i)]===color){
			x2++;
			i++;
		}
		return Math.max(row,col,x1,x2);
	}

	let restart=document.querySelector("#restart");
	let mask=document.querySelector(".mask");
	let qipu=document.querySelector("#qipu");
	let imgbox=document.querySelector(".img-box");
	let a=document.querySelector("a");
	let h=document.querySelector("h3");
	function over(name){
		mask.style.display="block";
		h.innerHTML=name+"棋获胜"; 
	}
	restart.onclick=function(){
		cobj.clearRect(0, 0, 460, 460);
		pos={};
		mask.style.display="none";
		start.style.display="block";
		box.classList.remove("show");
		gezi();
	}
	qipu.onclick=function(){
		imgbox.style.display="block";
		let url=qizi.toDataURL();
		let newimg=new Image();
		newimg.src=url;
		imgbox.appendChild(newimg);
		a.style.display="block";
		a.href=url;
		a.setAttribute("download", "棋谱.png");
	}
	
	