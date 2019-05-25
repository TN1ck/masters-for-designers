import React from "react";
import styled from "styled-components";
import facebookIcon from "../img/facebook.svg";
import instagramIcon from "../img/instagram.svg";
import {FACEBOOK_LINK, INSTAGRAM_LINK} from "../constants";

const SocialLink = styled.a`
  display: block;
  padding: 0 5px;
  line-height: 0;
  &,
  &:hover,
  &:focus,
  &:visited {
    text-decoration: none;
    border: none;
  }
`;

export const FacebookLink = () => {
  return (
    <SocialLink target="_blank" rel="nofollow" href={FACEBOOK_LINK}>
      <img src={facebookIcon} alt="Facebook Icon" />
    </SocialLink>
  );
};

export const InstagramLink = () => {
  return (
    <SocialLink target="_blank" rel="nofollow" href={INSTAGRAM_LINK}>
      <img src={instagramIcon} alt="Instagram Icon" />
    </SocialLink>
  );
};
