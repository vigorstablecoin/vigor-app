import { observer } from 'mobx-react';
import React from 'react';
import Menu from 'shared/components/menu';
import { useStore } from 'shared/hooks';
import styled from 'styled-components';
import { getFullLanguage, getLanguageFlag, supportedLanguageCodes } from '../utils';

const languageOptions = supportedLanguageCodes.map(code => ({
    content: getFullLanguage(code),
    icon: getLanguageFlag(code),
    value: code,
}));

const LanguageButton = styled.button`
    font-size: 2rem;
    margin-right: 16px;
    height: 2rem;
`;

const OptionWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100px;
`;

const IconWrapper = styled.div<any>`
    margin-right: 16px;
    font-size: 20px;
`;

export const ItemOption = ({ content, icon }) => (
    <OptionWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <div>{content}</div>
    </OptionWrapper>
);

type Props = {};
const LanguageDropdown: React.FC<Props> = props => {
    const i18nStore = useStore(rootStore => rootStore.i18nStore);

    return (
        <Menu
            trigger={<LanguageButton>{i18nStore.languageFlag}</LanguageButton>}
            options={languageOptions}
            onSelect={i18nStore.changeLanguage}
            renderOption={option => <ItemOption {...option} />}
        />
    );
};

export default observer(LanguageDropdown);
