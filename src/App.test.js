import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';


describe("Setup of the game", () => {
  it("Should have a board", () => {
    render(<App />);
    const board = screen.getByTestId('gameBoard');
    expect(board).toBeInTheDocument();
  })


  it("Should have 9 sqaures", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    expect(squares).toHaveLength(9);
  })

  it("Should have 9 empty sqaures", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    squares.forEach((sq) => {
      expect(sq.textContent).toBe('');
    })
  })

  it("should display Next move is X as message", () =>{

    const {getByTestId} = render(<App />);
    expect(getByTestId('gameBoard')).toHaveTextContent('Next move is X');
   })

});



describe('Funtionality of the game', () => {

  it("Should indicate next player's turn", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    const indicator = screen.getByTestId('gameBoard');
    expect(indicator.textContent).toBe('Next move is X');
    fireEvent.click(squares[3]);
    expect(indicator.textContent).toBe('Next move is O');
    fireEvent.click(squares[6]);
    expect(indicator.textContent).toBe('Next move is X');
  })

  it("Should display next player on the square", () => {
    render(<App />);
    const square = screen.getAllByTestId('square');
    fireEvent.click(square[3]);
    expect(square[3].textContent).toBe('X');
    fireEvent.click(square[4]);
    expect(square[4].textContent).toBe('O');
    fireEvent.click(square[6]);
    expect(square[6].textContent).toBe('X');
  })

  it("Should not modify already marked square", ()=>{
    render(<App />);
    const square = screen.getAllByTestId('square');
    fireEvent.click(square[0]);
    fireEvent.click(square[0]);   
    expect(square[0].textContent).toBe('X');
    fireEvent.click(square[3]);
    fireEvent.click(square[3]);   
    expect(square[3].textContent).toBe('O');
  })

  it("Should display X as the winner", ()=>{
    render(<App />);
    const square = screen.getAllByTestId('square');
    const winner = screen.getByTestId('gameBoard');
    fireEvent.click(square[0]);
    fireEvent.click(square[1]);
    fireEvent.click(square[2]);
    fireEvent.click(square[3]);
    fireEvent.click(square[4]);
    fireEvent.click(square[6]);
    fireEvent.click(square[8]);
    expect(winner.textContent).toBe('Winner is : X');
  })

  it("Should display O as the winner", ()=>{
    render(<App />);
    const square = screen.getAllByTestId('square');
    const winner = screen.getByTestId('gameBoard');
    fireEvent.click(square[3]);
    fireEvent.click(square[4]);
    fireEvent.click(square[5]);
    fireEvent.click(square[6]);
    fireEvent.click(square[0]);
    fireEvent.click(square[2]);
    expect(winner.textContent).toBe('Winner is : O');
  })

  it("Should not mark the next player after the opponent has won", ()=>{
    render(<App />);
    const square = screen.getAllByTestId('square');
    fireEvent.click(square[3]);
    fireEvent.click(square[4]);
    fireEvent.click(square[5]);
    fireEvent.click(square[6]);
    fireEvent.click(square[0]);
    fireEvent.click(square[2]);
    fireEvent.click(square[1]);
    expect(square[1].textContent).toBe('');
  })
});
