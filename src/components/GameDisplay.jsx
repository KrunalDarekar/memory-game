import { useEffect } from "react";
import { useState } from "react";
import getPokemons from "./getPokemons";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function GameDisplay () {
    const [pokemons, setPokemons] = useState([])
    const [gameMsg, setGameMsg] = useState("your score is 0")
    const [clickedArr, setClickedArr] = useState([])
    const [score, setScore] = useState(0)
    const [higestScore, setHighestScore] = useState(0)

    const shufflePokemonArr = () => {
        const shuffledPokemons = shuffleArray([...pokemons]);
        setPokemons(shuffledPokemons)
    }

    useEffect(() => {

        async function fetchPokemons() {
            setPokemons( await getPokemons())
        }

        fetchPokemons()
    },[])

    const handleCardClick = (pokemon) => {
        if(clickedArr.includes(pokemon.id)) {
            setScore(0)
            setClickedArr([])
            setGameMsg(`ohh you clicked on ${pokemon.name} twice try again`)
        } else {
            if(score === 7) {
                if(score + 1 > higestScore) setHighestScore(score + 1)
                setGameMsg("you have won the game")
                setClickedArr([])
                setScore(0)
            } else {
                if(score + 1 > higestScore) setHighestScore(score + 1)
                setScore(score + 1)
                const newArr = [...clickedArr, pokemon.id]
                setClickedArr(newArr)
                setGameMsg(`your score is ${score + 1}`)
            }
        }
        const updatedPokemons = pokemons.map((pokemon) => {
            return { ...pokemon, isClicked: true };
        });
        setPokemons(updatedPokemons);
        
        setPokemons(updatedPokemons);
        
          // Force re-render by setting the pokemons state to an empty array and then back to the updated array
        setPokemons([]);
        setPokemons(updatedPokemons);
        
          // Shuffle the array after some time (after the rotation animation completes)
        setTimeout(() => {
            shufflePokemonArr();
        }, 1000);
    }

    return (
        <>
        <div className="cards">
            {
                pokemons.map((pokemon) => (
                    <div
                      key={pokemon.id}
                      className={`card ${pokemon.isClicked ? 'rotate' : ''}`}
                      onClick={() => handleCardClick(pokemon)}
                    >
                      <h3>{pokemon.name}</h3>
                      <img src={pokemon.image} alt={`image of ${pokemon.name}`} />
                    </div>
                ))
            }
        </div>
        <div className="game-msg">{gameMsg}</div>
        <div className="highest">highest socre: {higestScore}</div>
        </>
    )
}

export default GameDisplay;