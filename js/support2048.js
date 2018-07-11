documentWith = window.screen.availWidth < window.screen.availHeight ? window.screen.availWidth:window.screen.availHeight;
gridContainerWidth = 0.79 * documentWith;
cellSideLength = 0.16 * documentWith;
cellSpace = 0.03 * documentWith;
//20是格子之间的距离，100是一个小格子的宽度
function getPosTop(i, j){
	return cellSpace+i*(cellSpace + cellSideLength);
}

function getPosLeft(i, j){
	return cellSpace+j*(cellSpace + cellSideLength);
}
// 数字方块的背景色与前景色的获取
function getNumberBackgroundColor(number){

	switch(number){
		case 2: return "#eee4da"; break;
		case 4: return "#ede0c8"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f07c5f"; break;
		case 64: return "#ff5e3b"; break;
		case 128: return "#edcf72"; break;
		case 256: return "#fd0361"; break;
		case 512: return "#9c0"; break;
		case 1024: return "#33b5e5"; break;
		case 2048: return "#09c"; break;
		case 4096: return "#a6c"; break;
		case 8192: return "#93c"; break;
		case 16384: return "#888"; break;
		default: return "#111";break;
	}

	return "black";
}


function getTextValue(number){
	switch(number){
		case 2: return "小白"; break;
		case 4: return "实习僧"; break;
		case 8: return "码农"; break;
		case 16: return "程序猿"; break;
		case 32: return "攻城狮"; break;
		case 64: return "项目经理"; break;
		case 128: return "部门主管"; break;
		case 256: return "经理秘书"; break;
		case 512: return "总经理"; break;
		case 1024: return "执行官"; break;
		case 2048: return "董事长"; break;
		case 4096: return "嘉诚女婿"; break;
		case 8192: return "盖茨基友"; break;
		case 16384: return "~神~"; break;
		case 16384: return "~超神~"; break;
		default: return "END";break;
	}
	return "black";
}

function getNumberColor(number){
	if(number <= 4){
		return "#776e65";
	}
	return "white";
}
// 有无空格
function nospace(board){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}
//检测能否左移
function canMoveLeft(board){
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if(board[i][j] != 0){
				if(board[i][j-1] == 0
					|| board[i][j-1] == board[i][j]){
					return true;
			}
		}
	}
}
return false;
}
function canMoveRight(board){
	for(var i=0; i<4; i++){
		for(var j=2; j>=0; j--){
			if(board[i][j] != 0){
				if(board[i][j+1] == 0
					|| board[i][j+1] == board[i][j]){
					return true;
			}
		}
	}
}
return false;
}

function canMoveUp(board){
	for(var j=0; j<4; j++){
		for(var i=1; i<4; i++){
			if(board[i][j] != 0){
				if(board[i-1][j] == 0
					|| board[i-1][j] == board[i][j]){
					return true;
			}
		}
	}
}
return false;
}

function canMoveDown(board){
	for(var j=0; j<4; j++){
		for(var i=2; i>=0; i--){
			if(board[i][j] != 0){
				if(board[i+1][j] == 0
					|| board[i+1][j] == board[i][j]){
					return true;
			}
		}
	}
}
return false;
}
/**
 * [noBlockHorizontal description]
 * @param  {[type]} row   [description]
 * @param  {[type]} col1  [description]
 * @param  {[type]} col2  [description]
 * @param  {[type]} board [description]
 * @return {[type]}       [description]
 * 检测两个格子间(同一行)有没有阻碍的函数
 */
function noBlockHorizontal(row, col1, col2, board){
	for(var i=col1+1; i<col2; i++){
		if(board[row][i] != 0){
			return false;
		}
	}
	return true;
}
/**
 * [noBlockHorizontal description]
 * @param  {[type]} row   [description]
 * @param  {[type]} col1  [description]
 * @param  {[type]} col2  [description]
 * @param  {[type]} board [description]
 * @return {[type]}       [description]
 * 检测两个格子间(同一列)有没有阻碍的函数
 */
function noBlockVertical(row1, row2, col, board){
	for(var i=row1+1; i<row2; i++){
		if(board[i][col] != 0){
			return false;
		}
	}
	return true;
}

function noMove(board){
	if(canMoveDown(board)
		||canMoveUp(board)
		||canMoveRight(board)
		||canMoveLeft(board)){
		return false;
}
return true;
}

function uploadGrade(){
	
	
}

