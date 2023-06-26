import React from "react";
import useModal from "./hooks/useModal";
import {
    ModalBody,
    ModalContainer,
    ModalFooter,
    ModalIconTitleWrapper,
    ModalTitle,
    ModalTitleWrapper,
    ModalWrapper,
} from "./styles";
import { Container, TitleH1 } from "../../globalStyles";
import { FaTimes } from "react-icons/fa";

export interface Props {
    title: string;
    children: React.ReactNode;
    closeModal: () => void;
}

const Modal = ({ children, title, closeModal }: Props) => {
    return (
        <ModalContainer>
            <ModalWrapper>
                <ModalTitle>
                    <ModalTitleWrapper>
                        <TitleH1>{title}</TitleH1>
                    </ModalTitleWrapper>
                    <ModalIconTitleWrapper>
                        <FaTimes
                            onClick={() => closeModal()}
                            size={20}
                            color="#27374D"
                        />
                    </ModalIconTitleWrapper>
                </ModalTitle>
                <ModalBody>{children}</ModalBody>
                <ModalFooter></ModalFooter>
            </ModalWrapper>
        </ModalContainer>
    );
};

export default Modal;
