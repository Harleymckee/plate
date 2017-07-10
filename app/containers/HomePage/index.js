// @flow
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';


const Article = styled.article`
  ${tachyons}
`;

const Header = styled.header`
  ${tachyons}
`;

const Div = styled.div`
  ${tachyons}
`;

const Main = styled.div`
  ${tachyons}
`;

const H1 = styled.h1`
  ${tachyons}
`;

const H2 = styled.h2`
  ${tachyons}
`;

const H3 = styled.h3`
  ${tachyons}
`;

const P = styled.p`
  ${tachyons}
`;

const LoadingScreen = () => {
  return (
    <Div dtc v_mid bl>
      <FormattedMessage {...messages.body} />
    </Div>
  );
};

import contractObj from 'contracts/Geekt.sol'


// const Abi = () => {
//       console.log(contractObj['Geekt.sol:Geekt'])

//   return contractObj['Geekt.sol:Geekt'].abi.map(() => {
//     return <div>
//         cool
//       </div>
//   });

// };

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  get contractMap() {
    return contractObj['Geekt.sol:Geekt'].abi.map((item) => {
      return <div>
          {item.name}
        </div>

    })

  }
  render() {
    //console.log(contractObj['Geekt.sol:Geekt'])

    return (
      <Article black bg_white>
        <Main dt w_100 vh_100 tc cover>
          <Header bb>
            <H1 fw2>
              <FormattedMessage {...messages.header} />
            </H1>
          </Header>
          {this.contractMap}
          {/* <img src='https://s-media-cache-ak0.pinimg.com/736x/aa/5a/31/aa5a31ceeaa04ec91e3a2de2d5f0a6b8.jpg' /> */}
        </Main>
      </Article>
    );
  }
}
