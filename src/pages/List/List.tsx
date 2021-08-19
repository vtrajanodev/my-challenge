import { useState, useEffect, FormEvent } from 'react'
import './styles.scss'
import Modal from 'react-modal'
import { Button } from '@material-ui/core';
import { api } from '../../services/api'
import closeImg from '../../assets/close.svg'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useCallback } from 'react';


interface Dragon{
    id: number,
    name: string,
    type: string,
    createdAt: string,

}


export function List() {
    //Estado arrays de dragões
    const [dragons, setDragons] = useState<Dragon[]>([])
    
    //Estado modal open or closed
    const [isAddDragonModalOpen, setIsAddDragonModalOpen] = useState(false)
    
    //Estado para armazenar dados dos inputs
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [modalTitle, setModalTitle] = useState('')

    const [targetDragon, setTargetDragon] = useState<Dragon>()

    //Function para listar dragões
    async function getDragons() {

        await api.get('/api/v1/dragon')
            .then(response => setDragons(response.data))


    }

    //Listando dragões ao inicializar a página.
    useEffect(() => {
        getDragons() 
    }, [])


    //Deletando dragão
    async function handleRemoveDragon(id: number) {

        await api.delete(`/api/v1/dragon/${id}`)
        .then(() => getDragons())

    }


    /*-------/Functions abrir e fechar modal-------*/
    function handleOpenNewAddDragonModal() {

        setModalTitle('CADASTRAR DRAGÃO')


        setIsAddDragonModalOpen(true)
    }

    function handleCloseNewAddDragonModal() {
        setIsAddDragonModalOpen(false)
    }
    /*-----------------------------------------------*/

    
    //Cadastrando novo dragão
    
    function handleAddOrEditDragon(event: FormEvent) {
        event.preventDefault()


        var data = {
            name,
            type
        }

        if(name.length === 0 || type.length === 0) return

        
        if(targetDragon?.id){
            api.put(`/api/v1/dragon/${targetDragon.id}` , data)
            .then(() => getDragons())
        }else{
            api.post('/api/v1/dragon/' , data)
            .then(() => getDragons())
        }
       
        
        setIsAddDragonModalOpen(false)

        setName('')
        setType('')

    }


    const handleOpenNewEditDragonModal = useCallback((dragon: Dragon) => {

        setModalTitle('EDITAR DRAGÃO')

        setTargetDragon(dragon)


        setIsAddDragonModalOpen(true)

    }, []); 


    return (

        <div>

            <Modal
                isOpen={isAddDragonModalOpen}
                onRequestClose={handleCloseNewAddDragonModal}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <button
                    type="button"
                    className="button-close-modal"
                    onClick={handleCloseNewAddDragonModal}
                >
                    <img src={closeImg} alt="Fechar modal" />
                </button>

                <h2>{modalTitle}</h2>

                <form onSubmit={handleAddOrEditDragon}>

                    <input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        type="text"
                        placeholder="Nome do dragão"
                    />
                    <input
                        value={type}
                        onChange={event => setType(event.target.value)}
                        type="text"
                        placeholder="Tipo do dragão"
                    />

                    <Button 
                        type="submit" 
                        className="button-submit"                       
                    >
                        {modalTitle}
                    </Button>

                </form>
            </Modal>


            <Button className="addDragon-button" onClick={handleOpenNewAddDragonModal}>
                <AddBoxIcon /> <span>Dragão</span>
            </Button>

            <table>
                <thead>
                    <tr>
                        <th>DATA DE CRIAÇÃO</th>
                        <th>NOME</th>
                        <th>TIPO</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>

               
                <tbody>
                    {dragons.map(dragon => (

                        <tr key={dragon.id}>
                            <td>
                                {new Intl.DateTimeFormat().format(
                                    new Date(dragon.createdAt)
                                )}
                            </td>
                            <td>{dragon.name}</td>
                            <td>{dragon.type}</td>
                            <td>


                                <button //Cadastrar dragão
                            
                                    className="icon"
                                    onClick={() => handleOpenNewEditDragonModal(dragon)}
                                >
                                    <EditIcon />

                                </button>
                                <button //Editar dragão
                                    value={targetDragon?.type}
                                    className="icon"
                                    onClick={() => {handleRemoveDragon(dragon.id)}}

                                >
                                    <DeleteIcon />

                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}