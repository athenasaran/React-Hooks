import React, { useState, useEffect } from 'react'
//useState useEffect é um hook
//descartar o uso de classes
export default function App() {//nao tem propriedades proprias como state
    // const [repositories, setRepositories] = useState([
    //     { id: 1, name: 'repo-1' },
    //     { id: 2, name: 'repo-2' },
    //     { id: 3, name: 'repo-3' },
    // ])//lista vazia

    const [repositories, setRepositories] = useState([])


    useEffect(async () => { //ciclo de vida do componente, pode ter varios, single responsibility principle seria bom
        const response = await fetch('https://api.github.com/users/athenasaran/repos')
        const data = await response.json()

        setRepositories(data)
    }, [])//quais circunstancia deve ser executada. o efeito so vai ser executado quando esse parametro mudar
    //se vazio nunca vai ser executado novamente

    // handleAddRepository = () => {//chamando varias vezes
    //     setRepositories([
    //         ...repositories,
    //         { id: Math.random(), name: "Novo Repo" }
    //     ])
    // }

    useEffect(() => {
        const filtered = repositories.filter(repo => repo.favorite)//somente o que tem favorito

        document.title = `Você tem ${filtered.length} favoritos`
    }, [repositories])//ouvindo o estado do repositories, tendo atualização

    function handleFavorite(id) {
        const newRepositories = repositories.map(repo => {
            return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
        })

        setRepositories(newRepositories)
    }

    return (

        <ul>
            {repositories.map(repo => (
                <li key={repo.id}>
                    {repo.name}
                    {repo.favorite && <span> (Favorito)</span>}
                    <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
                </li>
            ))}
        </ul>


    )
}
