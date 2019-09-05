import React, { useRef } from 'react';
import { useOnClickOutside } from 'shared/hooks';
import colors from 'shared/styles/colors';
import styled from 'styled-components';

export const ModalWrapper = styled.div<Props>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: ${p => (p.padding ? `${p.padding}` : `2rem`)};
    margin: 10% 2rem 0;
    width: ${p => (p.width ? `${p.width}px` : `720px`)};
    max-width: calc(100% - 4rem);
    max-height: calc(100% - 10%);

    background-color: ${colors.bgLight};
    align-self: flex-start;
`;

export const ModalTitle = styled.h3`
    font-size: 1.5rem;
`;

type Props = {
    onCancel: () => void;
    [key: string]: any;
};

const ModalBase: React.FC<Props> = props => {
    const ref = useRef();

    useOnClickOutside(ref, props.onCancel);

    return <ModalWrapper ref={ref} {...props} />;
};

export default ModalBase;
