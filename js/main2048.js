var board = new Array();	//存储游戏的数据
var score = 0;	//分数
var currentPosition = 0;//当前职位
var hasConflicted = new Array();//冲突事件
var isGameOverFlag = false;//是否结束
var isMoving = false;//关闭操作
var canScroll = true;//禁用滚屏
// 定义一个newGame函数,并且等document加载完后调用它
$(document).ready(function(){
	//为移动端初始化宽度
	prepareForMobile();
	newgame();
}); 

function prepareForMobile(){
	if( documentWith > 400){
		//documentWith = 400;
		gridContainerWidth = 316;
		cellSpace = 12;
		cellSideLength = 64;
	}
	$('#grid-container').css('width', gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('height', gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding', cellSpace);
	$('#grid-container').css('border-radius', 0.02*gridContainerWidth);

	$('.grid-cell').css('width', cellSideLength);
	$('.grid-cell').css('height', cellSideLength);
	$('.grid-cell').css('border-radius', 0.02*cellSideLength);
}
function newgame(){
	isGameOverFlag = false;
	currentPosition = 0;
	score = 0;
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init(){
	// 更新成绩
	updateScore(score, 2);
	//有数字的小方块
	for(var i=0; i<4; i++){
		for (var j= 0; j < 4; j++) {
			var gridCell = $('#grid-cell-'+i+"-"+j);
			// 定位
			gridCell.css('top',getPosTop(i, j));
			gridCell.css('left',getPosLeft(i, j));
		}
	}
	 //初始化board数组
	 for(var i=0; i<4; i++){
	 	board[i] = new Array();
	 	hasConflicted[i] = new Array();
	 	for(var j=0; j<4; j++){
	 		board[i][j] = 0;
	 		hasConflicted[i][j] = false;
	 	}
	 }
	//有操作,更新界面
	updateBoardView();

	
}
//更新棋盘上显示的方块
function updateBoardView(){
	//如果有number-cell后先删除
	$(".number-cell").remove();
	//遍历格子，改变样式
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if(board[i][j] == 0){
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i, j)+cellSideLength/2);
				theNumberCell.css('left', getPosLeft(i, j)+cellSideLength/2);
			}else{
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css('height', cellSideLength);
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(getTextValue(board[i][j]));
			}
			hasConflicted[i][j] = false;
		}
	}
	$('.number-cell').css('line-height', cellSideLength+'px');
	$('.number-cell').css('font-size', 0.2 * cellSideLength+'px');
	// $('.number-cell').css('text-shadow', 'none');
}
// 在格子上随机生成一个数字
function generateOneNumber(){
	//判断是否可以继续进行 有无空格
	if(nospace(board)){
		return false;

	}
	//随机生成一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	//看是不是空格,优化随机
	var times = 0;
	while(times < 50){
		if(board[randx][randy] == 0){
			break;
		}
		//重复
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
		times++;
	}
	if(times == 50){
		for(var i=0; i<4; i++){
			for(var j=0; j<4; j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;

				}
			}
		}
	}
	//随机一个数字 2或4
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	//显示随机数字 并更新board数组
	board[randx][randy] = randNumber;
	updateScore(score, randNumber);
	//动画
	showNumberWithAnimation(randx, randy, randNumber);
	//开启操作
	isMoving = false;
	return true;

}

$(document).keydown(function(event){
	if(!canScroll){
		switch(event.keyCode){
			case 37:
		event.preventDefault();//remove按键默认效果
		if(!isGameOverFlag){
			if(!isMoving){
				if(moveLeft()){
					isMoving = true;
					setTimeout("generateOneNumber()", 210);
					setTimeout("isGameOver()", 300);
				}
			}
			
		}else{
			gameOver();
		}
		
		break;
		case 38:
		event.preventDefault();//remove按键默认效果
		if(!isGameOverFlag){
			if(!isMoving){
				if(moveUp()){
					isMoving = true;//关闭操作
					setTimeout("generateOneNumber()", 210);
					setTimeout("isGameOver()", 300);
				}
			}
		}else{
			gameOver();
		}
		break;
		case 39:
		event.preventDefault();//remove按键默认效果
		if(!isGameOverFlag){
			if(!isMoving){
				if(moveRight()){
					isMoving = true;
					setTimeout("generateOneNumber()", 210);
					setTimeout("isGameOver()", 300);
				}
			}
		}else{
			gameOver();
		}
		break;
		case 40:
		event.preventDefault();//remove按键默认效果
		if(!isGameOverFlag){
			if(!isMoving){
				if(moveDown()){
					isMoving = true;
					setTimeout("generateOneNumber()", 210);
					setTimeout("isGameOver()", 300);
				}
			}
		}else{
			gameOver();
		}
		break;
		default:
		break;
	}
}

})

