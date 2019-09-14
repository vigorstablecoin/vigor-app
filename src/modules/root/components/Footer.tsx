import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as Divider } from 'shared/assets/divider.svg';
import { ReactComponent as GitHub } from 'shared/assets/logo-github.svg';
import { ReactComponent as Telegram } from 'shared/assets/logo-telegram.svg';
import { ReactComponent as Twitter } from 'shared/assets/logo-twitter.svg';
import { ReactComponent as Logo } from 'shared/assets/vigor/logo-no-text.svg';
import { HorizontalFlex, ResponsiveFlex, Section, VerticalFlex } from 'shared/components/styled';
import { media } from 'shared/styles/breakpoints';
import colors from 'shared/styles/colors';
import styled from 'styled-components';

const FooterWrapper = styled(Section)`
    position: relative;
    width: 100%;
    margin-top: 40px;
    background: linear-gradient(0deg, ${colors.bg}, ${colors.bgLight});
    padding: 0;
`;

const FooterContent = styled(ResponsiveFlex)`
    margin: 100px 0 60px 0;

    ${media.lessThan(`xs-max`)} {
        margin: 40px 0 40px 0;
    }
`;

const DividerStyled = styled(Divider)`
    position: absolute;
    left: 0;
    top: -7.3vw;
    width: 100%;
    user-select: none;
    & > .pathColor1 {
        fill: ${colors.bgLight};
    }
    & > .pathColor2 {
        fill: ${colors.bgLight};
    }
`;

const Block = styled.div`
    &:not(:last-child) {
        margin-right: 8rem;
    }

    ${media.lessThan(`xs-max`)} {
        &:not(:last-child) {
            margin-right: 0;
        }
        &:first-child {
            order: 1;
        }
    }
`;

const BlockHeader = styled.h4`
    font-size: 0.875rem;
    color: ${colors.white};
    font-weight: 600;
    margin: 52px 0 24px 0;
`;

const ResourceLink = styled.a`
    font-size: 0.875rem;
    color: ${colors.gray};
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
    padding: 8px 0;

    &:hover {
        color: ${colors.grayDarker};
    }

    &:focus {
        color: ${colors.grayDark};
    }
`;

const LogoText = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
    margin: 8px 0 0 0;
    text-transform: uppercase;
`;

const SocialBar = styled(HorizontalFlex)`
    margin-top: 2rem;
    & > * {
        margin: 0 16px;
    }
`;

const SocialIconWrapper = styled.div`
    & > svg {
        vertical-align: middle;
        width: 24px;
        height: 24px;

        .pathColor {
            fill: ${colors.white};
        }
    }

    &:hover {
        & > svg .pathColor {
            fill: ${colors.gray};
        }
    }
`;

const socialIcons = [
    {
        link: `https://twitter.com/vigorstablecoin`,
        Icon: Twitter,
    },
    {
        link: `https://t.me/vigorstablecoin`,
        Icon: Telegram,
    },
    {
        link: `https://github.com/vigorstablecoin`,
        Icon: GitHub,
    },
];

const resourceLinks = [
    {
        link: `https://vig.ai`,
        text: <FormattedMessage id="vigorGovernance" defaultMessage="Vigor Governance" />,
    },
    {
        link: `https://vigorstablecoin.com/`,
        text: <FormattedMessage id="vigorStablecoin" defaultMessage="Vigor Stablecoin" />,
    },
    {
        link: `https://github.com/vigorstablecoin/media`,
        text: <FormattedMessage id="pressMaterials" defaultMessage="Press Materials" />,
    },
];

const Footer = () => {
    return (
        <FooterWrapper>
            <DividerStyled />
            <FooterContent alignItems="flex-start" responsiveAlignItems="center">
                <Block>
                    <BlockHeader>
                        <FormattedMessage id="resources" defaultMessage="Resources" />
                    </BlockHeader>
                    <VerticalFlex alignItems="flex-start">
                        {resourceLinks.map(({ text, link }) => (
                            <ResourceLink key={link} href={link}>
                                {text}
                            </ResourceLink>
                        ))}
                    </VerticalFlex>
                </Block>
                <Block>
                    <VerticalFlex>
                        <Logo width={40} height={40} />
                        <LogoText>Vigor</LogoText>
                        <SocialBar justifyContent="flex-end">
                            {socialIcons.map(({ link, Icon }) => (
                                <a key={link} href={link}>
                                    <SocialIconWrapper>
                                        <Icon />
                                    </SocialIconWrapper>
                                </a>
                            ))}
                        </SocialBar>
                    </VerticalFlex>
                </Block>
            </FooterContent>
        </FooterWrapper>
    );
};

export default Footer;
