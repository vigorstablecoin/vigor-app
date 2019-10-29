import React from 'react';
import styled from 'styled-components'
import colors from 'shared/styles/colors';
import { ResponsiveFlex } from 'shared/components/styled';

const Wrapper = styled(ResponsiveFlex)`
`

const ShowMoreButton = styled.button`
  font-size: 1.2rem;
  color: ${colors.white};
  background-color: ${colors.bg};
  border: 2px solid ${colors.bgLightest};
  padding: .8rem 1rem;
  outline: none;
  margin: 1rem 0;

  &:active, &:focus {
    border: 2px solid ${colors.bg};
    background-color: ${colors.bgLightest}
  }

  &:hover {
    border: 2px solid ${colors.grayDark};
    background-color: ${colors.bgLightest}
  }
`
const ShowMore: React.FC <{ onToggle: any }> = ({ onToggle }) => {
    const [ toggle, setToggle ] = React.useState( false );

    const updateToggleAdvanced = () => {
      setToggle( !toggle );
      onToggle();
    };

    return (
      <Wrapper alignItems="flex-start" responsiveAlignItems="center">
        <ShowMoreButton onClick={ updateToggleAdvanced }>
        {toggle === true ? (
          <span>Show less</span>
        ) : (
          <span>Advanced Health info</span>  
        )}
        </ShowMoreButton>
      </Wrapper>
    );
};

export default ShowMore;