document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
	if(!canScroll){
		event.preventDefault();//remove按键默认效果
	}
});


document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;
	var moveLength = 0.05*documentWith;
	if(moveLength > 30){ 
		moveLength = 30;
	}
	if(Math.abs(deltax)<moveLength && Math.abs(deltay)<moveLength){
		return;
	}
	if(!canScroll){
		if(Math.abs(deltax) >= Math.abs(deltay)){
			if(deltax > 0){
				if(!isGameOverFlag){
					if(!isMoving){
						if(moveRight()){
							isMoving = true;
							setTimeout("generateOneNumber()", 210);
							setTimeout("isGameOver()", 550);
						}
					}
				}else{
					gameOver();
				}
			}else{
				if(!isGameOverFlag){
					if(!isMoving){
						if(moveLeft()){
							isMoving = true;
							setTimeout("generateOneNumber()", 210);
							setTimeout("isGameOver()", 550);
						}
					}
				}else{
					gameOver();
				}
			}
		}else{
			if(deltay > 0){
				if(!isGameOverFlag){
					if(!isMoving){
						if(moveDown()){
							isMoving = true;
							setTimeout("generateOneNumber()", 210);
							setTimeout("isGameOver()", 550);
						}
					}
				}else{
					gameOver();
				}
			}else{
				if(!isGameOverFlag){
					if(!isMoving){
						if(moveUp()){
							isMoving = true;
							setTimeout("generateOneNumber()", 210);
							setTimeout("isGameOver()", 550);
						}
					}
				}else{
					gameOver();
				}
			}
		}
	}
	
});


function isGameOver(){
	if(nospace(board) && noMove(board)){
		gameOver();
	}

}
function gameOver(){
	isGameOverFlag = true;
	alert("老板说不给你涨了！\n换个公司重新来过吧！");
}

/**
 * [moveLeft description]
 * @return {[type]} [description]
 * 只需要遍历右边的12个格子，先判断遍历到的这个格子是不是有值，有的话则遍历其左边的所有格子。这里就分成两种情况
 * 1.目标格子是空的，且中间没有阻碍，于是可以移动过去
 * 2.目标格子的值和自身是相等的，而且中间没有阻碍，那么就可以合并
除了这两种情况以外的都不需要做什么操作。
 */
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	 //遍历右边12个格子
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if(board[i][j] != 0){
				//有数字则遍历左边
				for(var k=0; k<j; k++){
					//看落点是否为空且路上有无障碍	
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i, j, i, k);
						// 更新
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)&& !hasConflicted[i][k]){
						// move
						showMoveAnimation(i, j, i, k);
						// 更新
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//分数增加
						score+=board[i][k];
						updateScore(score, board[i][k]);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	//遍历完后更新格子显示状态,慢一点才能显示动画
	setTimeout("updateBoardView()", 200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	for(var i=0; i<4; i++){
		for(var j=2; j>=0; j--){
			if(board[i][j] != 0){
				for(var k=3; k>j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score+=board[i][k];
						updateScore(score, board[i][k]);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}

function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	for(var j=0; j<4; j++){
		for(var i=1; i<4; i++){
			if(board[i][j] != 0){
				for(var k=0; k<i; k++){
					if(board[k][j] == 0 && noBlockVertical(k,i,j,board)){
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(k,i,j,board)&& !hasConflicted[k][j]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score+=board[k][j];
						updateScore(score, board[k][j]);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	for(var j=0; j<4; j++){
		for(var i=2; i>=0; i--){
			if(board[i][j] != 0){
				for(var k=3; k>i; k--){
					if(board[k][j] == 0 && noBlockVertical(i,k,j,board)){
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(i,k,j,board)&& !hasConflicted[k][j]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score+=board[k][j];
						updateScore(score, board[k][j]);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()", 200);
	return true;
}