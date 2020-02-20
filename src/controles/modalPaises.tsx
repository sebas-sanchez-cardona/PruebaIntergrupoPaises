import * as React from "react";
import Modal from 'react-responsive-modal';

function ModalPaises(props: any) {
    return (
        <div className="modal-paises">
            <Modal open={props.open} onClose={props.handleCloseModal}>
                <h2>{(props.pais)?props.pais.nombre:''}({(props.pais)?props.pais.cioc:''})</h2>
                <p>{(props.pais)?props.pais.region:''}</p>
                <p>{(props.pais)?props.pais.capital:''}</p>
                <img style={{width: '530px'}} src={(props.pais)?props.pais.bandera:''}></img>
                
            </Modal>
        </div>
    );
}

export default ModalPaises;
