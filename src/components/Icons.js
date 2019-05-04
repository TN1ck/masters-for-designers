import React from "react";
import styled from "styled-components";
import house from "../img/house.svg";
import facebook from "../img/facebook.svg";
import twitter from "../img/twitter.svg";
import instagram from "../img/instagram.svg";
import save from "../img/save.svg";

const Icon = styled.a`
  display: inline-block;
  &,
  &:hover,
  &:focus {
    border: none;
  }
`;

const createLinkIcon = (src, alt) => {
  return props => {
    return props.href && props.href.includes("http") ? (
      <Icon target="_blank" rel="nofollow" {...props}>
        <img src={src} alt={alt} />
      </Icon>
    ) : null;
  };
};

export const SaveIcon = createLinkIcon(save, "save icon");

export const InstagramIcon = createLinkIcon(instagram, "instagram icon");

export const TwitterIcon = createLinkIcon(twitter, "twitter icon");

export const FacebookIcon = createLinkIcon(facebook, "facebook icon");

export const HouseIcon = createLinkIcon(house, "house icon");
