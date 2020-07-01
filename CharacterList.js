import React, {useState, useEffect} from 'react';
import Card from '../Cards/Card';
import {getCharacter, getAllCharacters} from '../helpers/helper';
import {Link} from 'react-router-dom';
import { Container, Button, ParticularButton, GridContainer, Form} from './Character.style';
import Nav from '../Nav/Nav';

function App() {
    const [characterData, setCharacterData] = useState([])
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const initialURL = 'https://rickandmortyapi.com/api/character/'


    useEffect(() => {
    async function fetchData() {
        let response = await getAllCharacters(initialURL)
        setNextUrl(response.next);
        setPrevUrl(response.previous);
        await loadCharacters(response.results);
        setLoading(false);
    }
    fetchData();
    }, [])

    const next = async () => {
        setLoading(true);
        let data = await getAllCharacters(nextUrl);
        await loadCharacters(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let data = await getAllCharacters(prevUrl);
        await loadCharacters(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const loadCharacters = async (data) => {
        let characterData = await Promise.all(data.map(async character => {
            let characterRecord = await getCharacter(character)
            return characterRecord
        }))
        setCharacterData(characterData);
    }

    const filteredCharacters = characterData.filter ( character => {
        return character.name.toLowerCase().startsWith( filter.toLowerCase())
    })

    return(
        <>
            <Nav />
            <Container />
            <>
                <Button>
                    <ParticularButton onClick={prev}>Prev</ParticularButton>
                    <ParticularButton onClick={next}>Next</ParticularButton>
                </Button>
                <GridContainer>
                    {filteredCharacters.map((character, i) => {
                        return (
                            <Link to ={
                                {
                                    pathname:`/characters/${character.id}`,
                                    state : {character: character}
                                }
                            } key={character.name} >
                                <Card key={i} character={character} />
                            </Link>
                        )
                    })}
                </GridContainer>
            </>
        </>
    )

}

export default App;