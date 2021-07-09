
import React, { useState, useEffect } from "react"
import {Modal, ModalHeader, ModalBody} from 'reactstrap'
import {getFileNames} from '../../services/Http/FileService'

export default function VerArchivos(props){

    const [files, setFiles] = useState([]);

    useEffect(() => {
        async function getAllFiles() {
            const result = await getFileNames(props.id);
            if(result){
                setFiles(result);
            }
        }
        getAllFiles();
    }, []);

    const closeModal = () => {
        props.closeModal()
    }

    return(
    <>
        <Modal isOpen={props.isShowModalFile}>
            <ModalHeader toggle={closeModal}>
                <h4>Archivos</h4>
            </ModalHeader>
            <ModalBody>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Documento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file,index) => {
                                    return(
                                        <tr key={index+1}>
                                            <th scope="row">{index+1}</th>
                                            <td ><a href={"/showFile/"+props.id+"/"+file} target="_blank">{file}</a></td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
            </ModalBody>
        </Modal>
    </>);
    
}
