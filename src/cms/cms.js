import CMS from "netlify-cms-app";
import React from "react";
import {StyleSheetManager} from "styled-components";

import GlossaryPreview from "./preview-templates/GlossaryPreview";
import MasterPreview from "./preview-templates/MasterPreview";
import {GlobalStyle} from "../components/Layout";
import Fonts from "../components/Fonts";

//Component used to Enable netlify CMS to apply the styles added through styled-components
class CSSInjector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iframeRef: "",
    };
  }

  componentDidMount() {
    const iframe = document.getElementsByTagName("iframe")[0];
    const iframeHeadElem = iframe.contentDocument.head;
    this.setState({iframeRef: iframeHeadElem});
  }

  render() {
    return (
      <div>
        {this.state.iframeRef && (
          <StyleSheetManager target={this.state.iframeRef}>{this.props.children}</StyleSheetManager>
        )}
      </div>
    );
  }
}

CMS.registerPreviewTemplate("master", props => (
  <CSSInjector>
    <div>
      <GlobalStyle />
      <Fonts />
      <MasterPreview {...props} />
    </div>
  </CSSInjector>
));

CMS.registerPreviewTemplate("glossary", props => (
  <CSSInjector>
    <div>
      <GlobalStyle />
      <Fonts />
      <GlossaryPreview {...props} />
    </div>
  </CSSInjector>
));
