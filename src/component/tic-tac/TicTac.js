import React, { useState } from 'react';
import './tic-tac-css/tic-tack.css';

function Square({ value, onSquareClick }) {
	return (
		<button onClick={onSquareClick} className="square">
			{value}
		</button>
	);
}

const TicTac = ({ squares, xIsNext, onPlay }) => {
	// const [squares, setSquares] = useState(Array(9).fill(null));
	// const [xIsNext, setXIsNext] = useState(true);

	// функция который получает номер кватрата и зависает в нем х или о
	function handleClick(i) {
		// Проверяем значению если х или о не записавать в него о или х
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		const nextSquares = squares.slice();
		// Меняем значения в х или о
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}

		onPlay(nextSquares);
		// Устанавливаем значения в массив х или о
		// setSquares(nextSquares);

		// Устанавливаем если false в true если true в false
		// setXIsNext(!xIsNext);
	}

	const winner = calculateWinner(squares);

	return (
		<>
			{/* Определаям победилтеля или кто будет дальше ходит */}
			<div className="status">{winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')}</div>

			<div className="board-row">
				{/* Передаем значения по индексу */}
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
};

const Game = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;

	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = 'Go to move # ' + move;
		} else {
			description = 'Go to game Start';
		}

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<TicTac xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
};
export default Game;

// Вычисляет кто победел
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
