	// 实现动画效果
	function showNumberWithAnimation(i, j, randNumber){
		
		var numberCell = $('#number-cell-'+i+"-"+j);

		numberCell.css('background-color', getNumberBackgroundColor(randNumber));
		numberCell.css('color', getNumberColor(randNumber));
		numberCell.text(getTextValue(randNumber));

		numberCell.animate({
			width:cellSideLength*1.2,
			height:cellSideLength*1.2,
			top:getPosTop(i, j)-cellSideLength*0.1,
			left:getPosLeft(i, j)-cellSideLength*0.1
		}, 100);

		numberCell.animate({
			width:cellSideLength,
			height:cellSideLength,
			top:getPosTop(i, j),
			left:getPosLeft(i, j)
		}, 100);
	}
	//移动动画
	function showMoveAnimation(fromx, fromy, tox, toy){
		var numberCell = $('#number-cell-'+fromx+"-"+fromy);
		numberCell.animate({
			top:getPosTop(tox, toy),
			left:getPosLeft(tox, toy)
		}, 200);
	}

	function updateScore(score, currentScore){
		$("#score").text(score);
		if(currentPosition < currentScore){
			currentPosition = currentScore;
			$("#position").text(getTextValue(currentPosition));
		}
	}