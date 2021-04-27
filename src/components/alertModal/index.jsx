import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import './modal.scss';
import Commonbutton from '../button/Button';
import {translator} from '../../localizations';
import {CloseCircleSharp} from '../../modules/Video/mod-assets/svgComp';

export default function AlertModal(props) {
  return (
    <div key={props.key}>
      <Modal
        isOpen={props.isActive}
        backdrop="static"
        className="common-alert-modal-container"
      >
        <ModalHeader toggle={() => props.cancelClick()}>
          {' '}
          {props.title}{' '}
          <div
            className="customClose"
            tabIndex={0}
            role="button"
            onClick={() => {
              props.cancelClick();
            }}
          >
            <CloseCircleSharp />
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="message-conatiner">
            <div className="text-container">{props.body}</div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="button-group">
            <div className="button-content">
              <Commonbutton
                className="primary btnShape"
                onClick={() => props.cancelClick()}
              >
                {translator('CONFIRM_MODAL.BUTTON_NO')}
              </Commonbutton>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
